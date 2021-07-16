import {
  Component,
  Input
} from '@angular/core';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-instance-displayer',
  templateUrl: './entity-displayer.component.html',
  styleUrls: ['./entity-displayer.component.scss']
})
export class EntityDisplayerComponent {
  @Input()
  character!: ICharacter;
  
  @Input()
  instanceType!: string;

  @Input()
  staticEntity!: IStaticEntity;
}