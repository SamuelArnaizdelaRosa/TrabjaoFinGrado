import { Component } from '@angular/core';
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
  constructor(public loginService: LoginService) {
    this.email = "";
    this.pass = "";
  }
  mostrarUsuarios() {

    this.loginService.getUsuarios().subscribe((usuarios: any) => {
      console.log(usuarios);
    })
  }

  async login() {
    if (this.email == "" || this.pass == "") {
      alert("Ingrese todos los campos");
    } else {
      this.loginService.login(this.email, this.pass).subscribe((data: Respuesta) => {
        if(data.status=='ok'){
          console.log("Iniciada sesión");
          this.loginService.setToken(data.token);
          var token = 
          console.log(this.loginService.getToken());
        }else{
          alert("Usuario o contraseña incorrectos");
        }
      });
    }
  }
}
