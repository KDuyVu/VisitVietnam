import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './BlogPage/Blog.component';
import { CityPageComponent } from './CityPage/CityPage.component';
import { HomepageComponent } from './Homepage/Homepage.component';
import { IndividualBlogComponent } from './IndividualBlog/IndividualBlog.component';

const appRoutes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'city/:id', component: CityPageComponent },
  { path: 'blogs', component: BlogComponent},
  { path: 'blog/:blogId', component: IndividualBlogComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: '**', redirectTo: '/homepage'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {scrollPositionRestoration: 'enabled'}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
