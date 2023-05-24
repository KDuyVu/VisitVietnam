import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { DataService } from './service/DateService.service';
import { PhotoService } from './service/PhotoService.service';
import { InfoContainerComponent } from './map/info-container/InfoContainer.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    InfoContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DataService, PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
