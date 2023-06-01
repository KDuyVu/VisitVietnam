import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { CityService } from "src/app/service/CityService.service";
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-celebrations',
  templateUrl: './celebrations.component.html',
  styleUrls: ['./celebrations.component.css']
})
export class CelebrationsComponent {
  pictures = [
    {
      link: 'https://lp-cms-production.imgix.net/2023-01/Hanoi-Vietnam-Nicolas%20McComber-GettyImages-520741570-rfc.jpg?auto=format&w=1440&h=810&fit=crop&q=75',
      name: 'Tet (Luna New Year)',
      scale: 'NATIONWIDE',
      date: 'January 1'
    },
    {
      link: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2020/06/Feature-image-Phu-Quoc.jpg?tr=w-1920',
      name: 'Tet (Luna New Year)',
      scale: 'NATIONWIDE',
      date: 'January 1'
    },
    {
      link: 'https://lp-cms-production.imgix.net/2023-01/Hanoi-Vietnam-Nicolas%20McComber-GettyImages-520741570-rfc.jpg?auto=format&w=1440&h=810&fit=crop&q=75',
      name: 'Tet (Luna New Year)',
      scale: 'NATIONWIDE',
      date: 'January 1'
    },
    {
      link: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2020/06/Feature-image-Phu-Quoc.jpg?tr=w-1920',
      name: 'Tet (Luna New Year)',
      scale: 'NATIONWIDE',
      date: 'January 1'
    },
    {
      link: 'https://lp-cms-production.imgix.net/2023-01/Hanoi-Vietnam-Nicolas%20McComber-GettyImages-520741570-rfc.jpg?auto=format&w=1440&h=810&fit=crop&q=75',
      name: 'Tet (Luna New Year)',
      scale: 'NATIONWIDE',
      date: 'January 1'
    },
    {
      link: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2020/06/Feature-image-Phu-Quoc.jpg?tr=w-1920',
      name: 'Tet (Luna New Year)',
      scale: 'NATIONWIDE',
      date: 'January 1'
    },
    {
      link: 'https://lp-cms-production.imgix.net/2023-01/Hanoi-Vietnam-Nicolas%20McComber-GettyImages-520741570-rfc.jpg?auto=format&w=1440&h=810&fit=crop&q=75',
      name: 'Tet (Luna New Year)',
      scale: 'NATIONWIDE',
      date: 'January 1'
    },
    {
      link: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2020/06/Feature-image-Phu-Quoc.jpg?tr=w-1920',
      name: 'Tet (Luna New Year)',
      scale: 'NATIONWIDE',
      date: 'January 1'
    },
    {
      link: 'https://lp-cms-production.imgix.net/2023-01/Hanoi-Vietnam-Nicolas%20McComber-GettyImages-520741570-rfc.jpg?auto=format&w=1440&h=810&fit=crop&q=75',
      name: 'Tet (Luna New Year)',
      scale: 'NATIONWIDE',
      date: 'January 1'
    },
  ];
} 