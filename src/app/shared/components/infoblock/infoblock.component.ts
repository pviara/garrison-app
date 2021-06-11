import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'garrison-shared-infoblock',
  templateUrl: './infoblock.component.html',
  styleUrls: ['./infoblock.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class InfoblockComponent {
  constructor() {}
}
