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
import {
  Observable,
  of
} from 'rxjs';

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
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.signIn = this
      ._formBuilder
      .group({
        email: this
          ._formBuilder
          .control('', [Validators.required, Validators.email]),
        password: this
          ._formBuilder
          .control('', Validators.required)
      });
  }

  onSignIn(signIn: FormGroup) {
    if (signIn.invalid) return;

    // TODO 🛠 fire service call
    this._authService
      .authenticate(signIn.value)
      .pipe(
        catchError((err: any, caught: Observable<unknown>) => {
          this.apiError = err;
          return of(this.apiError);
        })
      ).subscribe((result: any) => {
        if (result.error) return;

        
      });
  }

  isInvalidFormControl(key: string) {
    const formControl = this.signIn.get(key);
    return formControl?.touched
      && formControl?.dirty
      && formControl?.invalid;
  }

  hasFormControlGotErrors(key: string) {
    const formControl = this.signIn.get(key);
    return this.isInvalidFormControl(key)
      ? formControl?.errors
      : null;
  }
}
