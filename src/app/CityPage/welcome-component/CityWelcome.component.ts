import { Component, Input } from "@angular/core";
import { City } from "src/app/service/CityService.service";

@Component({
    selector: "app-city-welcome-component",
    templateUrl: "./CityWelcome.component.html",
    styleUrls: ["./CityWelcome.component.css"]
})
export class CityWelcomeComponent {
    @Input() city: City = null;
}