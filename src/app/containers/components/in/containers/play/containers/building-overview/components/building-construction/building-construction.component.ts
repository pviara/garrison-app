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
    private _formBuilder: FormBuilder
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
    if (
      value > this._availableWorkforce
      ||
      value < this.minWorkforce
    ) {
      this.buildingCreation
        .get('workforce')
        ?.setValue(this.minWorkforce);
    }
  }

  ngOnDestroy() {
    clearInterval(this._timer);
  }

  ngOnInit() {
    this._timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  onBuildingCreation(buildingCreation: FormGroup) {
    console.log(buildingCreation, this.now.getTime());
  }
}
