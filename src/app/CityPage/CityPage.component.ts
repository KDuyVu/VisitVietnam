import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, of, switchMap } from 'rxjs';
import {
  City,
  CityExperience,
  CityService,
  SampleItinerary,
} from '../service/CityService.service';

@Component({
  selector: 'app-city-page',
  templateUrl: 'CityPage.component.html',
  styleUrls: ['CityPage.component.css'],
})
export class CityPageComponent implements OnInit {
  myScriptElement: HTMLScriptElement;
  cityId: number = null;
  city: City = null;
  cityExperiences: CityExperience[] = null;
  itineraries: SampleItinerary[] = [];

  constructor(private route: ActivatedRoute, private cityService: CityService) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = '//embedr.flickr.com/assets/client-code.js';
    this.myScriptElement.async = true;
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit() {
    // this.cityId = Number(this.route.snapshot.paramMap.get('id'));
    // this.route.paramMap.pipe(
    //   switchMap(params => {
    //     console.log("cahnged : ");
    //     this.cityId = Number(params.get('id'));
    //     return of(this.cityId);
    //   })
    // )

    combineLatest([
      this.route.paramMap,
      this.cityService.cityCacheDataSource$,
      this.cityService.cityExperienceCacheSource$,
      this.cityService.itinerariesByCityId$,
    ]).subscribe(([params, cityCache, cityExperienceCache, itinerariesByCityIdCache]) => {
      if (!params || !cityCache || !cityExperienceCache || !itinerariesByCityIdCache) {
        return;
      }
      this.cityId = Number(params.get('id'));
      this.city = cityCache.get(this.cityId);
      this.cityExperiences = Array.from(cityExperienceCache.values()).filter(
        (experience) => experience[0].cityId === this.cityId
      )[0];
      this.itineraries = itinerariesByCityIdCache.get(this.cityId);
    });
  }
}
