import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { CityService } from "src/app/service/CityService.service";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface Image {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent {
  images: Image[] = [
    {
      src: "https://media.timeout.com/images/105241469/1920/1080/image.jpg",
      alt: "Image 1"
    },
    {
      src:
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/VietnamOMC.png",
      alt: "Image 2"
    },
    {
      src: "https://i.ibb.co/xsggWMH/image.png",
      alt: "Image 3"
    }
  ];
  currentImageIndex = 0;

  changeImage(direction: number) {
    const length = 3;
    const activeIndex = (this.currentImageIndex + direction + length) % length;
    this.currentImageIndex = activeIndex;
  }

  divCount: number[] = Array.from({ length: 10 });
}
