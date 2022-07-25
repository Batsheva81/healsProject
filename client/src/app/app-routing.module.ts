import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewreportsComponent } from './newreports/newreports.component';
import { ReportsComponent } from './reports/reports.component';
import { SearchReportsComponent } from './search-reports/search-reports.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {path: '' , component:StartComponent },
  {path: 'routes' , component:ReportsComponent },
  {path: 'newreports' , component:NewreportsComponent },
  {path: 'searchReports' , component:SearchReportsComponent },
  {path: '**', component: StartComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
