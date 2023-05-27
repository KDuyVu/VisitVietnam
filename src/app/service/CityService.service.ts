import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface City {
    cityId: number,
    cityName: string,
    region: Region,
    photos: Photo[],
    tags: Tag[],
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

@Injectable({
    providedIn: 'root'
})
export class CityService {
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
            name: 'Forest',
        },
        {
            tagId: 3,
            color: 'rgb(180, 140, 8)',
            name: 'Contryside',
        },
        {
            tagId: 4,
            color: 'rgb(166, 8, 180',
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
    constructor() {
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

    /*getAllRegion(): Observable<Region[]> {
        return of(this.regions);
    }

  }
    getCitiesByRegionId(id: number): Observable<City[]> {
        return of(this.regionIdToCities.get(id));
    }

    getCitiesByRegionName(name: string): Observable<City[]> {
        return of(this.regionNameToCities.get(name));
    }*/

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
}