import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { City, CityExperience } from "src/app/service/CityService.service";

@Component({
    selector: "app-city-experience",
    templateUrl: "./CityExperience.component.html",
    styleUrls: ["./CityExperience.component.css"]
})
export class CityExperienceComponent {
    @Input() cityExperiences: CityExperience[] = null;

    constructor() { }
}
