import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  // button for a password field hide/show
  hidePasswordButton = true;
  // api url
  url = environment.apiUrl;
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: '',
      email: '',
      password: '',
    });
  }

  submit(): void {
    // get a value from form
    const formValue = this.form.getRawValue();
    // submit form
    this._authService.submitRegister(formValue);
  }
}
