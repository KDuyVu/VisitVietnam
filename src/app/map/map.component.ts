import { AfterViewInit, ChangeDetectorRef, Component } from "@angular/core";
import { DataService} from "../service/DataService.service";
import { FormControl } from "@angular/forms";
import { CityService, MapEntry  } from "../service/CityService.service";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    //stylesUrls: ['./map.conponent.css']
    styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
    bbox: any;
    bboxWidth: any;
    bboxHeight: any;
    x: any;
    y: any;
    viewBox: string;
    mapEntries: MapEntry[] = [];
    isHovering = false;
    selectedCity: string = null;
    searchControl = new FormControl('');

    constructor(
        private cityService: CityService,
        private dataSvc: DataService,
        private cdr: ChangeDetectorRef) {
        //this.mapEntries = this.dataSvc.getData();
        this.cityService.mapEntryDataSource$.subscribe(
            (result: MapEntry[]) => {
                this.mapEntries = result;
                this.triggerView();
            }
        )
    }

    ngAfterViewInit(): void {
        this.bbox = document.querySelector('svg').getBBox();
        console.log(document.querySelector('svg'));
        console.log(document.querySelector('svg').getBBox());
        this.bboxWidth = this.bbox.width;
        this.bboxHeight = this.bbox.height;
        this.x = this.bbox.x;
        this.y = this.bbox.y;
        this.viewBox = `${this.x} ${this.y} ${this.bboxWidth} ${this.bboxHeight}`;
        console.log('this '+this.viewBox);
        this.cdr.detectChanges();
    }

    triggerView(): void {
        console.log("called");
        if (this.mapEntries == null) {
            return;
        }
        this.bbox = document.querySelector('svg').getBBox();
        this.bboxWidth = this.bbox.width;
        this.bboxHeight = this.bbox.height;
        this.x = this.bbox.x;
        this.y = this.bbox.y;
        this.viewBox = `${this.x} ${this.y} ${this.bboxWidth} ${this.bboxHeight}`;
        console.log('this '+this.viewBox);
        this.cdr.detectChanges();

    }

    onClick(data: MapEntry, event: any) {
        console.log("event : ", event);
        this.isHovering = true;
        this.selectedCity = data.cityName;
    }

    isSelected(data: MapEntry) {
        return this.selectedCity === data.cityName;
    }

    onCityChanged(newCityName: string) {
        this.selectedCity = newCityName;
    }
}