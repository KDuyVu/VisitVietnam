import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription, from } from "rxjs";
import { CityService } from "src/app/service/CityService.service";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Slider } from '../service/CityService.service';

interface Image {
  cityName: string,
  cityId: number,
  flickrLink: string,
  copyright: string,
  description: string,
  html: string
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent implements OnInit {
  images: Image[] = [];
  currentChangeImageIndex = 0;

  changeImage(direction: number) {
    const length = this.images.length;
    const activeIndex = (this.currentChangeImageIndex + direction + length) % length;
    this.currentChangeImageIndex = activeIndex;
  }

  // divCount: number[] = Array.from({ length: 10 });
  temp = 0;
  currentSlideShowIndex = 0;
  changeSlideShow(direction: number) {
    console.log(++this.temp);
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
  changeImageByIndex(index: number) {
    this.currentChangeImageIndex = index;
  }

  constructor(private cityService: CityService) { }
  sliders: Slider[];

  ngOnInit() {
    this.cityService.sliderDataSource$.subscribe(
      ((value: Slider[]) => {
        if(value != null) {
          this.sliders = value;
          this.pullSliderData();
        }
      })
    )
  }

  pullSliderData() {
    const allSliderData: Slider[] = [...this.sliders];
    console.log('All slider data:', allSliderData[0].html);

    this.images = allSliderData.map(item => {
      const srcLink = this.getSrcLink(item.html);
      return {
        cityName: item.cityName,
        cityId: item.cityId,
        flickrLink: item.flickrLink,
        copyright: item.copyright,
        description: item.description,
        html: item.html,
        src: srcLink,
        alt: item.cityName
      };
    });
  }

  private getSrcLink(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const imgElement = doc.querySelector('img');
    return imgElement ? imgElement.getAttribute('src') : '';
  }
}

