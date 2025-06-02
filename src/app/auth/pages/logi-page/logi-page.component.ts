
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-logi-page',
  imports: [ReactiveFormsModule],
  templateUrl: './logi-page.component.html',
})
export class LogiPageComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 3000);
      return;
    }


    const { email = '', password = '' } = this.loginForm.value;


    console.log('Formulario enviado:', { email, password });

    this.authService.login(email!, password!).subscribe(isAuthenticated => {

      console.log('Login exitoso:', isAuthenticated);
      if (isAuthenticated) {
        this.router.navigateByUrl('/home');
        return;
      }

      this.hasError.set(true);

      setTimeout(() => this.hasError.set(false), 3000);
    });


  }
}
