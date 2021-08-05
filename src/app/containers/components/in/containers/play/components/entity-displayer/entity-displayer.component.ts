import { BuildingService } from '../../../../services/static/building.service';
import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import {
  IGarrison,
  InstanceType
} from 'src/models/dynamic/IGarrison';
import { IBuilding } from 'src/models/static/IBuilding';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-entity-displayer',
  templateUrl: './entity-displayer.component.html',
  styleUrls: ['./entity-displayer.component.scss']
})
export class EntityDisplayerComponent implements OnInit {
  @Input()
  character!: ICharacter;
  
  @Input()
  garrison!: IGarrison;
  
  @Input()
  instanceType!: InstanceType;
  
  staticBuildings!: IBuilding[];

  @Input()
  staticEntities!: IStaticEntity[];
  
  @Input()
  staticEntity!: IStaticEntity;

  constructor(private _buildingService: BuildingService) {}
  
  ngOnInit() {
    const staticBuildings = this._buildingService.getBuildingsFromStorage();
    if (!staticBuildings) {
      throw new Error('Static buildings should be existing in storage.');
    }

    this.staticBuildings = staticBuildings;
  }
}