import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private data: string[] = [];
  private photoUrls: string[];
  private cityInfo: string;

  constructor() {
    this.photoUrls = [
        'assets/DN/DN10.jpg',
        'assets/DN/DN11.jpg',
        'assets/DN/DN12.jpg',
        'assets/DN/DN4.jpg',
        'assets/DN/DN5.jpg',
        'assets/DN/DN6.jpg',
        'assets/DN/DN7.jpg',
        'assets/DN/DN8.jpg',
    ]

    this.cityInfo = "Da Nang is the hometown of Sinh and Duy"
  }

  getPhotoUrlsOfCity(city: string): Observable<string[]> {
    return of(this.photoUrls);
  }

  getCityInfoByName(city: string): Observable<string> {
    return of(this.cityInfo);
  }

  getCityInfoById(city: string): Observable<string> {
    return of(this.cityInfo);
  }
}