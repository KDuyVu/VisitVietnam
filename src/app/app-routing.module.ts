import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './Homepage/Homepage.component';
import { CityPageComponent } from './CityPage/CityPage.component';

const appRoutes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'city/:id', component: CityPageComponent },
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
