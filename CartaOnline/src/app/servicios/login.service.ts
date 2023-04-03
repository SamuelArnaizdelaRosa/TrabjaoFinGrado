import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Respuesta } from '../modelos/respuesta';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:3000/";
  constructor(private router: Router, private http: HttpClient, private cookies: CookieService) {

  }

  getUsuarios() {
    return this.http.get(this.url);
  }

  login(email: string, pass: string): Observable<any> {
    return this.http.post(this.url + "login", { email: email, pass: pass });
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }

  getToken() {
    return this.cookies.get("token");
  }
}
