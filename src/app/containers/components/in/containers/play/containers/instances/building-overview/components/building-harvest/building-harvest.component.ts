import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from "@angular/core";
import { ComputeAvailableBuildingWorkforcePipe } from '../../../../../pipes/dynamic/compute-available-building-workforce.pipe';
import { ComputeHarvestingPeasantsPipe } from '../../../../../pipes/dynamic/compute-harvesting-peasants.pipe';
import { ComputeHarvestWorkforceLimitPipe } from '../../../../../pipes/dynamic/compute-harvest-workforce-limit.pipe';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  GarrisonBuilding,
  GarrisonUnit
} from "src/models/dynamic/IGarrison";
import { IHarvestBuilding } from 'src/models/static/IBuilding';
import { IStaticEntity } from "src/models/static/IStaticEntity";
import { IUnitAssign } from 'src/models/dynamic/payloads/IUnitAssign';
import { SoundService } from 'src/app/shared/services/sound.service';

@Component({
  selector: 'garrison-in-play-building-harvest',
  templateUrl: './building-harvest.component.html',
  styleUrls: ['./building-harvest.component.scss'],
  providers: [
    ComputeAvailableBuildingWorkforcePipe,
    ComputeHarvestingPeasantsPipe,
    ComputeHarvestWorkforceLimitPipe
  ]
})
export class BuildingHarvestComponent implements OnChanges {
  @Output()
  assignUnit = new EventEmitter<IUnitAssign>();
  
  @Input()
  dynamicBuildings!: GarrisonBuilding[];

  @Input()
  dynamicUnits!: GarrisonUnit[];
  
  @Input()
  staticEntity!: IStaticEntity;

  harvestWorkforceLimit!: number;

  now = new Date();

  @Output()
  unassignUnit = new EventEmitter<IUnitAssign>();
  
  unitAssignment!: FormGroup;
  
  private _availableWorkforce!: number;

  private _harvestingPeasants!: number;
  
  private _timer: any;

  constructor(
    private _computeAvailableBuildingWorkforcePipe: ComputeAvailableBuildingWorkforcePipe,
    private _computeHarvestingPeasantsPipe: ComputeHarvestingPeasantsPipe,
    private _computeHarvestWorkforceLimitPipe: ComputeHarvestWorkforceLimitPipe,
    private _formBuilder: FormBuilder,
    private _soundService: SoundService
  ) {}

  ngOnChanges() {
    this._availableWorkforce = this
      ._computeAvailableBuildingWorkforcePipe
      .transform(this.dynamicUnits, this.now);

    this._harvestingPeasants = this
      ._computeHarvestingPeasantsPipe
      .transform(
        this.dynamicBuildings,
        this.dynamicUnits,
        this.staticEntity.code as 'goldmine' | 'sawmill',
        this.now
      );

    this.harvestWorkforceLimit = this
      ._computeHarvestWorkforceLimitPipe
      .transform(
        this.staticEntity as IHarvestBuilding,
        this.dynamicBuildings,
        this.dynamicUnits,
        this.now
      );
    
    this.unitAssignment = this
      ._formBuilder
      .group({
        entityCode: this
          ._formBuilder
          .control(this.staticEntity.code, Validators.required),
        workforce: this
          ._formBuilder
          .control(1)
      });
  }

  ngOnDestroy() {
    clearInterval(this._timer);
  }
  
  ngOnInit() {
    this._timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  isInvalidFormForUnitAssignment(unitAssignment: FormGroup) {
    const workforce = unitAssignment.get('workforce')?.value;
    
    let error = '';
    if (workforce < 1) {
      error += 'You can only assign at least 1 peasant.';
    }

    if (workforce > this._availableWorkforce) {
      error += ` You can't assign more peasants than the ones that are available (${this._availableWorkforce}).`;
    }

    if (workforce > this.harvestWorkforceLimit) {
      error += ` You can't assign more than ${this.harvestWorkforceLimit} peasants in your ${this.staticEntity.code}s for now.`;
    }

    return error;
  }

  isInvalidFormForUnitUnassignment(unitAssignment: FormGroup) {
    const workforce = unitAssignment.get('workforce')?.value;
    
    let error = '';
    if (workforce < 1) {
      error += 'You can only unassign at least 1 peasant.';
    }

    if (workforce > this._harvestingPeasants) {
      error += ` You can't unassign more peasants than the ones that are currently harvesting (${this._harvestingPeasants}).`;
    }

    return error;
  }

  onUnitAssignment(unitAssignment: FormGroup) {
    if (this.isInvalidFormForUnitAssignment(unitAssignment)) {
      return;
    }

    this.assignUnit.emit({
      code: 'peasant',
      garrisonId: '',
      harvestCode: this.staticEntity.code as 'goldmine' | 'sawmill',
      quantity: unitAssignment.get('workforce')?.value
    });
  }

  onUnitUnassignment(unitAssignment: FormGroup) {
    if (this.isInvalidFormForUnitUnassignment(unitAssignment)) {
      return;
    }

    this.unassignUnit.emit({
      code: 'peasant',
      garrisonId: '',
      harvestCode: this.staticEntity.code as 'goldmine' | 'sawmill',
      quantity: unitAssignment.get('workforce')?.value
    });
  }
}