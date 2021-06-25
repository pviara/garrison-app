import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { AuthService } from 'src/app/containers/services/auth.service';
import { catchError } from 'rxjs/operators';
import {
  Component,
  OnInit
} from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'garrison-public-auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [
    AuthService,
    UserService
  ]
})
export class SignUpComponent implements OnInit {
  apiError!: string;
  signUp!: FormGroup
  
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.signUp = this
      ._formBuilder
      .group({
        email: this
          ._formBuilder
          .control('', [
            Validators.required,
            Validators.email
          ]),
        username: this
          ._formBuilder
          .control('', Validators.required)
      });

    this.signUp.addControl(
      'emailConfirmation',
      this
      ._formBuilder
      .control('', [
        Validators.required,
        this._confirmationValidator('email')
      ])
    );
  }

  getFormErrors(signUp: FormGroup) {
    const controls = Object.keys(signUp.controls);

    let formErrors: ValidationErrors[] = [];
    for (const control of controls) {
      const errors = this.hasFormControlGotErrors(control);
      if (!errors) continue;

      formErrors = formErrors.concat(errors);
    }

    return formErrors;
  }

  hasFormControlGotErrors(key: string) {
    const formControl = this.signUp.get(key);
    return this._isInvalidFormControl(key)
      ? formControl?.errors
      : null;
  }

  onSignUp(signUp: FormGroup) {
    if (signUp.invalid) return;

    this._userService
      .create(signUp.value)
      .pipe(
        catchError((err) => {
          this.apiError = err.error.message;
          return of(err);
        })
      )
      .subscribe((result: any) => {
        if (result.error) return;

        this._authService.addUserToLocalStorage(result);
        this._router.navigate(['/in']);
      });
  }

  private _confirmationValidator(formControlName: string) {
    return (control: AbstractControl) => {
      const areEqual = this
        .signUp
        .get(formControlName)
        ?.value === control.value;

      return areEqual ? null : {
        invalid: { value: control.value }
      }
    }
  }

  private _isInvalidFormControl(key: string) {
    const formControl = this.signUp.get(key);
    return formControl?.touched
      && formControl?.dirty
      && formControl?.invalid;
  }
}
