import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { City, CityService, Photo, Tag } from "src/app/service/CityService.service";

@Component({
    selector: "app-city-card",
    templateUrl: "./CityCard.component.html",
    styleUrls: ["./CityCard.component.css"]
})
export class CityCardComponent implements OnChanges {
    @Input() city: City = null;
    @Input() selectedTagIds = new Set<number>();
    @Input() allTagsSelected: boolean = false;
    randomPhotos: Photo[] = [];
    displayedTagsNum: number = 3;
    displayedTags: Tag[] = [];
    tagRows = new Array<Array<Tag>>();
    maxCharactersPerRow: number = 30;
    loadedImages = new Set<number>();

    constructor(
        private cityService: CityService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.tagRows = new Array<Array<Tag>>();
        this.randomPhotos = [];
        this.cdr.detectChanges();
        this.displayedTags = [];
        this.processTags();
        this.loadedImages = new Set<number>();
        const nums: number[] = this.getRandomNumbers(0, this.city.photos.length - 1, 4);
        nums.forEach(index => {
            this.randomPhotos.push(this.city.photos[index]);
        });
    }


    redirectClick() {
        window.open('https://www.google.com', '_blank');
    }

    isTagClicked(tag: Tag): boolean {
        return this.selectedTagIds.has(tag.tagId);
    }

    onLoaded(id: number): void {
        this.loadedImages.add(id);
    }

    isLoaded(id: number): boolean {
        return this.loadedImages.has(id);
    }

    private processTags(): void {
        let aRow: Tag[] = [];
        let sum: number = 0;
        this.city.tags.sort((tag1, tag2) => tag1.name.length - tag2.name.length)
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