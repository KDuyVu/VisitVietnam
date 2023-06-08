import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogData {
    text: string,
}

@Component({
    selector: "app-overlay-tip",
    templateUrl: "./OverlayTip.component.html",
    styleUrls: ["./OverlayTip.component.css"]
})
export class OverlayTipComponent implements OnInit{
    content: string = '';
    constructor(
        public dialogRef: MatDialogRef<OverlayTipComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { 
        this.content = data.text;
    }

    ngOnInit(): void {
        const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/;
        const styleMatch = this.content.match(styleRegex);
        const extractedStyle = styleMatch ? styleMatch[1] : '';

        const element = document.getElementById('html-wrapper');
        this.content = this.content.replace(/<body([^>]*)>/i, '<div class="body-wrapper"><body$1>');
        this.content = this.content.replace(/<\/body>/i, '</body></div>');
        this.content = this.content.replace(/(^|\})([^{]+)(\{)/g, '$1.body-wrapper $2$3');
        console.log(this.content);
        element.innerHTML = this.content;
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }
}