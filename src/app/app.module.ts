import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { DataService } from './service/DateService.service';
import { CityService } from './service/CityService.service';
import { PhotoContainerComponent } from './map/photo-container/PhotoContainer.component';
import { InfoContainer } from './map/info-container/InfoContainer.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PhotoContainerComponent,
    InfoContainer
  ],
  imports: [
    BrowserModule,
    MatIconModule
  ],
  providers: [DataService, CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
