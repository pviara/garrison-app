import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { catchError } from 'rxjs/operators';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { SoundService } from 'src/app/shared/services/sound.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'garrison-public-auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [
    AuthService,
    SoundService,
    UserService
  ]
})
export class SignUpComponent implements OnInit {
  apiError!: string;
  signUp!: FormGroup;
  
  @ViewChild('submitButton')
  submitButton!: ElementRef;
  
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _renderer: Renderer2,
    private _router: Router,
    private _soundService: SoundService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.signUp = this
      ._formBuilder
      .group({
        password: this
          ._formBuilder
          .control('', [
            Validators.required
          ]),
        username: this
          ._formBuilder
          .control('', Validators.required)
      });

    this.signUp.addControl(
      'passwordConfirmation',
      this
      ._formBuilder
      .control('', [
        Validators.required,
        this._confirmationValidator('password')
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
    this._soundService.play('click');
    if (signUp.invalid) return;

    this._renderer.setAttribute(
      this.submitButton.nativeElement,
      'disabled',
      'true'
    );

    this._userService
      .create(signUp.value)
      .pipe(
        catchError((err) => {
          this.apiError = err.error.message;
          this._soundService.play('error');

          this._renderer.removeAttribute(
            this.submitButton.nativeElement,
            'disabled'
          );

          return of(err);
        })
      )
      .subscribe((result: any) => {
        if (result.error) return;

        this._authService.addUserToLocalStorage(result);
        this._router.navigate(['/in']);
        
        this._soundService.play('greetings');
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
