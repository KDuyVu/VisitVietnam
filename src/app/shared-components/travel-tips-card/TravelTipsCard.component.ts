import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayTipComponent } from "../overlay-tip/OverlayTip.component";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TravelTip } from "src/app/service/CityService.service";
import { EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-travel-tip-card",
    templateUrl: "./TravelTipsCard.component.html",
    styleUrls: ["./TravelTipsCard.component.css"]
})
export class TravelTipsCardComponent  {
    @Input() blog: TravelTip = null;
    @Input() rectColor: string = '#FBF1D9';
    @Input() height: string = null;
    @Input() isOpenInNewTab: boolean = true;
    @Output() cardClicked = new EventEmitter<number>

    constructor(
        public dialog: MatDialog,
        private cdr: ChangeDetectorRef,
        private router: Router,
    ) { }

    onCardClicked() {
      this.cardClicked.emit(this.blog.tipId);
    }

    openOverlayTip() {
        const dialogConfig: MatDialogConfig = {
            maxHeight: '80vh',
            maxWidth: '70vw',
            data: {text: this.blog.text, isOpenInNewTab : this.isOpenInNewTab, blog: this.blog},
          };
        const dialogRef = this.dialog.open(OverlayTipComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
          (result: any) => {
            if (!!result && result['openInNewTab'] === true) {
              this.router.navigate(['blog', this.blog.tipId]);
            }
          }
        )
    }
}
