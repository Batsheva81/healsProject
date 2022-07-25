import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../model/global';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(Global.user.id);
    
  }

  newReport(){
    this.router.navigateByUrl('/newreports');
  }
  searchReports(){
    this.router.navigateByUrl('/searchReports');
  }

}
