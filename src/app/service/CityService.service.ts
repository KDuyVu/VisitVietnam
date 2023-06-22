import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, of } from 'rxjs';

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
    thumbNail?: string,
    weatherId?: string,
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
    preview?: string,
}

export interface CityExperience {
    id: number,
    activity: string,
    places: string,
    cityId: number,
}

export interface SampleItinerary {
    id: number,
    cityId: number,
    itineraryType: string,
    HTML: string,
}

export interface Slider {
  cityName?: string,
  cityId?: number,
  flickrLink?: string,
  copyright?: string,
  description?: string
}

export interface Holiday {
  id?: number,
  name?: string,
  vnTranslation?: string,
  date?: string,
  significance?: string,
  photoUrl?: string,
}

@Injectable({
    providedIn: 'root'
})
export class CityService {
    private cityDataSource = new BehaviorSubject<Array<City>>(null);
    private cityCacheDataSource = new BehaviorSubject<Map<number, City>>(null);
    private tagDataSource = new BehaviorSubject<Array<Tag>>(null);
    private sliderDataSource = new BehaviorSubject<Array<Slider>>(null);
    private regionDataSource = new BehaviorSubject<Array<Region>>(null);
    private photoDataSource = new BehaviorSubject<Array<Photo>>(null);
    private tagCacheDataSource = new BehaviorSubject<Map<number, Tag>>(null);
    private sliderCacheDataSource = new BehaviorSubject<Map<number, Slider>>(null);
    private regionCacheDataSource = new BehaviorSubject<Map<number, Region>>(null);
    private photoCacheDataSource = new BehaviorSubject<Map<number, Photo>>(null);
    private mapEntryDataSource = new BehaviorSubject<MapEntry[]>(null);
    private travelTipsSource = new BehaviorSubject<TravelTip[]>(null);
    private travelTipsCacheSource = new BehaviorSubject<Map<number, TravelTip>>(null);
    private cityExperienceCacheSource = new BehaviorSubject<Map<number, CityExperience[]>>(null);
    private itinerariesByCityId = new BehaviorSubject<Map<number, SampleItinerary[]>>(null);
    private holidaysDataSource = new BehaviorSubject<Holiday[]>(null);

    cityDataSource$ = this.cityDataSource.asObservable();
    cityCacheDataSource$ = this.cityCacheDataSource.asObservable();
    tagDataSource$ = this.tagDataSource.asObservable();
    sliderDataSource$ = this.sliderDataSource.asObservable();
    regionDataSource$ = this.regionDataSource.asObservable();
    photoDataSource$ = this.photoDataSource.asObservable();
    travelTipsDataSource$ = this.travelTipsSource.asObservable();
    holidaysDataSource$ = this.holidaysDataSource.asObservable();

    tagCacheDataSource$ = this.tagCacheDataSource.asObservable();
    regionCacheDataSource$ = this.regionCacheDataSource.asObservable();
    photoCacheDataSource$ = this.photoCacheDataSource.asObservable();
    mapEntryDataSource$ = this.mapEntryDataSource.asObservable();
    travelTipsCacheDataSource$ = this.travelTipsCacheSource.asObservable();
    cityExperienceCacheSource$ = this.cityExperienceCacheSource.asObservable();
    itinerariesByCityId$ = this.itinerariesByCityId.asObservable();

    private tagCache = new Map<number, Tag>();
    private sliderCache = new Map<number, Slider>();
    private regionCache = new Map<number, Region>();
    private photoCache = new Map<number, Photo>();
    private cityCache = new Map<number, City>();
    private cityExperienceCache = new Map<number, CityExperience[]>();
    private itinerariesByCityIdCache = new Map<number, SampleItinerary[]>();
    private travelTipsCache = new Map<number, TravelTip>();

    private readonly baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
    private readonly spreadsheetId = '1eO7bGeKYqZqnI9F7V4dClcmADSqRPq471ccVkNKqjXo';
    private readonly apiKey = 'AIzaSyDpl_N8k-85ocm5OOIRA-3HC1j1ZmHH2C4';

