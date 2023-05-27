import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { City, CityService, Photo, Tag } from "src/app/service/CityService.service";

@Component({
    selector: "app-city-card",
    templateUrl: "./CityCard.component.html",
    styleUrls: ["./CityCard.component.css"]
})
export class CityCardComponent implements OnInit{
    @Input() city: City = null;
    @Input() selectedTagIds = new Set<number>();
    randomPhotos: Photo[] = [];
    displayedTagsNum: number = 3;
    displayedTags: Tag[] = [];
    tagRows = new Array<Array<Tag>>();
    maxCharactersPerRow: number = 35;

    constructor(
        private cityService: CityService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.processTags();
        const nums: number[] = this.getRandomNumbers(0, this.city.photos.length - 1, 4);
        console.log("clickedTag : ",this.selectedTagIds);
        nums.forEach(index => {
            this.randomPhotos.push(this.city.photos[index]);
        });
    }


    redirectClick() {
        window.open('https://www.google.com', '_blank');
    }

    isTagClicked(tag: Tag): boolean {
        console.log("what ",this.selectedTagIds);
        return this.selectedTagIds.has(tag.tagId);
    }

    private processTags(): void {
        let aRow: Tag[] = [];
        let sum: number = 0;
        this.city.tags.forEach(tag => {
            if (sum + tag.name.length > this.maxCharactersPerRow) {
                this.tagRows.push(aRow);
                aRow = [];
                sum = 0;
            }
            aRow.push(tag);
            sum += tag.name.length;
        });
        if (aRow.length > 0) {
            this.tagRows.push(aRow);
        }
    }

    private getDisplayedTags(): Tag[] {
        const nums: number[] = this.getRandomNumbers(0, this.city.tags.length - 1, this.displayedTagsNum);
        const tags: Tag[] = []
        nums.forEach(index => {
            console.log(index);
            tags.push(this.city.tags[index]);
        });
        return tags;
    }

    private getRandomNumbers(a: number, b: number, numSize: number = 4): number[] {
        const result: number[] = [];
        while (result.length < numSize) {
            const randomNumber = Math.floor(Math.random() * (b - a + 1)) + a;
            if (result.indexOf(randomNumber) === -1) {
                result.push(randomNumber);
            }
        }
        return result;
    }
}