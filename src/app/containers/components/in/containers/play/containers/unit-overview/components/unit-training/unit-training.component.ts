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
import { ComputeInstantiationRequirementsPipe } from '../../../../pipes/dynamic/compute-instantiation-requirements.pipe';
import { ComputeResourceValuePipe } from '../../../../pipes/resource/compute-resource-value.pipe';
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
import { IBuilding } from 'src/models/static/IBuilding';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import {
  IInstantiable,
  IStaticEntity
} from 'src/models/static/IStaticEntity';
import {
  IInstantiableUnit,
  IUnit
} from 'src/models/static/IUnit';
import { IUnitCreate } from 'src/models/dynamic/payloads/IUnitCreate';
import { SoundService } from 'src/app/shared/services/sound.service';
import { UnitService } from 'src/app/containers/components/in/services/static/unit.service';

@Component({
  selector: 'garrison-in-play-unit-training',
  templateUrl: './unit-training.component.html',
  styleUrls: ['./unit-training.component.scss'],
  providers: [
    ComputeInstantiationRequirementsPipe,
    ComputeResourceValuePipe
  ]
})
export class UnitTrainingComponent implements OnChanges, OnDestroy, OnInit {
  @Output()
  createUnit = new EventEmitter<IUnitCreate>();
  
  @Input()
  dynamicBuildings!: GarrisonBuilding[];
  
  @Input()
  dynamicResearches!: GarrisonResearch[];
  
  @Input()
  dynamicUnits!: GarrisonUnit[];
  
  now = new Date();

  @Input()
  resources!: GarrisonResources;
  
  selectedQuantity!: number;
  
  @Input()
  staticEntity!: IStaticEntity;

  unitTraining!: FormGroup;

  private _character!: ICharacter;
  
  private _staticBuildings!: IBuilding[];

  private _staticUnits!: IUnit[];
  
  private _timer: any;
  
  constructor(
    private _route: ActivatedRoute,
    private _buildingService: BuildingService,
    private _computeInstantiationRequirementsPipe: ComputeInstantiationRequirementsPipe,
    private _computeResourceValuePipe: ComputeResourceValuePipe,
    private _formBuilder: FormBuilder,
    private _soundService: SoundService,
    private _unitService: UnitService
  ) {}

  ngOnChanges() {
    this.unitTraining = this
      ._formBuilder
      .group({
        code: this
          ._formBuilder
          .control(this.staticEntity.code, Validators.required),
        quantity: this
          ._formBuilder
          .control(
            1,
            [
              Validators.min(1),
              Validators.max(100)
            ])
      });
    
    this.selectedQuantity = 1;
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
      this.now = new Date();
    }, 1000);
  }

  isInvalidForm(unitTraining: FormGroup) {
    if (unitTraining.invalid) {
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

    const food = (this
      ._computeResourceValuePipe
      .transform(
        'food',
        this.resources,
        this._staticBuildings,
        this._staticUnits,
        this.dynamicBuildings,
        this.dynamicResearches,
        this.dynamicUnits,
        this.now
      ) as unknown) as { available: number; inComing: number; }
    
    const { instantiation: { cost } } = this.staticEntity as IInstantiableUnit;
    const quantity = unitTraining.get('quantity')?.value;
    const computedCost = {
      gold: cost.gold * quantity,
      wood: cost.wood * quantity,
      food: cost.food * quantity
    };

    if (
      gold < computedCost.gold
      || wood < computedCost.wood
      || +food.available < computedCost.food
    ) {
      return true;
    }

    return false;
  }

  onQuantityChange({ target: { value } }: any) {
    let error = '';
    if (value > 100) {
      error = 'You can\'t train more than 100 units in one shot.';
    }

    if (value < 1) {
      error = 'You must train at least 1 unit.';
    }

    if (error.length > 0) {
      this._soundService.play('error');
      alert(error);

      this.unitTraining
        .get('quantity')
        ?.setValue(1);
    
      this.selectedQuantity = 1;
        
      return;
    }
    
    this.selectedQuantity = value;
  }
  
  onUnitTraining(unitTraining: FormGroup) {
    const { faction } = this._character.side;
    if (faction === 'alliance') {
      this._soundService.play('alliance_unit');

    } else if (faction === 'horde') {
      this._soundService.play('horde_unit');
      
    } else throw new Error("Character's faction is not valid.");
    
    const quantity = unitTraining.get('quantity');
    if (!quantity) return;

    const payload: IUnitCreate = {
      garrisonId: '',
      code: unitTraining.get('code')?.value,
      quantity: quantity.value
    };

    this.createUnit.emit(payload);
  }
}
