import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ReportsComponent } from './reports/reports.component';
import { NewreportsComponent } from './newreports/newreports.component';
import { SearchReportsComponent } from './search-reports/search-reports.component';

//import { Observable } from 'rxjs/Observable';
@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ReportsComponent,
    NewreportsComponent,
    SearchReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
