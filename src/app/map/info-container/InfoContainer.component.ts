import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { PhotoService } from "src/app/service/PhotoService.service";

@Component({
  selector: 'app-info-container',
  templateUrl: './InfoContainer.component.html',
  styleUrls: ['./InfoContainer.component.css']
})
export class InfoContainerComponent implements OnInit, AfterViewInit, OnDestroy{
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
    private photoSerive: PhotoService
  ) {
    this.photoSubscription = this.photoSerive.getPhotoUrlsOfCity(this.city).subscribe(
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
    const infoBoxDiv = document.querySelector('#info-panel-id') as HTMLDivElement;
    const styles = window.getComputedStyle(infoBoxDiv);
    const width = parseFloat(styles.width);
    console.log(infoBoxDiv.offsetWidth, ' ', styles);
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