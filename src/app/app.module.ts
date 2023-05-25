import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { InfoContainerComponent } from './map/info-container/InfoContainer.component';
import { MapComponent } from './map/map.component';
import { PhotoContainerComponent } from './map/photo-container/PhotoContainer.component';
import { SearchBarComponent } from './map/search-bar/SearchBar.component';
import { CityService } from './service/CityService.service';
import { DataService } from './service/DataService.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PhotoContainerComponent,
    InfoContainerComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    HttpClientModule,
    NzAutocompleteModule
  ],
  providers: [DataService, CityService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
