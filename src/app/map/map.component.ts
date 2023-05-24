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
  city: string = "";
  

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
    console.log(this.x, ' ', this.y, ' ', this.bboxWidth, ' ', this.bboxHeight);
    this.viewBox = `${this.x} ${this.y} ${this.bboxWidth} ${this.bboxHeight}`;
    this.cdr.detectChanges();
    const infoBoxDiv = document.querySelector('app-info-container') as HTMLDivElement;
    console.log("what ",infoBoxDiv.offsetWidth);
  }

  onClick(data: MapEntry, event: any) {
    console.log("event : ",event);
    this.isHovering = true;
    this.city = data.title;
  }

  onMouseLeave(): void {
    this.isHovering = false;
  }

  onMouseEnter(): void {
    //this.isHovering = true;
    //this.city = 
  }
}