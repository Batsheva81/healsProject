//import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import {User} from '../model/user';
import {Global} from '../model/global'
import { UserService } from '../Service/user.service'
import {Router} from '@angular/router';
//import 'rxjs/add/operator/map';



@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})


export class StartComponent implements OnInit {

  users:any;
  module: any = {};
  message:string= ""

  constructor(private http: HttpClient, private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }
getUsers(){
  console.log("befor api");
  console.log(this.module)
  this.http.post<User[]>(' http://localhost:3000/userExist', this.module).subscribe(
      (response) => { 
        console.log(response);
        if(response.length === 0)
        {
          this.message = " שם משתמש וסיסמה לא נכונים יש רק Ruti Haim Guli "
        }
        else{
          Global.user = response[0]
          //console.log("1 - " + Global.user.id);
          this.router.navigateByUrl('/routes');
       }
        //this.users = response;
        //              console.log(this.users);
                     // console.log("id"+response.id);
                      
      
      },
      (error) => { console.log(error); });
    
   
  }

}
