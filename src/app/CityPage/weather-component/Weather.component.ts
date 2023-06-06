import { Component, Input } from "@angular/core";
import { City } from "src/app/service/CityService.service";

@Component({
    selector: "app-weather-component",
    templateUrl: "./Weather.component.html",
    styleUrls: ["./Weather.component.css"]
})
export class WeatherComponent {
    myScriptElement: HTMLScriptElement;

    constructor() {
        this.myScriptElement = document.createElement("script");
        this.myScriptElement.src = 'https://app1.weatherwidget.org/js/?id=ww_757c2bc9d43ee';
        this.myScriptElement.async = true;
        document.body.appendChild(this.myScriptElement);
    }
}