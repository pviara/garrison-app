import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BuildingService } from 'src/app/containers/components/in/services/static/building.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { ComputeAvailableBuildingWorkforcePipe } from '../../../../pipes/dynamic/compute-available-building-workforce.pipe';
import { ComputeInstantiationRequirementsPipe } from '../../../../pipes/dynamic/compute-instantiation-requirements.pipe';
import { ComputeResourceValuePipe } from '../../../../pipes/resource/compute-resource-value.pipe';
import {
  GarrisonBuilding,
  GarrisonResearch,
  GarrisonResources,
  GarrisonUnit
} from 'src/models/dynamic/IGarrison';
import {
  IBuilding,
  IInstantiableBuilding
} from 'src/models/static/IBuilding';
import { IBuildingCreate } from 'src/models/dynamic/payloads/IBuildingCreate';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import {
  IInstantiable,
  IStaticEntity
} from 'src/models/static/IStaticEntity';
import { IUnit } from 'src/models/static/IUnit';
import { SoundService } from 'src/app/shared/services/sound.service';
import { StaticHelper as _h } from 'src/app/containers/components/in/utils/helper';
import { UnitService } from 'src/app/containers/components/in/services/static/unit.service';

@Component({
  selector: 'garrison-in-play-building-construction',
  templateUrl: './building-construction.component.html',
  styleUrls: ['./building-construction.component.scss'],
  providers: [
    ComputeAvailableBuildingWorkforcePipe,
    ComputeInstantiationRequirementsPipe,
    ComputeResourceValuePipe
  ]
})
export class BuildingConstructionComponent implements OnChanges, OnDestroy, OnInit {  
  buildingCreation!: FormGroup;

  _character!: ICharacter;

  @Output()
  createBuilding = new EventEmitter<IBuildingCreate>();
  
  @Input()
  dynamicBuildings!: GarrisonBuilding[];
  
  @Input()
  dynamicResearches!: GarrisonResearch[];
  
  @Input()
  dynamicUnits!: GarrisonUnit[];

  minWorkforce!: number;
  
  now = new Date();

  @Input()
  resources!: GarrisonResources;
  
  selectedWorkforce!: number;
  
  @Input()
  staticEntity!: IStaticEntity;

  private _availableWorkforce!: number;

  private _staticBuildings!: IBuilding[];

  private _staticUnits!: IUnit[];
  
  private _timer: any;

  constructor(
    private _route: ActivatedRoute,
    private _buildingService: BuildingService,
    private _computeAvailableBuildingWorkforcePipe: ComputeAvailableBuildingWorkforcePipe,
    private _computeInstantiationRequirementsPipe: ComputeInstantiationRequirementsPipe,
    private _computeResourceValuePipe: ComputeResourceValuePipe,
    private _formBuilder: FormBuilder,
    private _soundService: SoundService,
    private _unitService: UnitService
  ) {}

  ngOnChanges() {
    this.buildingCreation = {} as FormGroup;
    
    this.minWorkforce = (this.staticEntity as IInstantiableBuilding)
      .instantiation
      .minWorkforce;
    
    this.selectedWorkforce = this.minWorkforce;

    let workforceDefaultValue = this.minWorkforce;
    
    this._availableWorkforce = this
      ._computeAvailableBuildingWorkforcePipe
      .transform(this.dynamicUnits, this.now);

    if (this._availableWorkforce < this.minWorkforce) {
      workforceDefaultValue = 0;
      this.selectedWorkforce = 0;
    }

    this.buildingCreation = this
      ._formBuilder
      .group({
        code: this
          ._formBuilder
          .control(this.staticEntity.code, Validators.required),
        workforce: this
          ._formBuilder
          .control(workforceDefaultValue,
            this._workforceValidator()
          )
      });
  }

  ngOnDestroy() {
    clearInterval(this._timer);
  }

