import { AuthService } from 'src/app/containers/services/auth.service';
import { catchError } from 'rxjs/operators';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'garrison-public-auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [
    AuthService
  ]
})
export class SignInComponent implements OnInit {
  apiError!: string;
  signIn!: FormGroup
  
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit() {
    this.signIn = this
      ._formBuilder
      .group({
        email: this
          ._formBuilder
          .control('', [
            Validators.required,
            Validators.email
          ]),
        password: this
          ._formBuilder
          .control('', Validators.required)
      });
  }

  hasFormControlGotErrors(key: string) {
    const formControl = this.signIn.get(key);
    return this._isInvalidFormControl(key)
      ? formControl?.errors
      : null;
  }

  onSignIn(signIn: FormGroup) {
    if (signIn.invalid) return;

    console.log(signIn.value);

    this._authService
      .authenticate(signIn.value)
      .pipe(
        catchError((err) => {
          this.apiError = err;
          return of(this.apiError);
        })
      )
      .subscribe((result: any) => {
        if (result.error) return;

        this._authService.addUserToLocalStorage(result);
        this._router.navigate(['/in']);
      });
  }

  private _isInvalidFormControl(key: string) {
    const formControl = this.signIn.get(key);
    return formControl?.touched
      && formControl?.dirty
      && formControl?.invalid;
  }
}
