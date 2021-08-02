
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ComputeAvailableWorkforcePipe } from '../../../../pipes/dynamic/compute-available-workforce.pipe';
import {
  GarrisonResearch,
  GarrisonUnit
} from 'src/models/dynamic/IGarrison';
import { IInstantiableBuilding } from 'src/models/static/IBuilding';
import { IStaticEntity } from 'src/models/static/IStaticEntity';
import { SoundService } from 'src/app/shared/services/sound.service';
import { StaticHelper as _h } from 'src/app/containers/components/in/utils/helper';

@Component({
  selector: 'garrison-in-play-building-construction',
  templateUrl: './building-construction.component.html',
  styleUrls: ['./building-construction.component.scss'],
  providers: [
    ComputeAvailableWorkforcePipe
  ]
})
export class BuildingConstructionComponent implements OnChanges, OnDestroy, OnInit {  
  buildingCreation!: FormGroup;

  @Input()
  dynamicResearches!: GarrisonResearch[];
  
  @Input()
  dynamicUnits!: GarrisonUnit[];

  minWorkforce!: number;
  
  now = new Date();

  selectedWorkforce!: number;
  
  @Input()
  staticEntity!: IStaticEntity;

  private _availableWorkforce!: number;
  
  private _timer: any;

  constructor(
    private _computeAvailableWorkforcePipe: ComputeAvailableWorkforcePipe,
    private _formBuilder: FormBuilder,
    private _soundService: SoundService
  ) {}

  ngOnChanges() {
    this.buildingCreation = {} as FormGroup;
    
    this.minWorkforce = (this.staticEntity as IInstantiableBuilding)
      .instantiation
      .minWorkforce;
    
    this.selectedWorkforce = this.minWorkforce;

    let workforceDefaultValue = this.minWorkforce;
    
    this._availableWorkforce = this
      ._computeAvailableWorkforcePipe
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
    this._timer = setInterval(() => {
      this._availableWorkforce = this
        ._computeAvailableWorkforcePipe
        .transform(this.dynamicUnits, this.now);

      this.now = new Date();
    }, 1000);
  }

  onBuildingCreation(buildingCreation: FormGroup) {
    console.log(buildingCreation, this.now.getTime());
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

      // TODO 🛠 check on resources
      
      return !invalid ? null : {
        invalid: { value: control.value }
      };
    };
  }
}
