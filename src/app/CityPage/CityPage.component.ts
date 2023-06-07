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
    itineraries: SampleItinerary[] = null;
    displayedOrderToItin = new Map<number, SampleItinerary[]>();

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
        this.cityId = Number(this.route.snapshot.paramMap.get('id'));
        console.log("id " ,this.cityId);
        combineLatest([this.route.paramMap, this.cityService.cityCacheDataSource$, this.cityService.cityExperienceCacheSource$])
            .subscribe(([params, cityCache, cityExperienceCache]) => {
                if (!params || !cityCache || !cityExperienceCache) {
                    return;
                }
                this.city = cityCache.get(this.cityId);
                this.cityExperiences = cityExperienceCache.get(this.cityId);
                this.cityExperiences = cityExperienceCache.get(32);
            }
        );

        this.cityService.getItinerariesByCityId(this.cityId).subscribe(
            (itineraries) => {
                this.itineraries = itineraries;
                this.processItineraries();
            }
        )
    }

    private processItineraries(): void {
        this.displayedOrderToItin = new Map<number, SampleItinerary[]>();
        this.itineraries.forEach(
            (item) => {
                if (!this.displayedOrderToItin.has(item.displayedOrder)) {
                    this.displayedOrderToItin.set(item.displayedOrder, []);
                }
                this.displayedOrderToItin.get(item.displayedOrder).push(item);
            }
        )
        console.log("huh ? ",this.displayedOrderToItin);
    }
}