import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

export interface City {
    cityId?: number,
    tagline?: string,
    cityName?: string,
    regionId?: number,
    photoIds?: number[],
    tagIds?: number[],
    region?: Region,
    tags?: Tag[],
    photos?: Photo[],
    provinceLogo?: string,

}

export interface Region {
    regionId: number,
    regionName: string,
    bigRegionName?: string,
    color?: string,
    bigRegionId?: number,
}

export interface Photo {
    photoId: number,
    photoUrl: string,
}

export interface Tag {
    tagId: number,
    color: string,
    name: string,
}

export interface MapEntry {
    cityName: string,
    cityId: number,
    cssVector: string,
}

export interface TravelTip {
    tipId: number,
    header: string,
    text: string,
}

export interface CityExperience {
    id: number,
    activity: string,
    places: string,
    cityId: number,
}

@Injectable({
    providedIn: 'root'
})
export class CityService {
    private cityDataSource = new BehaviorSubject<Array<City>>(null);
    private cityCacheDataSource = new BehaviorSubject<Map<number, City>>(null);
    private tagDataSource = new BehaviorSubject<Array<Tag>>(null);
    private regionDataSource = new BehaviorSubject<Array<Region>>(null);
    private photoDataSource = new BehaviorSubject<Array<Photo>>(null);
    private tagCacheDataSource = new BehaviorSubject<Map<number, Tag>>(null);
    private regionCacheDataSource = new BehaviorSubject<Map<number, Region>>(null);
    private photoCacheDataSource = new BehaviorSubject<Map<number, Photo>>(null);
    private mapEntryDataSource = new BehaviorSubject<MapEntry[]>(null);
    private travelTipsSource = new BehaviorSubject<TravelTip[]>(null);
    private travelTipsCacheSource = new BehaviorSubject<TravelTip[]>(null);
    private cityExperienceCacheSource = new BehaviorSubject<Map<number, CityExperience[]>>(null);

    cityDataSource$ = this.cityDataSource.asObservable();
    cityCacheDataSource$ = this.cityCacheDataSource.asObservable();
    tagDataSource$ = this.tagDataSource.asObservable();
    regionDataSource$ = this.regionDataSource.asObservable();
    photoDataSource$ = this.photoDataSource.asObservable();
    travelTipsDataSource$ = this.travelTipsSource.asObservable();

    tagCacheDataSource$ = this.tagCacheDataSource.asObservable();
    regionCacheDataSource$ = this.regionCacheDataSource.asObservable();
    photoCacheDataSource$ = this.photoCacheDataSource.asObservable();
    mapEntryDataSource$ = this.mapEntryDataSource.asObservable();
    travelTipsCacheDataSource$ = this.travelTipsCacheSource.asObservable();
    cityExperienceCacheSource$ = this.cityExperienceCacheSource.asObservable();

    private tagCache = new Map<number, Tag>();
    private regionCache = new Map<number, Region>();
    private photoCache = new Map<number, Photo>();
    private cityCache = new Map<number, City>();
    private cityExperienceCache = new Map<number, CityExperience[]>();

    private readonly baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
    private readonly spreadsheetId = '1eO7bGeKYqZqnI9F7V4dClcmADSqRPq471ccVkNKqjXo';
    private readonly apiKey = 'AIzaSyDpl_N8k-85ocm5OOIRA-3HC1j1ZmHH2C4';

