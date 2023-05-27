import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, map, startWith } from "rxjs";
import { City, CityService } from "src/app/service/CityService.service";

@Component({
    selector: "app-search-bar",
    templateUrl: "./SearchBar.component.html",
    styleUrls: ["./SearchBar.component.css"]
})
export class SearchBarComponent implements OnInit {
    @Input() selectedCity?: string;
    @Output() cityChanged: EventEmitter<string> = new EventEmitter();

    options: string[] = [];
    searchControl = new FormControl('');
    filteredItems: Observable<string[]>;
    cityNames: string[] = [];
    cityOptions: string[] = [];

    constructor(
        private cityService:  CityService
    ) {
        this.cityService.getAllCities().subscribe(
            (result: City[]) => {
                this.cityNames = result.map(city => city.cityName);
            }
        )
    }

    ngOnInit(): void {
    }

    onInput(e: Event): void {
        const value = (e.target as HTMLInputElement).value;
        if (!value) {
            this.cityOptions = this.cityNames;
        } else {
            this.cityOptions = this.cityNames.filter(item => item.toLowerCase().includes(value.toLowerCase()));
        }
    }

    onCityChanged(event: string): void {
        if (this.cityNames.filter(name => name === event).length != 0) {
            this.cityChanged.emit(event);
        }
    }
}