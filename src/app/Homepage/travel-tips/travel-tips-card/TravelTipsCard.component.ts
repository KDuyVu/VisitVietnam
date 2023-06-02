import { Component, Input } from "@angular/core";

@Component({
    selector: "app-travel-tip-card",
    templateUrl: "./TravelTipsCard.component.html",
    styleUrls: ["./TravelTipsCard.component.css"]
})
export class TravelTipsCardComponent {
    @Input() header: string = '';
    @Input() text: string = '';
}