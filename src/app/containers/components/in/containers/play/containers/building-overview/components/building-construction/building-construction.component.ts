import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ComputeAvailableWorkforcePipe } from '../../../../pipes/dynamic/compute-available-workforce.pipe';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { GarrisonUnit } from 'src/models/dynamic/IGarrison';
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
  dynamicUnits!: GarrisonUnit[];

  minWorkforce!: number;
  
  now = new Date();

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

    let workforceDefaultValue = this.minWorkforce;
    
    this._availableWorkforce = this
      ._computeAvailableWorkforcePipe
      .transform(this.dynamicUnits, this.now);

    if (this._availableWorkforce < this.minWorkforce) {
      workforceDefaultValue = 0;
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
            [
              Validators.min(this.minWorkforce),
              Validators.max(this.minWorkforce * 2)
            ]
          )
      });
  }

  onWorkforceChange({ target: { value } }: any) {
    let error = '';
    if (value > this._availableWorkforce) {
      error = `You don't have ${value} available peasants, but only ${this._availableWorkforce}.`;

      if (value > this.minWorkforce * 2) {
        error += `\nAlso, maximum workforce for this building is ${this.minWorkforce * 2} peasants.`;
      }
    }
    
    if (value < this.minWorkforce) {
      error = `Minimum workforce for this building is ${this.minWorkforce} peasants.`
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
    }
  }

  ngOnDestroy() {
    clearInterval(this._timer);
  }

  ngOnInit() {
    this._timer = setInterval(() => {
      this._availableWorkforce = this
        ._computeAvailableWorkforcePipe
        .transform(this.dynamicUnits, this.now);
      console.log(this._availableWorkforce);

      this.now = new Date();
    }, 1000);
  }

  onBuildingCreation(buildingCreation: FormGroup) {
    console.log(buildingCreation, this.now.getTime());
  }
}
