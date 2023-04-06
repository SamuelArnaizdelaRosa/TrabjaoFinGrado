import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Respuesta } from 'src/app/modelos/respuesta';
import { LoginService } from 'src/app/servicios/login.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  emailPattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  createFormGroup() {
    return new FormGroup({
      nombreUsuario: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      confEmail: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      pass: new FormControl('', [Validators.required]),
      confPass: new FormControl('', [Validators.required])
    });
  }

  registerForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, public loginService: LoginService) {
    this.registerForm = this.createFormGroup();
  }

  ngOnInit() {

  }

  registrar(nombreUsuario: string, nombre: string, apellidos: string, email: string, confEmail: string, pass: string, confPass: string) {
    if (!nombreUsuario || !nombre || !apellidos || !email || !confEmail || !pass || !confPass) {
      alert("Ingrese todos los datos")
    } else {
      if (confEmail != email) {
        alert("Los Email no coinciden");
      } else {
        if (confPass != pass) {
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
  }

  onResetForm() {
    this.registerForm.reset();
  }

  submit() {
    if (this.registerForm.valid) {
      this.registrar(this.registerForm.value.nombreUsuario, this.registerForm.value.nombre, this.registerForm.value.apellidos, this.registerForm.value.email, this.registerForm.value.confEmail, this.registerForm.value.pass, this.registerForm.value.confPass);
    } else {
      if (this.registerForm.get('email')?.errors || this.registerForm.get('confEmail')?.errors) {
        alert("Email no válido");
      }
    }
  }

  get email(){return this.registerForm.get('email')?.errors}
}
