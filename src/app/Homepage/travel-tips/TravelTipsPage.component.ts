import { AfterViewInit, Component, QueryList, ViewChildren } from "@angular/core";
import { CityService, TravelTip } from "src/app/service/CityService.service";
import { TravelTipsCardComponent } from "./travel-tips-card/TravelTipsCard.component";

@Component({
    selector: "app-travel-tips-page",
    templateUrl: "./TravelTipsPage.component.html",
    styleUrls: ["./TravelTipsPage.component.css"]
})
export class TravelTipsPageComponent {

    travelTips: TravelTip[] = [];
    itemsPerPage: number = 3;
    currentPage: number = 1;
    rectColors: string[] = ['#D8F7E6', '#FFEFE4', '#F7E8FF', '#E8F1FF', '#FBF1D9'];
    maxHeightInt: number = 0;
    maxHeightStr: string = null;

    constructor(
        private cityService: CityService
    ) {
        this,cityService.travelTipsDataSource$.subscribe(
            (result: TravelTip[]) => {
                if (!result) {
                    return;
                }
                this.travelTips = result;
            }
        )
    }

    onPageChanged(pageNumber: number): void {
        this.currentPage = pageNumber;
    }

    onCardHeaderChanged(height: number) {
      this.maxHeightInt = Math.max(this.maxHeightInt, height);
      console.log("height : ",this.maxHeightInt);
      this.maxHeightStr = `${this.maxHeightInt}px`;
    }

    getDisplayedItems(): TravelTip[] {
        const actualLayer = this.currentPage - 1;
        return this.travelTips.slice(this.itemsPerPage * actualLayer, Math.min((actualLayer + 1) * this.itemsPerPage, this.travelTips.length));
    }
}
