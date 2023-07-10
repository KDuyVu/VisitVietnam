import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { City } from 'src/app/service/CityService.service';

@Component({
  selector: 'app-weather-component',
  templateUrl: './Weather.component.html',
  styleUrls: ['./Weather.component.css'],
})
export class WeatherComponent implements OnChanges {
  @Input() city: City = null;
  myScriptElement: HTMLScriptElement;

  ngOnChanges(changes: SimpleChanges): void {
    if ('city' in changes) {
      if (!this.city) {
        return;
      }
      console.log("city changes ",this.city);
      this.createSrc();
    }
  }

  getA(): string {
    if (!this.city) {
      return null;
    }

    return `{
      "t":"horizontal",
      "lang":"en",
      "sl_lpl":1,
      "ids":["${this.city.weatherId}"],
      "font":"Arial",
      "sl_ics":"one_a",
      "sl_sot":"celcius",
      "cl_bkg":"#FFFFFF00",
      "cl_font":"#FFFFFF",
      "cl_cloud":"#949494ff",
      "cl_persp":"#30b6f3ff",
      "cl_sun":"#FFC107FF",
      "cl_moon":"#FFC107FF",
      "cl_thund":"#FF5722",
      "cl_font":"#000000",
      "width":"30vw"
    }`;
  }

  private createSrc() {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.id = 'weather-script';
    this.myScriptElement.src =
      'https://app1.weatherwidget.org/js/?id=ww_757c2bc9d43ee';
    this.myScriptElement.async = true;
    document.body.appendChild(this.myScriptElement);
  }
}
