import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { combineLatest, switchMap } from "rxjs";
import { City, CityExperience, CityService, SampleItinerary } from "../service/CityService.service";

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
    itineraries: SampleItinerary[] = [];

    constructor(
        private route: ActivatedRoute,
        private cityService: CityService,
    ) {
        this.myScriptElement = document.createElement("script");
        this.myScriptElement.src = '//embedr.flickr.com/assets/client-code.js';
        this.myScriptElement.async = true;
        document.body.appendChild(this.myScriptElement);
    }

    ngOnInit() {
        this.cityId = Number(this.route.snapshot.paramMap.get('id'));
        combineLatest([this.route.paramMap, this.cityService.cityCacheDataSource$, this.cityService.cityExperienceCacheSource$])
            .subscribe(([params, cityCache, cityExperienceCache]) => {
                if (!params || !cityCache || !cityExperienceCache) {
                    return;
                }
                this.city = cityCache.get(this.cityId);
                this.cityExperiences = Array.from(cityExperienceCache.values()).filter(experience => experience[0].cityId === this.cityId)[0];
            }
        );

        this.cityService.getItinerariesByCityId(this.cityId).subscribe(
            (itineraries) => {
                this.itineraries = itineraries;
            }
        )
    }
}
