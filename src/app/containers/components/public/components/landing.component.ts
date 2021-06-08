import { Component } from '@angular/core';

@Component({
  selector: 'garrison-public-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor() {
    console.log('entered landing component class');
  }
}