  ngOnInit() {
    const staticBuildings = this
      ._buildingService
      .getBuildingsFromStorage();
    if (!staticBuildings) {
      throw new Error('Static buildings should be existing in storage.');
    }
    this._staticBuildings = staticBuildings;

    const staticUnits = this
      ._unitService
      .getUnitsFromStorage();
    if (!staticUnits) {
      throw new Error('Static units should be existing in storage.');
    }
    this._staticUnits = staticUnits;

    this._character = this._route.snapshot.data.character;
    
    this._timer = setInterval(() => {
      this._availableWorkforce = this
        ._computeAvailableBuildingWorkforcePipe
        .transform(this.dynamicUnits, this.now);

      this.now = new Date();
    }, 1000);
  }

  isInvalidForm(buildingCreation: FormGroup) {
    if (buildingCreation.invalid) {
      return true;
    }

    const requiredBuildings = this
      ._computeInstantiationRequirementsPipe
      .transform(
        this.staticEntity as IInstantiable,
        this.dynamicBuildings,
        this.now
      );
    if (requiredBuildings?.some(requirement => !requirement.completed)) {
      return true;
    }

    const gold = +(this
      ._computeResourceValuePipe
      .transform(
        'gold',
        this.resources,
        this._staticBuildings,
        this._staticUnits,
        this.dynamicBuildings,
        this.dynamicResearches,
        this.dynamicUnits,
        this.now
      ) as string);

    const wood = +(this
      ._computeResourceValuePipe
      .transform(
        'wood',
        this.resources,
        this._staticBuildings,
        this._staticUnits,
        this.dynamicBuildings,
        this.dynamicResearches,
        this.dynamicUnits,
        this.now
      ) as string);

    const plot = +(this
      ._computeResourceValuePipe
      .transform(
        'plot',
        this.resources,
        this._staticBuildings,
        this._staticUnits,
        this.dynamicBuildings,
        this.dynamicResearches,
        this.dynamicUnits,
        this.now
      ) as string);
    
    const { instantiation: { cost } } = this.staticEntity as IInstantiableBuilding;
    if (gold < cost.gold || wood < cost.wood || plot < cost.plot) {
      return true;
    }

    return false;
  }
  
  onBuildingCreation(buildingCreation: FormGroup) {
    const { faction } = this._character.side;
    if (faction === 'alliance') {
      this._soundService.playRandomly('peasant_yes', 1, 4);

    } else if (faction === 'horde') {
      this._soundService.playRandomly('peon_yes', 1, 4);
      
    } else throw new Error("Character's faction is not valid.");
    
    const workforce = buildingCreation.get('workforce');
    if (!workforce) return;
    
    const payload: IBuildingCreate = {
      garrisonId: '',
      code: buildingCreation.get('code')?.value,
      workforce: workforce.value
    };

    this.createBuilding.emit(payload);
  }

  onWorkforceChange({ target: { value } }: any) {
    let error = '';
    if (value > this._availableWorkforce) {
      error = `You don't have ${value} available peasants, but only ${this._availableWorkforce}.`;
    }

    if (value > this.minWorkforce * 2) {
      error += ` Maximum workforce for this building is ${this.minWorkforce * 2} peasants.`;
    }
    
    if (value < this.minWorkforce) {
      error = ` Minimum workforce for this building is ${this.minWorkforce} peasants.`
    }
    
    if (error.length > 0) {
      this._soundService.play('error');
      alert(error);
    
      let newValue = this.minWorkforce;
      if (this._availableWorkforce < this.minWorkforce) {
        newValue = 0;
      }

      this.buildingCreation
        .get('workforce')
        ?.setValue(newValue);
      
      this.selectedWorkforce = newValue;
      return;
    }
    
    this.selectedWorkforce = value;
  }

  private _workforceValidator() {
    return (control: AbstractControl) => {

      let invalid = false;
      if (control.value < this.minWorkforce) {
        invalid = true;
      }

      if (control.value > this.minWorkforce * 2) {
        invalid = true;
      }

      if (control.value > this._availableWorkforce) {
        invalid = true;
      }
      
      return !invalid ? null : {
        invalid: { value: control.value }
      };
    };
  }
}
