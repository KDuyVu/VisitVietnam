import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { CityService } from "src/app/service/CityService.service";

@Component({
  selector: 'app-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class SharedHeaderComponent {
  //your code goes here
}
