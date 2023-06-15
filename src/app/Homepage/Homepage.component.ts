import { Component } from '@angular/core';
import { ListCitiesComponent } from './list-cities/ListCities.component';
import { CityService, Tag, TravelTip } from 'src/app/service/CityService.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OverlayTipComponent } from '../shared-components/overlay-tip/OverlayTip.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './Homepage.component.html',
  styleUrls: ['./Homepage.component.css'],
})
export class HomepageComponent {
  travelTipsCache = new Map<number, TravelTip>();
  itemsPerPage: number = 3;
  currentPage: number = 1;
  rectColors: string[] = [
    '#D8F7E6',
    '#FFEFE4',
    '#F7E8FF',
    '#E8F1FF',
    '#FBF1D9',
  ];
  maxHeightInt: number = 0;
  maxHeightStr: string = null;

  constructor(
    public dialog: MatDialog,
    private cityService: CityService,
    private router: Router
  ) {
    this.cityService.travelTipsCacheDataSource$.subscribe((result) => {
      if (!result) {
        return;
      }
      this.travelTipsCache = result;
    });
  }

  onCardClicked(blogId: number): void {
    const blog: TravelTip = this.travelTipsCache.get(blogId);
    const dialogConfig: MatDialogConfig = {
      maxHeight: '80vh',
      maxWidth: '70vw',
      data: { text: blog.text, isOpenInNewTab: true, blog: blog },
    };
    const dialogRef = this.dialog.open(OverlayTipComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!!result && result['openInNewTab'] === true) {
        this.router.navigate(['blog', blog.tipId]);
      }
    });
  }
}
