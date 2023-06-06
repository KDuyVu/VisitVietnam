import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { combineLatest, switchMap } from "rxjs";
import { City, CityExperience, CityService } from "../service/CityService.service";

@Component({
    selector: "app-city-page",
    templateUrl: "CityPage.component.html",
    styleUrls: ["CityPage.component.css"]
})
export class CityPageComponent implements OnInit{
    myScriptElement: HTMLScriptElement;
    cityId: number = null;
    city: City = null;
    cityExperiences: CityExperience[] = null;

    constructor(
        private route: ActivatedRoute,
        private cityService: CityService,
    ) {
        this.myScriptElement = document.createElement("script");
        this.myScriptElement.src = 'https://app1.weatherwidget.org/js/?id=ww_757c2bc9d43ee';
        this.myScriptElement.async = true;
        document.body.appendChild(this.myScriptElement);
    }

    ngOnInit() {
        combineLatest([this.route.paramMap, this.cityService.cityCacheDataSource$, this.cityService.cityExperienceCacheSource$])
            .subscribe(([params, cityCache, cityExperienceCache]) => {
                if (!params || !cityCache || !cityExperienceCache) {
                    return;
                }
                this.cityId = Number(params.get('id'));
                this.city = cityCache.get(this.cityId);
                this.cityExperiences = cityExperienceCache.get(this.cityId);
                this.cityExperiences = cityExperienceCache.get(32);
            }
        );
      }
}