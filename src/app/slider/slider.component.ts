import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription, from } from "rxjs";
import { CityService } from "src/app/service/CityService.service";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';


interface Slider {
  cityName?: string,
  cityId?: number,
  flickrLink?: string,
  copyright?: string,
  description?: string
}

interface Image extends Slider {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent implements OnInit {
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
    },
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
    },
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
    },
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
    },
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
    },
    {
      src:
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/VietnamOMC.png",
      alt: "Image 2"
    },
    {
      src: "https://i.ibb.co/xsggWMH/image.png",
      alt: "Image 3"
    },
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
    },
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
    },
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
  currentChangeImageIndex = 0;

  changeImage(direction: number) {
    const length = this.images.length;
    const activeIndex = (this.currentChangeImageIndex + direction + length) % length;
    this.currentChangeImageIndex = activeIndex;
  }

  // divCount: number[] = Array.from({ length: 10 });
  currentSlideShowIndex = 0;
  changeSlideShow(direction: number) {
    const VisibleImages = 15;
    const length = this.images.length;
    this.currentSlideShowIndex += direction;

    // Wrap around if currentSlideShowIndex goes beyond the length of the images array
    if (this.currentSlideShowIndex >= length - VisibleImages) {
      this.currentSlideShowIndex = 0;
    } else if (this.currentSlideShowIndex < 0) {
      this.currentSlideShowIndex = length - VisibleImages;
    }

    const slideshowElement = document.querySelector('.slides-show-container') as HTMLElement;
    slideshowElement.style.transform = `translateX(-${this.currentSlideShowIndex * 200}px)`;
  }


  constructor() { }

  ngOnInit() {
    this.pullSliderData();
  }

  pullSliderData() {
    this.images.forEach(image => {
      const cityName = image.cityName;
      const cityId = image.cityId;
      const flickrLink = image.flickrLink;
      const copyright = image.copyright;
      const description = image.description;

      // Do something with the data (e.g., log it or pass it to another function)
      console.log(`City Name: ${cityName}`);
      console.log(`City ID: ${cityId}`);
      console.log(`Flickr Link: ${flickrLink}`);
      console.log(`Copyright: ${copyright}`);
      console.log(`Description: ${description}`);
    });
  }
}
