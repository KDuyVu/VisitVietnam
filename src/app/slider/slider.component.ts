import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, OnChanges, SimpleChanges } from "@angular/core";
import { Subscription, from } from "rxjs";
import { CityService } from "src/app/service/CityService.service";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Slider } from '../service/CityService.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

export class SliderComponent implements OnChanges{

  images: Image[] = [];

  @Input() sliderNumber: number;
  numberOfCity: number;


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

    this.images = allSliderData.map(item => {
      return {
        cityName: item.cityName,
        cityId: item.cityId,
        flickrLink: item.flickrLink,
        copyright: item.copyright,
        description: item.description,
        html: item.html
      };
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sliderNumber) {
      this.numberOfCity = changes.sliderNumber.currentValue - 1;
    }
  }
  getSliderHtml(): SafeHtml {
    if (!this.sliderNumber) {
      return null;
    }
    if (this.images.length > this.numberOfCity) {
      return this.sanitizer.bypassSecurityTrustHtml(this.images[this.numberOfCity].html);
    }
    return '';
  }

  myScriptElement: HTMLScriptElement;
  constructor(private cityService: CityService, private sanitizer: DomSanitizer) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src =
      '//embedr.flickr.com/assets/client-code.js';
    this.myScriptElement.async = true;
    document.body.appendChild(this.myScriptElement);
  }

}
