import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Respuesta } from 'src/app/modelos/respuesta';
import { LoginService } from 'src/app/servicios/login.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailPattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /*createFormGroup() {
    return new FormGroup({
      nombreUsuario: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      confEmail: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      pass: new FormControl('', [Validators.required]),
      confPass: new FormControl('', [Validators.required])
    });
  }*/

  registerForm: FormGroup = new FormGroup({
    nombreUsuario: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    confEmail: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    pass: new FormControl('', [Validators.required]),
    confPass: new FormControl('', [Validators.required])
  });
  submitted = false;

  constructor(private router: Router, public loginService: LoginService) {
    //this.registerForm = this.createFormGroup();

  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nombreUsuario: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      confEmail: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      pass: new FormControl('', [Validators.required]),
      confPass: new FormControl('', [Validators.required])
    });
  }

  onResetForm() {
    this.registerForm.reset();
  }

  submit() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    var nombreUsuario:string= this.getnombreUsuario()?.value;
    var nombre: string = this.getnombre()?.value;
    var apellidos: string = this.getapellidos()?.value;
    var confEmail: string = this.getconfEmail()?.value;
    var email: string = this.getemail()?.value;
    var pass: string = this.getpass()?.value;
    var confPass: string = this.getconfPass()?.value;


    console.log(JSON.stringify(this.registerForm.value, null, 2));

    console.log(nombreUsuario);
    
    if (confEmail !== email) {
      alert("Los Email no coinciden");
    } else {
      if (confPass !== pass) {
        alert("Las contraseñas no coinciden");
      } else {

        this.loginService.registrar(nombreUsuario, nombre, apellidos, email, pass).subscribe((data: Respuesta) => {
          if (data.status == "fail") {
            alert(data.mensaje);
          } else {
            alert(data.mensaje);
            this.router.navigate(['/']);
          }
        });
      }
    }
  }

  getnombreUsuario() {
    return this.registerForm.get('nombreUsuario');
  }

  getnombre() {
    return this.registerForm.get('nombre');
  }

  getapellidos() {
    return this.registerForm.get('apellidos');
  }

  getemail() {
    return this.registerForm.get('email');
  }

  getconfEmail() {
    return this.registerForm.get('confEmail');
  }

  getpass() {
    return this.registerForm.get('pass');
  }

  getconfPass() {
    return this.registerForm.get('confpass');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
}
