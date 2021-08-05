import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { IBuilding } from 'src/models/static/IBuilding';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import {
  IGarrison,
  InstanceType
} from 'src/models/dynamic/IGarrison';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-entity-requirements',
  templateUrl: './entity-requirements.component.html',
  styleUrls: ['./entity-requirements.component.scss']
})
export class EntityRequirementsComponent implements OnDestroy, OnInit {
  @Input()
  staticBuildings!: IBuilding[];
  
  @Input()
  character!: ICharacter;
  
  @Input()
  garrison!: IGarrison;

  @Input()
  instanceType!: InstanceType;

  @Input()
  staticEntities!: IStaticEntity[];

  @Input()
  staticEntity!: IStaticEntity;

  now = new Date();
  
  private _timer: any;

  ngOnDestroy() {
    clearInterval(this._timer);
  }
  
  ngOnInit() {
    this._timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }
}