import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { SampleItinerary } from "src/app/service/CityService.service";

@Component({
    selector: "app-sample-itinerary",
    templateUrl: "./SampleItinerary.component.html",
    styleUrls: ["./SampleItinerary.component.css"]
})
export class SampleItineraryComopnent implements OnChanges, OnInit {
    @Input() displayedOrderToItin = new Map<number, SampleItinerary[]>();

    constructor(
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
      const element = document.getElementById("day-items");

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.cdr.detectChanges();
    }

    arrayFromMap(): any {
        return Array.from(this.displayedOrderToItin);
    }
}
