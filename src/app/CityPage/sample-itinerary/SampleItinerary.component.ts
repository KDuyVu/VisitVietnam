import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { SampleItinerary } from "src/app/service/CityService.service";

@Component({
    selector: "app-sample-itinerary",
    templateUrl: "./SampleItinerary.component.html",
    styleUrls: ["./SampleItinerary.component.css"]
})
export class SampleItineraryComopnent implements OnChanges {
    @Input() displayedOrderToItin = new Map<number, SampleItinerary[]>();

    constructor(
        private cdr: ChangeDetectorRef
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        console.log("changed ",this.displayedOrderToItin);
        this.cdr.detectChanges();
    }

    arrayFromMap(): any {
        return Array.from(this.displayedOrderToItin);
    }
}