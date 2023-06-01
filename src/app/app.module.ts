import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArrowLeftOutline, ArrowRightOutline } from '@ant-design/icons-angular/icons';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { HomepageComponent } from './Homepage/Homepage.component';
import { CityCardComponent } from './Homepage/city-card/CityCard.component';
import { FilterBarComponent } from './Homepage/filter-bar/FilterBar.component';
import { TagComponent } from './Homepage/filter-bar/tag/Tag.component';
import { ListCitiesComponent } from './Homepage/list-cities/ListCities.component';
import { MapComponent } from './Homepage/map/Map.component';
import { SearchBarComponent } from './Homepage/map/search-bar/SearchBar.component';
import { InfoBannerComponent } from './Homepage/share/info-banner/InfoBanner.component';
import { TravelTipsPageComponent } from './Homepage/travel-tips/TravelTipsPage.component';
import { TravelTipsCardComponent } from './Homepage/travel-tips/travel-tips-card/TravelTipsCard.component';
import { AppComponent } from './app.component';
import { PaginationComponent } from './shared-components/pagination/Pagination.component';
import { FooterComponent } from './Homepage/footer/footer.component';
import { HeaderComponent } from './Homepage/header/header.component';
import { CelebrationsComponent } from './Homepage/celebrations/celebrations.components';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SearchBarComponent,
    HomepageComponent,
    CityCardComponent,
    ListCitiesComponent,
    FilterBarComponent,
    TagComponent,
    InfoBannerComponent,
    PaginationComponent,
    TravelTipsCardComponent,
    TravelTipsPageComponent,
    SearchBarComponent,
    HeaderComponent,
    CelebrationsComponent,
    FooterComponent
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
    NzButtonModule,
    NzIconModule.forRoot([ArrowLeftOutline, ArrowRightOutline]),
    
    NzCardModule,
    NzGridModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
