import { Component, Input, OnInit } from "@angular/core";
import { combineLatest } from "rxjs";
import { Region, City, CityService, Tag, Photo} from "src/app/service/CityService.service";

@Component({
    selector: "app-list-cities",
    templateUrl: "./ListCities.component.html",
    styleUrls: ["./ListCities.component.css"]
})
export class ListCitiesComponent implements OnInit {
    tagCache = new Map<number, Tag>();
    photoCache = new Map<number, Photo>();
    regionCache = new Map<number, Region>();

    regions: Region[] = [];
    regionIdToCities = new Map<number, City[]>;
    allCities: City[] = [];
    filteredCities: City[] = [];
    displayedCities = new Array<Array<City>>();

    minRowDisplayed: number = 1;
    showedRow: number = 1;
    itemsPerRow: number = 4;
    selectedTagIds = new Set<number>();

    constructor(
        private cityService: CityService
    ) {
        this.regions = cityService.getAllRegions();
        this.regions.forEach(region => {
            this.regionIdToCities.set(region.regionId, this.cityService.getCitiesByRegionId(region.regionId));
        })
        cityService.getAllCities().subscribe(
            (result: City[]) =>{
                this.allCities = result;
                this.filteredCities = result;
                this.resetDisplayedCities();
            }
        )

        combineLatest([cityService.cityDataSource$, cityService.tagDataSource$, cityService.regionDataSource$, cityService.photoDataSource$,
            cityService.tagCacheDataSource$, cityService.regionCacheDataSource$, cityService.photoCacheDataSource$])
            .subscribe(([cities, tags, regions, photos, tagCache, regionCache, photoCache]) => {
                if (!cities || !tags || !regions || !photos || !tagCache || !regionCache || !photoCache) {
                    return;
                }

                this.regionCache = regionCache;
                this.tagCache = tagCache;
                this.photoCache = photoCache;

                this.regions = regions;
                this.regions.forEach(region => {
                    this.regionIdToCities.set(region.regionId, this.cityService.getCitiesByRegionId(region.regionId));
                });
                
                this.allCities = cities;
                this.addTagPhotoRegionToCities();
                this.filteredCities = this.allCities;
                this.resetDisplayedCities();
            });
    }

    ngOnInit(): void { }

    getCitiesForRegion(id: number): City[] {
        return this.regionIdToCities.get(id);
    }

    getOneRandomPhotoOfCity(city: City): string {
        return city.photos[this.getRandomInt(0, city.photos.length - 1)].photoUrl;
    }

    getRowItems(rowNum: number): City[] {
        const start: number = (rowNum - 1)* this.itemsPerRow;
        const end: number = Math.min(start + this.itemsPerRow, this.filteredCities.length);
        return this.filteredCities.slice(start, end);
    }

    getDummyArrayOfRowNeeded(): number[] {
        const arr: number[] = [];
        const length = Math.max(1, this.filteredCities.length / this.itemsPerRow + Number(this.filteredCities.length % this.itemsPerRow !== 0));
        for (let i = 1 ; i <= length ; i++) {
            arr.push(i);
        }
        return arr;
    }

    onSelectedTagsChanged(selectedTagIdsSet: Set<number>): void {
        this.selectedTagIds = selectedTagIdsSet;
        this.filterCityOnTagsChanged();
        this.resetDisplayedCities();
    }

    onShowMoreButtonClicked(): void {
        if (this.showedRow < this.displayedCities.length) {
            this.showedRow++;
        }
    }

    onShowLessButtonClicked(): void {
        if (this.showedRow > 1) {
            this.showedRow--;
        }
    }

    onShowAllButtonClicked(): void {
        this.showedRow = this.displayedCities.length;
    }

    onCollapseAllButtonClicked(): void {
        this.showedRow = Math.min(this.displayedCities.length, this.minRowDisplayed);
    }

    isShowLessButtonDisabled() {
        return this.showedRow === 1;
    }

    isShowMoreButtonDisabled() {
        return this.showedRow === this.displayedCities.length;
    }

    isCollapseAllButtonDisabled() {
        return this.showedRow === 1;
    }

    isShowAllButtonDisabled() {
        return this.showedRow === this.displayedCities.length;
    }

    getFirstNthRowOfCities(n: number): Array<Array<City>> {
        return this.displayedCities.slice(0, n);
    }

    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private filterCityOnTagsChanged(): void {
        if (this.selectedTagIds.size === 0) {
            this.filteredCities = this.allCities;
            return;
        }
        this.filteredCities = this.allCities.filter(city =>{
            return city.tags.filter(tag => this.selectedTagIds.has(tag.tagId)).length === this.selectedTagIds.size;
        });
    }

    private constructDisplayedCities(): void {
        // Construct displayed cities from filtered
        let aRow: City[] = [];
        this.displayedCities = [];
        this.filteredCities.forEach(city =>{
            if (aRow.length === this.itemsPerRow) {
                this.displayedCities.push(aRow);
                aRow = [];
            }
            aRow.push(city);
        });
        if (aRow.length !== 0) {
            this.displayedCities.push(aRow);
        }
    }

    private resetDisplayedCities(): void {
        this.constructDisplayedCities();
        this.showedRow = Math.min(this.displayedCities.length, this.minRowDisplayed);
    }

    private addTagPhotoRegionToCities(): void {
        this.allCities.forEach(city => {
            city.tags = city.tagIds.map(tagId => this.tagCache.get(tagId)).filter(tag => !!tag);
            city.photos = city.photoIds.map(photoId => this.photoCache.get(photoId));
            city.region = this.regionCache.get(city.regionId);
        })
    }
}