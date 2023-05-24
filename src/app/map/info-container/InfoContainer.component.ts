import { Component, Input } from "@angular/core";
import { CityService } from "src/app/service/CityService.service";

@Component({
    selector: "app-info-container",
    templateUrl: "./InfoContainer.component.html",
    styleUrls: ["./InfoContainer.component.css"]
})
export class InfoContainer{
    @Input() city: string = "";
    cityInfo: string = "";
    constructor(
        private cityService: CityService
    ) {
       cityService.getCityInfoByName("").subscribe(
        (result: string) => {
            this.cityInfo = result;
        }
       )
    }
}