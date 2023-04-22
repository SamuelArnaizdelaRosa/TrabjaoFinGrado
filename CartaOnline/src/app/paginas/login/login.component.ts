import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Respuesta } from 'src/app/modelos/respuesta';
import { Usuario } from 'src/app/modelos/usuario';
import { LoginService } from 'src/app/servicios/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  pass: string;
  constructor(public loginService: LoginService, private router: Router) {
    this.email = "";
    this.pass = "";
  }
  /*
  mostrarUsuarios() {

    this.loginService.getUsuarios().subscribe((usuarios: any) => {
      console.log(usuarios);
    })
  }*/

  async login() {
    if (this.email == "" || this.pass == "") {
      alert("Ingrese todos los campos");
    } else {
      this.loginService.login(this.email, this.pass).subscribe((data: Respuesta) => {
        if (data.status == 'ok') {
          console.log("Iniciado sesión");
          this.loginService.setToken(data.token);
          var token = this.loginService.getToken();
          this.router.navigate(['/']);
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      });
    }
  }
}
