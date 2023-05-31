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
import { MapComponent } from './map/Map.component';
import { PhotoContainerComponent } from './map/photo-container/PhotoContainer.component';
import { SearchBarComponent } from './map/search-bar/SearchBar.component';
import { CityService } from './service/CityService.service';
import { DataService } from './service/DataService.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { ListCitiesComponent } from './Homepage/list-cities/list-cities/ListCities.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CityCardComponent } from './Homepage/list-cities/city-card/CityCard.component';
import { HomepageComponent } from './Homepage/list-cities/Homepage.component';
import { FilterBarComponent } from './Homepage/list-cities/filter-bar/FilterBar.component';
import { TagComponent } from './Homepage/list-cities/filter-bar/tag/Tag.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { InfoBannerComponent } from './Homepage/list-cities/share/info-banner/InfoBanner.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PhotoContainerComponent,
    InfoContainerComponent,
    SearchBarComponent,
    HomepageComponent,
    CityCardComponent,
    ListCitiesComponent,
    FilterBarComponent,
    TagComponent,
    InfoBannerComponent,
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
    NzAutocompleteModule,
    NzPaginationModule,
    NzButtonModule,
    NzSpinModule,
    NzSelectModule,
  ],
  providers: [DataService, CityService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
