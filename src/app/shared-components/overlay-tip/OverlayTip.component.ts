import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Route, Router } from "@angular/router";
import { TravelTip } from "src/app/service/CityService.service";
import { processHTML } from "src/app/service/Functions";

export interface DialogData {
    text: string,
    isOpenInNewTab?: boolean,
    blog: TravelTip,
}

@Component({
    selector: "app-overlay-tip",
    templateUrl: "./OverlayTip.component.html",
    styleUrls: ["./OverlayTip.component.css"]
})
export class OverlayTipComponent implements OnInit {
    isOpenInNewTab: boolean = true;
    content: string = '';
    blog: TravelTip;
    @Output() onRedirect = new EventEmitter();
    constructor(
        public dialogRef: MatDialogRef<OverlayTipComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private route: Router,
        private cdr: ChangeDetectorRef,
    ) {
        this.content = data.text;
        this.isOpenInNewTab = data.isOpenInNewTab;
        this.blog = data.blog;
    }

    ngOnInit(): void {
        const element = document.getElementById('html-wrapper');
        this.content = processHTML(this.content);
        element.innerHTML = this.content;
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }

    openBlogInNewTab() {
      this.dialogRef.close({openInNewTab: true});
    }
}
