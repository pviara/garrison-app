import {
  Component,
  Input
} from '@angular/core';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-entity-displayer',
  templateUrl: './entity-displayer.component.html',
  styleUrls: ['./entity-displayer.component.scss']
})
export class EntityDisplayerComponent {
  @Input()
  character!: ICharacter;
  
  @Input()
  garrison!: IGarrison;
  
  @Input()
  instanceType!: string;

  @Input()
  staticEntities!: IStaticEntity[];
  
  @Input()
  staticEntity!: IStaticEntity;

  ngOnInit(){
    console.log(`garrison in ${this.constructor.name}`, this.garrison);
  }
}