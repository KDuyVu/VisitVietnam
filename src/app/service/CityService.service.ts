import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private data: string[] = [];
  private photoUrls: string[];
  private cityInfo: string;
  private allCities: string[] = ['Lai Châu', 'Lào Cai', 'Hà Giang', 'Cao Bằng', 'Sơn La', 'Yên Bái', 'Tuyên Quang', 'Lạng Sơn', 'Quảng Ninh', 'Hòa Bình', 'Hà Tây', 'Ninh Bình', 'Thái Bình', 'Thanh Hóa', 'Nghệ An', 'Hà Tĩnh', 'Quảng Bình', 'Quảng Trị', 'Thừa Thiên–Huế', 'Quảng Nam', 'Kon Tum', 'Quảng Ngãi', 'Gia Lai', 'Bình Định', 'Phú Yên', 'Đắk Lắk', 'Khánh Hòa', 'Lâm Đồng', 'Ninh Thuận', 'Tây Ninh', 'Đồng Nai', 'Bình Thuận', 'Long An', 'Bà Rịa–Vũng Tàu', 'An Giang', 'Đồng Tháp', 'Tiền Giang', 'Kiên Giang', 'Vĩnh Long', 'Bến Tre', 'Trà Vinh', 'Sóc Trăng', 'Bắc Kạn', 'Bắc Giang', 'Bạc Liêu', 'Bắc Ninh', 'Bình Dương', 'Bình Phước', 'Cà Mau', 'Hải Dương', 'Hà Nam', 'Hưng Yên', 'Nam Định', 'Phú Thọ', 'Thái Nguyên', 'Vĩnh Phúc', 'Điện Biên', 'Đắk Nông', 'Hậu Giang', 'Cần Thơ', 'Đà Nẵng', 'Hà Nội', 'Hải Phòng', 'Hồ Chí Minh'];

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

  getAllCities(): Observable<string[]> {
    return of(this.allCities);
  }
}