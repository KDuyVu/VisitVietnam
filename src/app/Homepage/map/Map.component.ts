import { ChangeDetectorRef, Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { combineLatest } from "rxjs";
import { City, CityService, MapEntry, Photo, Region, Tag } from "../../service/CityService.service";

@Component({
    selector: 'app-map',
    templateUrl: './Map.component.html',
    //stylesUrls: ['./map.conponent.css']
    styleUrls: ['./Map.component.css']
})
export class MapComponent {
    bbox: any;
    bboxWidth: any;
    bboxHeight: any;
    x: any;
    y: any;
    viewBox: string;
    mapEntries: MapEntry[] = [];
    isHovering = false;
    selectedCity: City = null;
    searchControl = new FormControl('');
    
    private cityCache = new Map<number, City>();
    private tagCache = new Map<number, Tag>();
    private regionCache = new Map<number, Region>();
    private photoCache = new Map<number, Photo>();
    private cityNameToRegionColor = new Map<string, string>();

    constructor(
        private cityService: CityService,
        private cdr: ChangeDetectorRef
    ) {
        combineLatest([cityService.cityCacheDataSource$, cityService.tagCacheDataSource$, cityService.regionCacheDataSource$, cityService.photoCacheDataSource$, cityService.mapEntryDataSource$])
            .subscribe(([cityCache, tagCache, regionCache, photoCache, mapEntries]) => {
                if (!cityCache || !tagCache || !regionCache || !photoCache) {
                    return;
                }

                this.mapEntries = mapEntries;
                this.regionCache = regionCache;
                this.tagCache = tagCache;
                this.photoCache = photoCache;
                this.cityCache = cityCache;

                this.addTagPhotoRegionToCities();
            });
    }

    triggerView(): void {
        if (this.mapEntries == null) {
            return;
        }
        this.bbox = document.querySelector('svg').getBBox();
        this.bboxWidth = this.bbox.width;
        this.bboxHeight = this.bbox.height;
        this.x = this.bbox.x;
        this.y = this.bbox.y;
        this.viewBox = `${this.x} ${this.y} ${this.bboxWidth} ${this.bboxHeight}`;
        this.cdr.detectChanges();

    }

    onClick(data: MapEntry, event: any) {
        this.isHovering = true;
        this.selectedCity = this.cityCache.get(data.cityId);
    }

    isSelected(data: MapEntry): boolean {
        if (!this.selectedCity || !data) {
            return false;
        }
        return this.selectedCity.cityId === data.cityId;
    }

    onCityChanged(city: City) {
        if (city == null) {
            return;
        }
        this.selectedCity = city;
    }

    getRegionColor(mapEntry: MapEntry): string {
        return this.cityNameToRegionColor.get(mapEntry.cityName);
    }

    private addTagPhotoRegionToCities(): void {
        Array.from(this.cityCache.values()).forEach(city => {
            city.tags = city.tagIds.map(tagId => this.tagCache.get(tagId)).filter(tag => !!tag);
            city.photos = city.photoIds.map(photoId => this.photoCache.get(photoId));
            city.region = this.regionCache.get(city.regionId);
            this.cityNameToRegionColor.set(city.cityName, city.region.color);
        })
    }
}