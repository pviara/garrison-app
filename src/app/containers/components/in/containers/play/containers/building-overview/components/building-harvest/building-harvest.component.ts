import {
  Component,
  Input,
  OnInit
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  GarrisonBuilding,
  GarrisonUnit
} from "src/models/dynamic/IGarrison";
import { IBuilding } from "src/models/static/IBuilding";
import { IStaticEntity } from "src/models/static/IStaticEntity";

@Component({
  selector: 'garrison-in-play-building-harvest',
  templateUrl: './building-harvest.component.html',
  styleUrls: ['./building-harvest.component.scss']
})
export class BuildingHarvestComponent implements OnInit {
  @Input()
  dynamicBuildings!: GarrisonBuilding[];

  @Input()
  dynamicUnits!: GarrisonUnit[];

  @Input()
  now!: Date;
  
  @Input()
  staticEntity!: IStaticEntity;

  unitAssignment!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.unitAssignment = this
      ._formBuilder
      .group({
        entityCode: this
          ._formBuilder
          .control(this.staticEntity.code, Validators.required),
        quantity: this
          ._formBuilder
          .control(
            1,
            [
              Validators.required,
              Validators.min(1)
            ]
          )
      });
  }

  onUnitAssignment(unitAssignment: FormGroup) {
    console.log('assignment', unitAssignment.value);
  }

  onUnitUnassignment(unitAssignment: FormGroup) {
    console.log('unassignement', unitAssignment.value);
  }
}