import {
  Component,
  Input
} from '@angular/core';
import { GarrisonBuilding } from 'src/models/dynamic/IGarrison';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-building-displayer',
  templateUrl: './building-displayer.component.html',
  styleUrls: ['./building-displayer.component.scss']
})
export class BuildingDisplayerComponent {
  @Input()
  character!: ICharacter;

  @Input()
  dynamicBuildings!: GarrisonBuilding[];
  
  @Input()
  staticEntity!: IStaticEntity;
}