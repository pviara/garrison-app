import {
  Component,
  Input
} from '@angular/core';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { ImageType } from 'src/models/static/ImageType';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-entity-navigator',
  templateUrl: './entity-navigator.component.html',
  styleUrls: ['./entity-navigator.component.scss']
})
export class EntityNavigatorComponent {
  @Input()
  staticEntities!: IStaticEntity[];
  
  @Input()
  character!: ICharacter;

  @Input()
  imageType!: ImageType;
  
  @Input()
  instanceType!: string;
}