    constructor(
        private httpClient: HttpClient
    ) {
        const getRegionsURL = `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('Region', 'A', 'E', 8)}key=${this.apiKey}`;
        
        console.log("getting regions");
        this.httpClient.get(getRegionsURL).subscribe(
            (result: string) =>{
                this.parseRegion(result);
                console.log("done getting regions");
            }
        )

        const getCitiesURL = `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('City', 'A', 'AD', 63)}key=${this.apiKey}`;
        
        console.log("getting cities");
        this.httpClient.get(getCitiesURL).subscribe(
            (result: string) =>{
                this.parseCity(result);
                console.log("done getting cities ",result);
            }
        )

        const getTagsUrl = `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('Tag', 'A', 'C', 9)}key=${this.apiKey}`;
        
        console.log("getting tags");
        this.httpClient.get(getTagsUrl).subscribe(
            (result: string) =>{
                this.parseTag(result);
                console.log("done getting tags");
            }
        )

        const getPhotoUrl= `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('Photo', 'A', 'B', 252)}key=${this.apiKey}`;
        
        console.log("getting photos");
        this.httpClient.get(getPhotoUrl).subscribe(
            (result: string) =>{
                this.parsePhoto(result);
                console.log("done getting photos");
            }
        )

        const getMapEtriesUrl= `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('Map', 'A', 'D', 63)}key=${this.apiKey}`;
        
        console.log("getting map entries");
        this.httpClient.get(getMapEtriesUrl).subscribe(
            (result: string) =>{
                this.parseMapEntry(result);
                console.log("done getting map entries");
            }
        )

        const getTravelTipsUrl= `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('TravelTips', 'A', 'C', 17)}key=${this.apiKey}`;
        
        console.log("getting travel tips");
        this.httpClient.get(getTravelTipsUrl).subscribe(
            (result: string) =>{
                this.parseTravelTips(result);
                console.log("done getting travel tips");
            }
        )

        const getCityExperienceUrl= `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('CityExperience', 'A', 'D', 7)}key=${this.apiKey}`;
        
        console.log("getting city experience");
        this.httpClient.get(getCityExperienceUrl).subscribe(
            (result: string) =>{
                this.parseCityExperience(result);
                console.log("done getting city experience");
            }
        )
    }

    getCityExperienceById(cityId: number): Observable<CityExperience[]> {
        return this.cityExperienceCacheSource$.pipe(
            map(map => map.get(cityId))
        )
    }

    private constructRanges(sheetName: string, startColumn: string, endColumn: string, rowNum: number): string {
        let range = '';
        for (let i = 2 ; i <= rowNum+1 ; i++) {
            range += `ranges=${sheetName}!${startColumn}${i}:${endColumn}${i}&`;
        }
        return range;
    }
    
    private parseCity(returnValues: Object): City[] {
        const valueRanges: Object[] = returnValues['valueRanges'];
        const values: Array<Array<string>> = valueRanges.map(obj => obj['values'][0]);
        const cities = new Array<City>();
        for (let i = 0 ; i < values.length ; i++) {
            const rawCity: string[] = values[i];
            const city: City = {
                cityId: Number(rawCity[1]),
                cityName: rawCity[0],
                tagline: rawCity[5],
                regionId: Number(rawCity[4]),
                photoIds: rawCity[11].split(',').map(Number),
                tagIds: rawCity[16].split(',').map(Number),
                provinceLogo: this.transformToViewablUrl(rawCity[29]),
            }
            cities.push(city);
            this.cityCache.set(city.cityId, city);
        }
        cities.sort((city1, city2) => city1.cityName.localeCompare(city2.cityName));
        this.cityDataSource.next(cities);
        this.cityCacheDataSource.next(this.cityCache);
        return cities;
    }
    
    private parseRegion(returnValues: Object): Region[] {
        const valueRanges: Object[] = returnValues['valueRanges'];
        const values: Array<Array<string>> = valueRanges.map(obj => obj['values'][0]);
        const regions = new Array<Region>();
        for (let i = 0 ; i < values.length ; i++) {
            const rawCity: string[] = values[i];
            const region: Region = {
                regionId: Number(rawCity[1]),
                regionName: rawCity[0],
                bigRegionName: rawCity[2],
                color: rawCity[3],
                bigRegionId: Number(rawCity[4]),
            }
            regions.push(region);
            this.regionCache.set(region.regionId, region);
        }
        this.regionDataSource.next(regions);
        this.regionCacheDataSource.next(this.regionCache);
        return regions;
    }
    
