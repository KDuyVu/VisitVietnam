import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CityService, TravelTip } from 'src/app/service/CityService.service';
import { OverlayTipComponent } from '../shared-components/overlay-tip/OverlayTip.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-component',
  templateUrl: './Blog.component.html',
  styleUrls: ['./Blog.component.css'],
})
export class BlogComponent implements OnInit {
  travelTips: TravelTip[] = [];
  travelTipsCache = new Map<number, TravelTip>();
  rows: Array<TravelTip[]> = [];
  MAX_ITEMS_PER_ROW: number = 3;

  constructor(
    private cityService: CityService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.cityService.travelTipsCacheDataSource$,
      this.route.paramMap,
    ]).subscribe(([travelTipsCache, params]) => {
      if (!params || !travelTipsCache) {
        return;
      }
      const blogId = params.get('blogId');
      this.travelTips = Array.from(travelTipsCache.values());
      this.constructRows();
      this.travelTipsCache = travelTipsCache;
      if (!!blogId) {
        setTimeout(() => this.displayBlogDialog(Number(blogId)), 10);
      }
    });
  }

  onCardClicked(blogId: number): void {
    this.displayBlogDialog(blogId);
  }

  private constructRows(): void {
    let row = [];
    this.travelTips.forEach((travelTip) => {
      if (row.length === this.MAX_ITEMS_PER_ROW) {
        this.rows.push(row);
        row = [];
      }
      row.push(travelTip);
    });
    if (row.length !== 0) {
      this.rows.push(row);
    }
  }

  private displayBlogDialog(blogId: number): void {
    const dialogConfig: MatDialogConfig = {
      maxHeight: '80vh',
      maxWidth: '70vw',
      data: {
        text: this.travelTipsCache.get(Number(blogId)).text,
        isOpenInNewTab: true,
        blog: this.travelTipsCache.get(Number(blogId)),
      },
    };
    const dialogRef = this.dialog.open(OverlayTipComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (value: any) => {
        if (value['openInNewTab'] === true) {
          this.router.navigate(['/blog', blogId]);
        }
      }
    )
  }
}
