import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { combineLatest, switchMap } from "rxjs";
import { City, CityExperience, CityService, SampleItinerary } from "../../service/CityService.service";

@Component({
    selector: "app-photo-gallery",
    templateUrl: "./PhotoGallery.component.html",
    styleUrls: ["./PhotoGallery.component.css"]
})
export class PhotoGalerryComponent {
    myScriptElement: HTMLScriptElement;
    cityId: number = null;
    city: City = null;
    cityExperiences: CityExperience[] = null;
    itineraries: SampleItinerary[] = null;
    displayedOrderToItin = new Map<number, SampleItinerary[]>();

    constructor(
        private route: ActivatedRoute,
    ) {
    }
}
