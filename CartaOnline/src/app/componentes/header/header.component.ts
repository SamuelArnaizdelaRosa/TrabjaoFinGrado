import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Respuesta } from 'src/app/modelos/respuesta';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public registrado: boolean;
  public nombreUsuario: string;

  constructor(public loginService: LoginService, public cookie: CookieService) {
    this.nombreUsuario ="";
    this.registrado = false;

    setInterval(() => {
      var token = this.loginService.getToken();

      if (token) {

        const authToken = this.loginService.validateToken(token).subscribe((data: Respuesta) => {
          if (data.status == "ok") {
            const authUserToken = this.loginService.validateUserToken(token).subscribe((data: any) => {
              if (data.length > 0) {
                this.registrado = true;
                this.nombreUsuario = data[0].nombreUsuario;
              } else {
                console.log(data.mensaje);
              }
            });
          } else {
            console.log(data.mensaje);
            this.registrado = false;
          }
        });

      } else {
        this.registrado = false;
      }
      if(this.registrado){
        this.cookie.set("registrado","si")
      }else{
        this.cookie.set("registrado","no")
      }
    }, 1000);
  }

  logout(){
    this.loginService.deleteToken();
  }

}

