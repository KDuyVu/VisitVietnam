import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private data: string[] = [];
  photoUrls: string[];

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
  }

  getPhotoUrlsOfCity(city: string): Observable<string[]> {
    return of(this.photoUrls);
  }
}