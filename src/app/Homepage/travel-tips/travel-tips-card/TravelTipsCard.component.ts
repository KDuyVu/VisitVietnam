import { Component, Input } from "@angular/core";
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayTipComponent } from "../overlay-tip/OverlayTip.component";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TravelTip } from "src/app/service/CityService.service";

@Component({
    selector: "app-travel-tip-card",
    templateUrl: "./TravelTipsCard.component.html",
    styleUrls: ["./TravelTipsCard.component.css"]
})
export class TravelTipsCardComponent {
    @Input() blog: TravelTip = null;
    @Input() rectColor: string = '#FBF1D9';

    constructor(
        public dialog: MatDialog
    ) { }

    openOverlayTip() {
        const dialogConfig: MatDialogConfig = {
            maxHeight: '80vh',
            maxWidth: '70vw',
            data: {text: this.blog.text},
          };
        const dialogRef = this.dialog.open(OverlayTipComponent, dialogConfig);
    }
}