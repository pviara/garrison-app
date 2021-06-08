import { Component } from '@angular/core';

@Component({
  selector: 'garrison-public-auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor() {
    console.log('entered sign-in component class');
  }
}
