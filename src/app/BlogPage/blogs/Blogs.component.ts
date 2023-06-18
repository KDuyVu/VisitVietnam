import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CityService, TravelTip } from 'src/app/service/CityService.service';

@Component({
  selector: 'app-blog-posts-component',
  templateUrl: './Blogs.component.html',
  styleUrls: ['./Blogs.component.css'],
})
export class BlogPostsComponent implements OnChanges {
  @Input() rows: Array<TravelTip[]> = [];
  @Output() cardClicked = new EventEmitter<number>();
  rectColors: string[] = [
    '#D8F7E6',
    '#FFEFE4',
    '#F7E8FF',
  ];

  onCardClicked(blogId: number): void {
    this.cardClicked.emit(blogId);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
