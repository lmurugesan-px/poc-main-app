import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  login: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    localStorage.removeItem('token')
    this.login = this.fb.group({
      uname: this.fb.control('admin', [Validators.required]),
      password: this.fb.control('password', [Validators.required]),
    });
  }

  onSubmit() {
    this.http.post('http://localhost:3000/login',this.login.value).subscribe((res: any)=>{
      localStorage.setItem('token', res.token);
      this.router.navigate(['dashboard']);
    },err=>{
      console.log(err);
    })
  }
}
