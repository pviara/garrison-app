import { Component } from '@angular/core';

@Component({
  selector: 'garrison-public-auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor() {
    console.log('entered sign-up component class');
  }
}
