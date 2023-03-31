import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:3000/";
  constructor(private router: Router, private http: HttpClient) {

  }

  getUsuarios(){
    return this.http.get(this.url);
  }
}
