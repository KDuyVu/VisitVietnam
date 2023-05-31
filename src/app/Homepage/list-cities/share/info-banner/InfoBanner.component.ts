import { Component, Input } from "@angular/core";

@Component({
    selector: "app-info-banner",
    templateUrl: "./InfoBanner.component.html",
    styleUrls: ["./InfoBanner.component.css"]
})
export class InfoBannerComponent {
    @Input() text: string = null;
    @Input() icon: string = null;

    isClosed: boolean = false;

    onCloseClicked(): void {
        this.isClosed = true;
    }
}