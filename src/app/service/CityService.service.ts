import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

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

}

export interface Region {
    regionId: number,
    regionName: string,
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

@Injectable({
    providedIn: 'root'
})
export class CityService {
    private cityDataSource = new BehaviorSubject<Array<City>>(null);
    private tagDataSource = new BehaviorSubject<Array<Tag>>(null);
    private regionDataSource = new BehaviorSubject<Array<Region>>(null);
    private photoDataSource = new BehaviorSubject<Array<Photo>>(null);
    private tagCacheDataSource = new BehaviorSubject<Map<number, Tag>>(null);
    private regionCacheDataSource = new BehaviorSubject<Map<number, Region>>(null);
    private photoCacheDataSource = new BehaviorSubject<Map<number, Photo>>(null);
    private mapEntryDataSource = new BehaviorSubject<MapEntry[]>(null);

    cityDataSource$ = this.cityDataSource.asObservable();
    tagDataSource$ = this.tagDataSource.asObservable();
    regionDataSource$ = this.regionDataSource.asObservable();
    photoDataSource$ = this.photoDataSource.asObservable();
    tagCacheDataSource$ = this.tagCacheDataSource.asObservable();
    regionCacheDataSource$ = this.regionCacheDataSource.asObservable();
    photoCacheDataSource$ = this.photoCacheDataSource.asObservable();
    mapEntryDataSource$ = this.mapEntryDataSource.asObservable();

    private tagCache = new Map<number, Tag>();
    private regionCache = new Map<number, Region>();
    private photoCache = new Map<number, Photo>();
    

    private readonly baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
    private readonly spreadsheetId = '1eO7bGeKYqZqnI9F7V4dClcmADSqRPq471ccVkNKqjXo';
    private readonly apiKey = 'AIzaSyDpl_N8k-85ocm5OOIRA-3HC1j1ZmHH2C4';

    private data: string[] = [];
    private photoUrls: string[];
    private cityInfo: string;
    private allCities: string[] = ['Lai Châu', 'Lào Cai', 'Hà Giang', 'Cao Bằng', 'Sơn La', 'Yên Bái', 'Tuyên Quang', 'Lạng Sơn', 'Quảng Ninh', 'Hòa Bình', 'Hà Tây', 'Ninh Bình', 'Thái Bình', 'Thanh Hóa', 'Nghệ An', 'Hà Tĩnh', 'Quảng Bình', 'Quảng Trị', 'Thừa Thiên–Huế', 'Quảng Nam', 'Kon Tum', 'Quảng Ngãi', 'Gia Lai', 'Bình Định', 'Phú Yên', 'Đắk Lắk', 'Khánh Hòa', 'Lâm Đồng', 'Ninh Thuận', 'Tây Ninh', 'Đồng Nai', 'Bình Thuận', 'Long An', 'Bà Rịa–Vũng Tàu', 'An Giang', 'Đồng Tháp', 'Tiền Giang', 'Kiên Giang', 'Vĩnh Long', 'Bến Tre', 'Trà Vinh', 'Sóc Trăng', 'Bắc Kạn', 'Bắc Giang', 'Bạc Liêu', 'Bắc Ninh', 'Bình Dương', 'Bình Phước', 'Cà Mau', 'Hải Dương', 'Hà Nam', 'Hưng Yên', 'Nam Định', 'Phú Thọ', 'Thái Nguyên', 'Vĩnh Phúc', 'Điện Biên', 'Đắk Nông', 'Hậu Giang', 'Cần Thơ', 'Đà Nẵng', 'Hà Nội', 'Hải Phòng', 'Hồ Chí Minh'];
    private regionIdToCities = new Map<number, City[]>();
    private regionNameToCities = new Map<string, City[]>();
    regions: Region[] = [
        {
            regionId: 1,
            regionName: "Northern"
        },
        {
            regionId: 2,
            regionName: "Central"
        },
        {
            regionId: 3,
            regionName: "Southern"
        }
    ]

