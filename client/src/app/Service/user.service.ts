import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({providedIn:"root"})
export class UserService{

    constructor(private http: HttpClient) { }
    userExist(module: any){
        return this.http.post(' http://localhost:3000/userExist', module)
    }

    
}