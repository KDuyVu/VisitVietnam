import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { CityService } from "src/app/service/CityService.service";

@Component({
  selector: 'app-photo-container',
  templateUrl: './PhotoContainer.component.html',
  styleUrls: ['./PhotoContainer.component.css']
})
export class PhotoContainerComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() city: string;
  x: any;
  y: any;
  viewBox: string;
  isHovering: boolean = false;
  imgWidth: number;
  photoSubscription: Subscription;
  photoUrls: string[][] = [];
  private PHOTO_PER_ROW = 3;
  

  constructor(
    private cityService: CityService
  ) {
    this.photoSubscription = this.cityService.getPhotoUrlsOfCity(this.city).subscribe(
      (result: string[]) => {
        this.processPhotoUrls(result);
      }
    );
  }

  ngOnInit(): void {
    console.log("photo urls : ",this.photoUrls);
  }

  ngOnDestroy(): void {
    this.photoSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
  }

  onMouseLeave(): void {
    this.isHovering = false;
  }

  onMouseEnter(): void {
    //this.isHovering = true;
    //this.city = 
  }

  private processPhotoUrls(photos: string[]) {
    let oneRow = [];
    photos.forEach(photo =>{
      oneRow.push(photo);
      if (oneRow.length == this.PHOTO_PER_ROW) {
        this.photoUrls.push(oneRow);
        oneRow = [];
      }
    });
    if (oneRow.length != 0) {
      this.photoUrls.push(oneRow);
      oneRow = [];
    }
    console.log(this.photoUrls);
  }
}