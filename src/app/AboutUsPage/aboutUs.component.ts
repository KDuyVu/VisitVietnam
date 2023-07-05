import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { CityService } from "src/app/service/CityService.service";

@Component({
  selector: 'app-about-us',
  templateUrl: './aboutUs.component.html',
  styleUrls: ['./aboutUs.component.css']
})
export class AboutUsComponent {
  imagesLink = [
    "https://i.ibb.co/THFp4WZ/image.png",
    "https://i.ibb.co/fC6kW6W/image.png",
    "https://i.ibb.co/bWgsTx9/image.png",
    "https://i.ibb.co/brPKc32/image.png",
    "https://i.ibb.co/QK0wnWD/image.png",
    "https://i.ibb.co/g4DBkYk/image.png",
    "https://i.ibb.co/MN6KBGJ/image.png",
    "https://i.ibb.co/VNrGfqs/image.png"
  ];
}
