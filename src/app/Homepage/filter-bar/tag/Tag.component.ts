import { Component, Input } from "@angular/core";
import { Tag } from "src/app/service/CityService.service";

@Component({
    selector: "app-tag",
    templateUrl: "./Tag.component.html",
    styleUrls: ["./Tag.component.css"]
})
export class TagComponent {
    @Input() tag: Tag;
    @Input() selected: boolean = false;
    @Input() shadowAll: boolean = false;
    

    getBackgroundColor(): string {
        const renderedColor: string = this.tag.color;
        return this.tag.color.slice(0, this.tag.color.length - 1) + ",0.2)";
    }
}