    constructor(
        private httpClient: HttpClient
    ) {
        //Harry's part
        const getSlidersURL = `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('Slider', 'A', 'E', 63)}key=${this.apiKey}`;

        console.log("getting sliders");
        this.httpClient.get(getSlidersURL).subscribe(
          (result: string) =>{
              this.parseSlider(result);
              console.log("done getting sliders");
          }
        )
        //
        const getRegionsURL = `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('Region', 'A', 'E', 8)}key=${this.apiKey}`;

        console.log("getting regions");
        this.httpClient.get(getRegionsURL).subscribe(
            (result: string) =>{
                this.parseRegion(result);
                console.log("done getting regions");
            }
        )

        const getCitiesURL = `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('City', 'A', 'AG', 63)}key=${this.apiKey}`;

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

        const getTravelTipsUrl= `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('TravelTips', 'A', 'D', 8)}key=${this.apiKey}`;

        console.log("getting travel tips");
        this.httpClient.get(getTravelTipsUrl).subscribe(
            (result: string) =>{
                this.parseTravelTips(result);
                console.log("done getting travel tips");
            }
        )

        const getCityExperienceUrl= `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('CityExperience', 'A', 'D', 386)}key=${this.apiKey}`;

        console.log("getting city experience");
        this.httpClient.get(getCityExperienceUrl).subscribe(
            (result: string) =>{
                this.parseCityExperience(result);
                console.log("done getting city experience ",result);
            }
        )

        const getSampleItiernariesUrl= `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('NewItineraries', 'A', 'F', 252)}key=${this.apiKey}`;

        console.log("getting sample initeraries");
        this.httpClient.get(getSampleItiernariesUrl).subscribe(
            (result: string) =>{
                this.parseSampleItineraries(result);
                console.log("done getting sample initeraries");
            }
        )

        const getHolidaysUrl= `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('Holidays', 'A', 'E', 12)}key=${this.apiKey}`;

        console.log("getting holidays");
        this.httpClient.get(getHolidaysUrl).subscribe(
            (result: string) =>{
                this.parseHolidays(result);
                console.log("done getting holidays");
            }
        )
    }

    getCityExperienceById(cityId: number): Observable<CityExperience[]> {
        return this.cityExperienceCacheSource$.pipe(
            map(map => map.get(cityId))
        )
    }

    getItinerariesByCityId(cityId: number): Observable<SampleItinerary[]> {
        return this.itinerariesByCityId$.pipe(
            filter(itinerariesMap => itinerariesMap !== null),
            map(itinerariesMap => itinerariesMap.get(cityId))
        );
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
                provinceLogo: this.transformToViewableUrl(rawCity[29]),
                thumbNail: this.transformToViewableUrl(rawCity[31]),
                weatherId: rawCity[32],
            }
            cities.push(city);
            this.cityCache.set(city.cityId, city);
        }
        cities.sort((city1, city2) => city1.cityName.localeCompare(city2.cityName));
        this.cityDataSource.next(cities);
        this.cityCacheDataSource.next(this.cityCache);
        return cities;
    }
    //Harry's part
    private parseSlider(returnValues: Object): Slider[] {
      const valueRanges: Object[] = returnValues['valueRanges'];
      const values: Array<Array<string>> = valueRanges.map(obj => obj['values'][0]);
      const sliders = new Array<Slider>();
      for (let i = 0 ; i < values.length ; i++) {
          const rawSlider: string[] = values[i];
          const slider: Slider = {
              cityName: rawSlider[0],
              cityId: Number(rawSlider[1]),
              flickrLink: rawSlider[2],
              copyright: rawSlider[3],
              description: rawSlider[4],
          }
          sliders.push(slider);
          this.sliderCache.set(slider.cityId, slider);
      }
      this.sliderDataSource.next(sliders);
      this.sliderCacheDataSource.next(this.sliderCache);
      return sliders;
    }
    //
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
                photoUrl: this.transformToViewableUrl(rawPhoto[0]),
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
                preview: rawtravelTip[3],
            }
            travelTips.push(travelTip);
            this.travelTipsCache.set(travelTip.tipId, travelTip);
        }
        travelTips.sort((tip1, tip2) => tip2.tipId - tip1.tipId)
        this.travelTipsSource.next(travelTips);
        this.travelTipsCacheSource.next(this.travelTipsCache);
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

    private parseSampleItineraries(returnValues): void {
        const valueRanges: Object[] = returnValues['valueRanges'];
        const values: Array<Array<string>> = valueRanges.map(obj => obj['values'][0]);
        const datas = new Array<SampleItinerary>();
        for (let i = 0 ; i < values.length ; i++) {
            const rawData: string[] = values[i];
            const data: SampleItinerary = {
                id: Number(rawData[0]),
                cityId: Number(rawData[1]),
                itineraryType: rawData[2],
                HTML: rawData[3],
            }
            datas.push(data);
        }
        datas.forEach((itinerary) =>{
            if (!this.itinerariesByCityIdCache.has(itinerary.cityId)) {
                this.itinerariesByCityIdCache.set(itinerary.cityId, []);
            }
            this.itinerariesByCityIdCache.get(itinerary.cityId).push(itinerary);
        })

        this.itinerariesByCityId.next(this.itinerariesByCityIdCache);

    }

    private parseHolidays(returnValues): void {
        const valueRanges: Object[] = returnValues['valueRanges'];
        const values: Array<Array<string>> = valueRanges.map(obj => obj['values'][0]);
        const datas = new Array<Holiday>();
        for (let i = 0 ; i < values.length ; i++) {
            const rawData: string[] = values[i];
            const data: Holiday = {
                name: rawData[0],
                vnTranslation: rawData[1],
                date: rawData[2],
                significance: rawData[3],
                photoUrl: this.transformToViewableUrl(rawData[4]),
            }
            datas.push(data);
        }

        this.holidaysDataSource.next(datas);
    }

    private transformToViewableUrl(driveUrl: string): string {
        const match = driveUrl.match(/d\/(.*?)\//);
        if (match) {
            return `https://drive.google.com/uc?export=view&id=${match[1]}`;
        } else {
            return null;
        }
    }
}
