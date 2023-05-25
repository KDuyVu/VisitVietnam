import { Component, Input } from "@angular/core";
import { CityService } from "src/app/service/CityService.service";

@Component({
    selector: "app-info-container",
    templateUrl: "./InfoContainer.component.html",
    styleUrls: ["./InfoContainer.component.css"]
})
export class InfoContainerComponent{
    @Input() city = "";
    cityInfo = "";
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