    private parseTag(returnValues: Object): Tag[] {
        const valueRanges: Object[] = returnValues['valueRanges'];
        const values: Array<Array<string>> = valueRanges.map(obj => obj['values'][0]);
        const tags = new Array<Tag>();
        for (let i = 0 ; i < values.length ; i++) {
            const rawTag: string[] = values[i];
            const tag: Tag = {
                tagId: Number(rawTag[2]),
                name: rawTag[0],
                color: rawTag[1],
            }
            this.tagCache.set(tag.tagId, tag);
            tags.push(tag);
        }
        this.tagDataSource.next(tags);
        this.tagCacheDataSource.next(this.tagCache);
        return tags;
    }
    
    private parsePhoto(returnValues: Object): Photo[] {
        const valueRanges: Object[] = returnValues['valueRanges'];
        const values: Array<Array<string>> = valueRanges.map(obj => obj['values'][0]);
        const photos = new Array<Photo>();
        for (let i = 0 ; i < values.length ; i++) {
            const rawPhoto: string[] = values[i];
            const photo: Photo = {
                photoUrl: this.transformToViewablUrl(rawPhoto[0]),
                photoId: Number(rawPhoto[1]),
            }
            this.photoCache.set(photo.photoId, photo);
            photos.push(photo);
        }
        this.photoDataSource.next(photos);
        this.photoCacheDataSource.next(this.photoCache);
        return photos;
    }
    
    private parseMapEntry(returnValues: Object): MapEntry[] {
        const valueRanges: Object[] = returnValues['valueRanges'];
        const values: Array<Array<string>> = valueRanges.map(obj => obj['values'][0]);
        const mapEntries = new Array<MapEntry>();
        for (let i = 0 ; i < values.length ; i++) {
            const rawMapEntry: string[] = values[i];
            const mapEntry: MapEntry = {
                cityName: rawMapEntry[0],
                cityId: Number(rawMapEntry[1]),
                cssVector: rawMapEntry[3],

            }
            mapEntries.push(mapEntry);
        }
        this.mapEntryDataSource.next(mapEntries);
        return mapEntries;
    }
    
    private parseTravelTips(returnValues: Object): TravelTip[] {
        const valueRanges: Object[] = returnValues['valueRanges'];
        const values: Array<Array<string>> = valueRanges.map(obj => obj['values'][0]);
        const travelTips = new Array<TravelTip>();
        for (let i = 0 ; i < values.length ; i++) {
            const rawtravelTip: string[] = values[i];
            const travelTip: TravelTip = {
                tipId: Number(rawtravelTip[0]),
                header: rawtravelTip[1],
                text: rawtravelTip[2],
            }
            travelTips.push(travelTip);
        }
        travelTips.sort((tip1, tip2) => tip2.tipId - tip1.tipId)
        this.travelTipsSource.next(travelTips);
        return travelTips;
    }
    
    private parseCityExperience(returnValues: Object): void {
        const valueRanges: Object[] = returnValues['valueRanges'];
        const values: Array<Array<string>> = valueRanges.map(obj => obj['values'][0]);
        const datas = new Array<CityExperience>();
        for (let i = 0 ; i < values.length ; i++) {
            const rawData: string[] = values[i];
            const data: CityExperience = {
                id: Number(rawData[0]),
                activity: rawData[1],
                places: rawData[2],
                cityId: Number(rawData[3]),
            }
            datas.push(data);
        }
        datas.forEach((cityExperience) => {
            if (!this.cityExperienceCache.has(cityExperience.cityId)) {
                this.cityExperienceCache.set(cityExperience.cityId, [cityExperience]);
            } else {
                this.cityExperienceCache.get(cityExperience.cityId).push(cityExperience);
            }
        });

        this.cityExperienceCacheSource.next(this.cityExperienceCache);
    }

    private transformToViewablUrl(driveUrl: string): string {
        const match = driveUrl.match(/d\/(.*?)\//);
        if (match) {
            return `https://drive.google.com/uc?export=view&id=${match[1]}`;
        } else {
            return null;
        }
    }
}