import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CityService, TravelTip } from "src/app/service/CityService.service";
import { OverlayTipComponent } from "src/app/shared-components/overlay-tip/OverlayTip.component";

@Component({
    selector: "app-travel-tips-page",
    templateUrl: "./TravelTipsPage.component.html",
    styleUrls: ["./TravelTipsPage.component.css"]
})
export class TravelTipsPageComponent implements OnChanges {
    @Input() header: string = "Travel tips";
    @Input() isViewAllEnabled: boolean = true;
    @Input() hiddenBlogIds: number[] = [];

    @Output() cardClicked = new EventEmitter<number>();

    travelTips: TravelTip[] = [];
    travelTipsCache = new Map<number, TravelTip>();
    itemsPerPage: number = 3;
    currentPage: number = 1;
    rectColors: string[] = ['#D8F7E6', '#FFEFE4', '#F7E8FF', '#E8F1FF', '#FBF1D9'];
    maxHeightInt: number = 0;
    maxHeightStr: string = null;

    selectedPage: number = 1;

    constructor(
        public dialog: MatDialog,
        private cityService: CityService,
        private router: Router,
    ) {
        this.cityService.travelTipsCacheDataSource$.subscribe(
            (result) => {
                if (!result) {
                    return;
                }
                this.travelTipsCache = result;
                this.travelTips = Array.from(result.values()).filter(travelTip => !this.hiddenBlogIds.includes(travelTip.tipId));
            }
        )
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.travelTips = Array.from(this.travelTipsCache.values()).filter(travelTip => !this.hiddenBlogIds.includes(travelTip.tipId));
      this.currentPage = 1;
    }

    onPageChanged(pageNumber: number): void {
        this.currentPage = pageNumber;
    }

    getDisplayedItems(): TravelTip[] {
        const actualLayer = this.currentPage - 1;
        return this.travelTips.slice(this.itemsPerPage * actualLayer, Math.min((actualLayer + 1) * this.itemsPerPage, this.travelTips.length));
    }

    onCardClicked(blogId: number): void {
      this.cardClicked.emit(blogId);
    }

    onViewAllClicked(): void {
      this.router.navigate(['/blogs']);
    }
}
