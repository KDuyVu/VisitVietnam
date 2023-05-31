import { Component, Output } from "@angular/core";
import { CityService, Tag } from "src/app/service/CityService.service";
import { EventEmitter } from "@angular/core";

@Component({
    selector: "app-filter-bar",
    templateUrl: "./FilterBar.component.html",
    styleUrls: ["./FilterBar.component.css"]
})
export class FilterBarComponent {
    @Output() onTagClicked = new EventEmitter<Tag>();
    @Output() onSelectedTagsChanged = new EventEmitter<Set<number>>();
    tags: Tag[] = [];
    tagsName: string[] = [];
    selectedTagIds = new Set<number>();

    constructor(
        private cityService: CityService
    ) {
        this.cityService.tagDataSource$.subscribe(
            (tags: Tag[]) => {
                this.tags = tags;
            }
        )
    }

    onClickTag(tag: Tag) {
        if (this.selectedTagIds.has(tag.tagId)) {
            this.selectedTagIds.delete(tag.tagId);
        } else {
            this.selectedTagIds.add(tag.tagId);
        }
        this.onSelectedTagsChanged.emit(this.selectedTagIds);
    }

    isSelected(tag: Tag) {
        return this.selectedTagIds.has(tag.tagId);
    }
}