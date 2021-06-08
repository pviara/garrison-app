import { Component } from '@angular/core';

@Component({
  selector: 'garrison-public-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor() {
    console.log('entered auth component class');
  }
}
