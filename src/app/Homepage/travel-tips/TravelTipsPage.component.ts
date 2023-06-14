import { Component } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CityService, TravelTip } from "src/app/service/CityService.service";
import { OverlayTipComponent } from "src/app/shared-components/overlay-tip/OverlayTip.component";

@Component({
    selector: "app-travel-tips-page",
    templateUrl: "./TravelTipsPage.component.html",
    styleUrls: ["./TravelTipsPage.component.css"]
})
export class TravelTipsPageComponent {

    travelTips: TravelTip[] = [];
    travelTipsCache = new Map<number, TravelTip>();
    itemsPerPage: number = 3;
    currentPage: number = 1;
    rectColors: string[] = ['#D8F7E6', '#FFEFE4', '#F7E8FF', '#E8F1FF', '#FBF1D9'];
    maxHeightInt: number = 0;
    maxHeightStr: string = null;

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
                this.travelTips = Array.from(result.values());
            }
        )
    }

    onPageChanged(pageNumber: number): void {
        this.currentPage = pageNumber;
    }

    getDisplayedItems(): TravelTip[] {
        const actualLayer = this.currentPage - 1;
        return this.travelTips.slice(this.itemsPerPage * actualLayer, Math.min((actualLayer + 1) * this.itemsPerPage, this.travelTips.length));
    }

    onCardClicked(blogId: number): void {
      const blog: TravelTip = this.travelTipsCache.get(blogId);
      const dialogConfig: MatDialogConfig = {
          maxHeight: '80vh',
          maxWidth: '70vw',
          data: {text: blog.text, isOpenInNewTab : true, blog: blog},
        };
      const dialogRef = this.dialog.open(OverlayTipComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        (result: any) => {
          if (!!result && result['openInNewTab'] === true) {
            this.router.navigate(['blogs', blog.tipId]);
          }
        }
      )
    }

    onViewAllClicked(): void {
      this.router.navigate(['/blogs']);
    }
}
