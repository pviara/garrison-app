import { Component } from '@angular/core';

@Component({
  selector: 'garrison-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  constructor() {
    console.log('entered index component default class');
  }
}
