import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SignInComponent implements OnInit {
  // button for a password field hide/show
  hidePasswordButton = true;
  form: FormGroup;
  // form validation error
  error$ = this._authService.getError();

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: '',
      password: '',
    });
  }

  submit(): void {
    // get a value from form
    const formValue = this.form.getRawValue();
    // submit form
    this._authService.submitLogin(formValue);
  }
}
