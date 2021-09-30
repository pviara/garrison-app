import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { BuildingService } from 'src/app/containers/components/in/services/static/building.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output
} from '@angular/core';
import { ComputeAvailableResearchWorkforcePipe } from '../../../../pipes/dynamic/compute-available-research-workforce.pipe';
import { ComputeInstantiationRequirementsPipe } from '../../../../pipes/dynamic/compute-instantiation-requirements.pipe';
import { ComputeResourceValuePipe } from '../../../../pipes/resource/compute-resource-value.pipe';
import {
  GarrisonBuilding,
  GarrisonResearch,
  GarrisonResources,
  GarrisonUnit
} from 'src/models/dynamic/IGarrison';
import { IBuilding } from 'src/models/static/IBuilding';
import { IInstantiableResearch } from 'src/models/static/IResearch';
import {
  IInstantiable,
  IStaticEntity
} from 'src/models/static/IStaticEntity';
import { IResearchCreate } from 'src/models/dynamic/payloads/IResearchCreate';
import { IUnit } from 'src/models/static/IUnit';
import { SoundService } from 'src/app/shared/services/sound.service';
import { UnitService } from 'src/app/containers/components/in/services/static/unit.service';

@Component({
  selector: 'garrison-in-play-research-launching',
  templateUrl: './research-launching.component.html',
  styleUrls: ['./research-launching.component.scss'],
  providers: [
    ComputeAvailableResearchWorkforcePipe,
    ComputeInstantiationRequirementsPipe,
    ComputeResourceValuePipe
  ]
})
export class ResearchLaunchingComponent implements OnChanges, OnDestroy {
  @Input()
  dynamicBuildings!: GarrisonBuilding[];

  @Input()
  dynamicResearches!: GarrisonResearch[];

  @Input()
  dynamicUnits!: GarrisonUnit[];

  @Output()
  launchResearch = new EventEmitter<IResearchCreate>();
  
  minWorkforce!: number;
  
  now = new Date();

  @Input()
  resources!: GarrisonResources;
  
  researchLaunching!: FormGroup;

  selectedWorkforce!: number;
  
  @Input()
  staticEntity!: IStaticEntity;

  private _availableWorkforce!: number;

  private _staticBuildings!: IBuilding[];

  private _staticUnits!: IUnit[];

  private _timer: any;

  constructor(
    private _buildingService: BuildingService,
    private _computeAvailableResearchWorkforcePipe: ComputeAvailableResearchWorkforcePipe,
    private _computeInstantiationRequirementsPipe: ComputeInstantiationRequirementsPipe,
    private _computeResourceValuePipe: ComputeResourceValuePipe,
    private _formBuilder: FormBuilder,
    private _soundService: SoundService,
    private _unitService: UnitService
  ) {}

  ngOnChanges() {
    this.researchLaunching = {} as FormGroup;

    this.minWorkforce = (this.staticEntity as IInstantiableResearch)
      .instantiation
      .minWorkforce;
    
    this.selectedWorkforce = this.minWorkforce;

    let workforceDefaultValue = this.minWorkforce;

    this._availableWorkforce = this
      ._computeAvailableResearchWorkforcePipe
      .transform(this.dynamicUnits, this.now);
    
    this.researchLaunching = this
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

    this._timer = setInterval(() => {
      this._availableWorkforce = this
        ._computeAvailableResearchWorkforcePipe
        .transform(this.dynamicUnits, this.now);

      this.now = new Date();
    }, 1000);
  }

  isInvalidForm(researchLaunching: FormGroup) {
    if (researchLaunching.invalid) {
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
    
    const { instantiation: { cost } } = this.staticEntity as IInstantiableResearch;
    if (gold < cost.gold || wood < cost.wood) {
      return true;
    }

    return false;
  }

  onResearchLaunching(researchLaunching: FormGroup) {
    this._soundService.play('click');

    const workforce = researchLaunching.get('workforce');
    if (!workforce) return;
    
    const payload: IResearchCreate = {
      garrisonId: '',
      code: researchLaunching.get('code')?.value,
      workforce: workforce.value
    };

    this.launchResearch.emit(payload);
  }

  onWorkforceChange({ target: { value } }: any) {
    let error = '';
    if (value > this._availableWorkforce) {
      error = `You don't have ${value} available researchers, but only ${this._availableWorkforce}.`;
    }

    if (value > this.minWorkforce * 2) {
      error += ` Maximum workforce for this research is ${this.minWorkforce * 2} researchers.`;
    }
    
    if (value < this.minWorkforce) {
      error = ` Minimum workforce for this research is ${this.minWorkforce} researchers.`
    }
    
    if (error.length > 0) {
      this._soundService.play('error');
      alert(error);
    
      let newValue = this.minWorkforce;
      if (this._availableWorkforce < this.minWorkforce) {
        newValue = 0;
      }

      this.researchLaunching
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