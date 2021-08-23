import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  GarrisonBuilding,
  GarrisonResearch,
  GarrisonResources,
  GarrisonUnit
} from 'src/models/dynamic/IGarrison';
import { IBuildingCreate } from 'src/models/dynamic/payloads/IBuildingCreate';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-building-displayer',
  templateUrl: './building-displayer.component.html',
  styleUrls: ['./building-displayer.component.scss']
})
export class BuildingDisplayerComponent implements OnInit {
  buildingCreation!: FormGroup;
  
  @Input()
  character!: ICharacter;

  @Output()
  createBuilding = new EventEmitter<IBuildingCreate>();

  @Input()
  dynamicBuildings!: GarrisonBuilding[];

  @Input()
  dynamicResearches!: GarrisonResearch[];
  
  @Input()
  dynamicUnits!: GarrisonUnit[];
  
  @Input()
  resources!: GarrisonResources;
  
  @Input()
  staticEntity!: IStaticEntity;

  constructor(private _formBuilder: FormBuilder) {}
  
  ngOnInit() {
    this.buildingCreation = this
      ._formBuilder
      .group({
        code: this
          ._formBuilder
          .control(this.staticEntity.code, Validators.required),
        workforce: this
          ._formBuilder
          .control(
            0,
            [
              Validators.required,
              Validators.min(1)
            ]
          )
      });
  }

  onBuildingCreation(buildingCreation: IBuildingCreate) {
    this.createBuilding.emit(buildingCreation);
  }
}