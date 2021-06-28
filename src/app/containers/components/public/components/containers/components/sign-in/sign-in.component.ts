import { AuthService } from 'src/app/shared/services/auth.service';
import { catchError } from 'rxjs/operators';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { SoundService } from 'src/app/shared/services/sound.service';

@Component({
  selector: 'garrison-public-auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [
    AuthService,
    SoundService
  ]
})
export class SignInComponent implements OnInit {
  apiError!: string;
  signIn!: FormGroup;
  
  @ViewChild('submitButton')
  submitButton!: ElementRef;
  
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _renderer: Renderer2,
    private _router: Router,
    private _soundService: SoundService
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
    this._soundService.play('click');
    if (signIn.invalid) return;

    this._renderer.setAttribute(
      this.submitButton.nativeElement,
      'disabled',
      'true'
    );

    this._authService
      .authenticate(signIn.value)
      .pipe(
        catchError((err) => {
          this.apiError = err;
          this._soundService.play('error');

          this._renderer.removeAttribute(
            this.submitButton.nativeElement,
            'disabled'
          );
          
          return of(this.apiError);
        })
      )
      .subscribe((result: any) => {
        if (result.error) return;

        this._authService.addUserToLocalStorage(result);
        this._router.navigate(['/in']);
        
        this._soundService.play('greetings');
      });
  }

  private _isInvalidFormControl(key: string) {
    const formControl = this.signIn.get(key);
    return formControl?.touched
      && formControl?.dirty
      && formControl?.invalid;
  }
}
