import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CityService, TravelTip } from 'src/app/service/CityService.service';
import { OverlayTipComponent } from '../shared-components/overlay-tip/OverlayTip.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-page-component',
  templateUrl: './IndividualBlog.component.html',
  styleUrls: ['./IndividualBlog.component.css'],
})
export class IndividualBlogComponent implements OnInit {
  blog: TravelTip;
  travelTipsCache = new Map<number, TravelTip>();
  content: string;
  currentPage = 1;

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
      console.log("called");
      const blogId = Number(params.get('blogId'));
      this.travelTipsCache = travelTipsCache;
      this.blog = this.travelTipsCache.get(blogId);
      const element = document.getElementById('html-wrapper');
      this.content = this.blog.text;
      this.content = this.content.replace(/<body([^>]*)>/i, '<div class="body-wrapper"><body$1>');
      this.content = this.content.replace(/<\/body>/i, '</body></div>');
      this.content = this.content.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/g, (match, p1, p2, p3) => {
        const modifiedRules = p2.replace(/(^|\})([^{]+)(\{)/g, '$1.body-wrapper $2$3');
        return `${p1}${modifiedRules}${p3}`;
      });
      element.innerHTML = this.content;
    });
  }

  onCardClicked(blogId: number): void {
    this.currentPage = 1;
    this.router.navigate(['/blog', blogId]);
  }
}