    photos: Photo[] = [
        {
            photoId: 1,
            photoUrl: "assets/DN/DN10.jpg"
        },
        {
            photoId: 2,
            photoUrl: 'assets/DN/DN11.jpg',
        },
        {
            photoId: 3,
            photoUrl: 'assets/DN/DN4.jpg',
        },
        {
            photoId: 4,
            photoUrl: 'assets/DN/DN5.jpg',
        },
        {
            photoId: 5,
            photoUrl: 'assets/DN/DN6.jpg',
        },
        {
            photoId: 6,
            photoUrl: 'assets/DN/DN7.jpg',
        },
        {
            photoId: 7,
            photoUrl: 'assets/DN/DN8.jpg',
        }
    ]
    tags: Tag[] = [
        {
            tagId: 1,
            color: 'rgb(8, 56, 180)',
            name: 'Beaches',
        },
        {
            tagId: 2,
            color: 'rgb(8, 180, 60)',
            name: 'Beaches',
        },
        {
            tagId: 3,
            color: 'rgb(180, 140, 8)',
            name: 'Contryside',
        },
        {
            tagId: 4,
            color: 'rgb(166, 8, 180)',
            name: 'Nightlife',
        },
        {
            tagId: 5,
            color: 'rgb(57, 85, 13)',
            name: 'Pagodas',
        },
        {
            tagId: 6,
            color: 'rgb(131, 5, 5)',
            name: 'Historical',
        },
        {
            tagId: 7,
            color: 'rgb(215, 43, 0)',
            name: 'UNESCO World Heritage Site',
        },
        {
            tagId: 8,
            color: 'rgb(119, 0, 255)',
            name: 'Ethnic Minority Culture',
        },
        {
            tagId: 9,
            color: 'rgb(255, 0, 128)',
            name: 'Caves',
        }
    ]
    cities: City[] = [
        {
            cityId: 1,
            cityName: "Thái Nguyên",
            region: this.regions[0],
            photos: this.photos,
            tags: [this.tags[0] , this.tags[1], this.tags[5], this.tags[7], this.tags[8]],
        },
        {
            cityId: 2,
            cityName: "Đà Nẵng",
            region: this.regions[1],
            photos: this.photos,
            tags: [this.tags[0] , this.tags[1], this.tags[5]],
        },
        {
            cityId: 3,
            cityName: "Hồ Chí Minh",
            region: this.regions[2],
            photos: this.photos,
            tags: [this.tags[0] , this.tags[1], this.tags[5]],
        },
        {
            cityId: 4,
            cityName: "Hà Nội",
            region: this.regions[0],
            photos: this.photos,
            tags: [this.tags[2] , this.tags[1], this.tags[4]],
        },
        {
            cityId: 5,
            cityName: "Phú Yên",
            region: this.regions[1],
            photos: this.photos,
            tags: [this.tags[5] , this.tags[2], this.tags[1]],
        },
        {
            cityId: 6,
            cityName: "Khánh Hòa",
            region: this.regions[1],
            photos: this.photos,
            tags: [this.tags[3] , this.tags[8], this.tags[5]],
        },
        {
            cityId: 7,
            cityName: "Long An",
            region: this.regions[2],
            photos: this.photos,
            tags: [this.tags[0] , this.tags[4], this.tags[3]],
        },
        {
            cityId: 8,
            cityName: "Đồng Nai",
            region: this.regions[2],
            photos: this.photos,
            tags: [this.tags[3] , this.tags[2], this.tags[5]],
        },
    ]
    constructor(
        private httpClient: HttpClient
    ) {
        this.photoUrls = [
            'assets/DN/DN10.jpg',
            'assets/DN/DN11.jpg',
            'assets/DN/DN12.jpg',
            'assets/DN/DN4.jpg',
            'assets/DN/DN5.jpg',
            'assets/DN/DN6.jpg',
            'assets/DN/DN7.jpg',
            'assets/DN/DN8.jpg',
        ]

        this.cityInfo = "City info goes here";
        this.regionIdToCities.set(1, [this.cities[0] , this.cities[0] , this.cities[0], this.cities[0], this.cities[0] , this.cities[0] , this.cities[0]]);
        this.regionIdToCities.set(2, [this.cities[1] , this.cities[1] , this.cities[1], this.cities[1], this.cities[1] , this.cities[1] , this.cities[1]]);
        this.regionIdToCities.set(3, [this.cities[2] , this.cities[2] ,this.cities[2], this.cities[2], this.cities[2] , this.cities[2] , this.cities[2]]);

        this.regionNameToCities.set("Northern", [this.cities[0] , this.cities[0] , this.cities[0], this.cities[0], this.cities[0] , this.cities[0] , this.cities[0]]);
        this.regionNameToCities.set("Central", [this.cities[1] , this.cities[1] , this.cities[1], this.cities[1], this.cities[1] , this.cities[1] , this.cities[1]]);
        this.regionNameToCities.set("Southern", [this.cities[2] , this.cities[2] , this.cities[2], this.cities[2], this.cities[2] , this.cities[2] , this.cities[2]]);
        
        const getRegionsURL = `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('Region', 'A', 'B', 7)}key=${this.apiKey}`;
        
        console.log("getting regions");
        this.httpClient.get(getRegionsURL).subscribe(
            (result: string) =>{
                this.parseRegion(result);
                console.log("done getting regions");
            }
        )

        const getCitiesURL = `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('City', 'A', 'AC', 63)}key=${this.apiKey}`;
        
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

        const getPhotoUrls= `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('Photo', 'A', 'B', 252)}key=${this.apiKey}`;
        
        console.log("getting photos");
        this.httpClient.get(getPhotoUrls).subscribe(
            (result: string) =>{
                this.parsePhoto(result);
                console.log("done getting photos");
            }
        )

        const getMapEtriesUrls= `${this.baseUrl}/${this.spreadsheetId}/values:batchGet?${this.constructRanges('Map', 'A', 'D', 63)}key=${this.apiKey}`;
        
        console.log("getting map entries");
        this.httpClient.get(getMapEtriesUrls).subscribe(
            (result: string) =>{
                this.parseMapEntry(result);
                console.log("done getting map entries");
            }
        )
    }

    getPhotoUrlsOfCity(city: string): Observable<string[]> {
        return of(this.photoUrls);
    }

    getCityInfoByName(city: string): Observable<string> {
        return of(this.cityInfo);
    }

    getCityInfoById(city: string): Observable<string> {
        return of(this.cityInfo);
    }

    getAllCities(): Observable<City[]> {
        return of(this.cities);
    }

    getAllRegions(): Region[] {
        return this.regions;
    }

    getCitiesByRegionId(id: number): City[] {
        return this.regionIdToCities.get(id);
    }

    getCitiesByRegionName(name: string): City[] {
        return this.regionNameToCities.get(name);
    }

    getAllTags(): Tag[] {
        return this.tags;
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
                regionId: Number(rawCity[3]),
                photoIds: rawCity[11].split(',').map(Number),
                tagIds: rawCity[16].split(',').map(Number),
            }
            cities.push(city);
        }
        this.cityDataSource.next(cities);
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

    private transformToViewablUrl(driveUrl: string): string {
        const match = driveUrl.match(/d\/(.*?)\//);
        if (match) {
            return `https://drive.google.com/uc?export=view&id=${match[1]}`;
        } else {
            return null;
        }
    }
}