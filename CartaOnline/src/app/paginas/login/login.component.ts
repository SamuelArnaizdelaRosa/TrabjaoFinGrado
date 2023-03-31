import { Component } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public loginService: LoginService) {

  }
  mostrarUsuarios() {

    this.loginService.getUsuarios().subscribe((usuarios: any) => {
      console.log(usuarios);
    })
  }
}
