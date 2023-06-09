import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, combineLatest, map, startWith } from "rxjs";
import { City, CityService, Region } from "src/app/service/CityService.service";

interface NzOption {
    label: string,
    value: string,
    groupLabel: string,
}

@Component({
    selector: "app-search-bar",
    templateUrl: "./SearchBar.component.html",
    styleUrls: ["./SearchBar.component.css"]
})
export class SearchBarComponent {
    @Output() cityChanged: EventEmitter<City> = new EventEmitter();

    options: string[] = [];
    searchControl = new FormControl('');
    filteredItems: Observable<string[]>;
    cityNames: string[] = [];
    cityOptions: string[] = [];
    allCities: City[] = [];
    listOfGroupOption = [];

    nzOptionByBigRegionName = new Map<string, NzOption[]>();
    bigRegionByCityName = new Map<string, string>();
    selectedCityByBigRegionName  = new Map<string, string>();
    regionCache = new Map<number, Region>();
    bigRegionNameToId = new Map<string, number>();

    bigRegionNames = new Array<string>();
    inputCityName: string = null;

    warning: boolean = false;

    constructor(
        private cityService: CityService
    ) {
        combineLatest(this.cityService.cityDataSource$, this.cityService.regionCacheDataSource$)
            .subscribe(([cities, regionCache]) => {
                if (!cities || !regionCache) {
                    return;
                }

                this.allCities = cities;
                this.regionCache = regionCache;
                this.cityOptions = this.allCities.map(city => city.cityName);
                this.initMaps();
            })
    }

    onInput(e: Event): void {
        const value = (e.target as HTMLInputElement).value;
        if (!value) {
            this.cityOptions = this.allCities.map(city => city.cityName);
        } else {
            this.cityOptions = this.allCities.map(city => city.cityName).filter(item => item.toLowerCase().includes(value.toLowerCase()));
        }
    }

    onValueSelected(event: string): void {
        this.cityChanged.emit(this.allCities.filter(city => city.cityName === event).at(0));
        Array.from(this.selectedCityByBigRegionName.keys()).forEach(regionName => {
            this.selectedCityByBigRegionName[regionName] = null;
        })
        this.selectedCityByBigRegionName[this.bigRegionByCityName.get(event)] = event;
    }

    onInputChanged(): void {
        if (!!this.bigRegionByCityName.get(this.inputCityName)) {
            this.onValueSelected(this.inputCityName);
        }
    }

    private initMaps(): void {
        this.listOfGroupOption = [];
        this.allCities.forEach(city => {
            const region: Region = this.regionCache.get(city.regionId);
            if (!this.bigRegionNames.includes(region.bigRegionName)) {
                this.bigRegionNames.push(region.bigRegionName);
            }
            if (!this.nzOptionByBigRegionName.has(region.bigRegionName)) {
                this.nzOptionByBigRegionName.set(region.bigRegionName, []);
            }
            this.bigRegionByCityName.set(city.cityName, region.bigRegionName);
            this.selectedCityByBigRegionName.set(region.bigRegionName, null);
            this.bigRegionNameToId.set(region.bigRegionName, region.bigRegionId);
            this.nzOptionByBigRegionName.get(region.bigRegionName).push({
                label: city.cityName,
                value: city.cityName,
                groupLabel: region.regionName,
            });
        });

        this.bigRegionNames.sort((name1, name2) => this.bigRegionNameToId.get(name1) - this.bigRegionNameToId.get(name2));

        this.bigRegionNames.forEach(
            (name) => {
                this.nzOptionByBigRegionName.get(name).sort((option1, option2) => option1.groupLabel.localeCompare(option2.groupLabel));
            }
        )
    }
}