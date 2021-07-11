import {
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'garrison-in-play-resource-displayer',
  templateUrl: './resource-displayer.component.html',
  styleUrls: ['./resource-displayer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResourceDisplayer {
  @Input()
  type!: 'gold' | 'wood' | 'food' | 'plot';

  constructor() {}
}