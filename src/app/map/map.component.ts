import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../service/DateService.service";
import { MapEntry } from "../service/DateService.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  //stylesUrls: ['./map.conponent.css']
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit{
  bbox: any;
  bboxWidth: any;
  bboxHeight: any;
  x: any;
  y: any;
  viewBox: string;
  mapEntries: MapEntry[] = [];
  isHovering: boolean = false;
  city: string = null;

  constructor(
    private dataSvc: DataService,
    private cdr: ChangeDetectorRef) {
      this.mapEntries = this.dataSvc.getData();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.bbox = document.querySelector('svg').getBBox();
    this.bboxWidth = this.bbox.width;
    this.bboxHeight = this.bbox.height;
    this.x = this.bbox.x;
    this.y = this.bbox.y;
    this.viewBox = `${this.x} ${this.y} ${this.bboxWidth} ${this.bboxHeight}`;
    this.cdr.detectChanges();
  }

  onClick(data: MapEntry, event: any) {
    console.log("event : ",event);
    this.isHovering = true;
    this.city = data.title;
  }

  isSelected(data: MapEntry) {
    return this.city === data.title;
  }

  clicked() {
    console.log("ok");
  }
}