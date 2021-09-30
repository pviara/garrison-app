import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  BuildingImprovementType,
  IBuilding,
  IInstantiableBuilding,
  IRequiredBuildingForExtensionLevel
} from "src/models/static/IBuilding";
import { BuildingService } from "src/app/containers/components/in/services/static/building.service";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";
import { ComputeAvailableBuildingWorkforcePipe } from "../../../../pipes/dynamic/compute-available-building-workforce.pipe";
import { ComputeImprovementTypePipe } from '../../../../pipes/dynamic/compute-improvement-type.pipe';
import { ComputeResourceValuePipe } from "../../../../pipes/resource/compute-resource-value.pipe";
import {
  GarrisonBuilding,
  GarrisonResearch,
  GarrisonResources,
  GarrisonUnit
} from "src/models/dynamic/IGarrison";
import { IBuildingUpgradeOrExtend } from "src/models/dynamic/payloads/IBuildingUpgradeOrExtend";
import { ICharacter } from "src/models/dynamic/ICharacter";
import { IStaticEntity } from "src/models/static/IStaticEntity";
import { IUnit } from "src/models/static/IUnit";
import { SoundService } from "src/app/shared/services/sound.service";
import { StaticHelper as _h } from 'src/app/containers/components/in/utils/helper';
import { UnitService } from "src/app/containers/components/in/services/static/unit.service";

@Component({
  selector: 'garrison-in-play-building-improvement',
  templateUrl: './building-improvement.component.html',
  styleUrls: ['./building-improvement.component.scss'],
  providers: [
    ComputeAvailableBuildingWorkforcePipe,
    ComputeImprovementTypePipe,
    ComputeResourceValuePipe
  ]
})
export class BuildingImprovementComponent implements OnDestroy, OnInit {
  @Input()
  buildingId!: string;
  
  buildingImprovement!: FormGroup;
  
  @Input()
  cost!: {
    gold: number;
    wood: number;
    plot: number;
  };

  @Input()
  dynamicBuildings!: GarrisonBuilding[];

  @Input()
  dynamicResearches!: GarrisonResearch[];

  @Input()
  dynamicUnits!: GarrisonUnit[];

  @Output()
  extendBuilding = new EventEmitter<IBuildingUpgradeOrExtend>();
  
  @Input()
  improvementLevel!: number;

  @Input()
  maxWorkforce!: number;

  @Input()
  minWorkforce!: number;

  now = new Date();

  @Input()
  resources!: GarrisonResources;
  
  selectedWorkforce!: number;
  
  @Input()
  staticEntity!: IStaticEntity;

  @Output()
  upgradeBuilding = new EventEmitter<IBuildingUpgradeOrExtend>();

  private _availableWorkforce!: number;

  private _character!: ICharacter;
  
  private _staticBuildings!: IBuilding[];

  private _staticUnits!: IUnit[];
  
  private _timer: any;
  
  constructor(
    private _route: ActivatedRoute,
    private _buildingService: BuildingService,
    private _computeAvailableWorkforcePipe: ComputeAvailableBuildingWorkforcePipe,
    private _computeImprovementTypePipe: ComputeImprovementTypePipe,
    private _computeResourceValuePipe: ComputeResourceValuePipe,
    private _formBuilder: FormBuilder,
    private _soundService: SoundService,
    private _unitService: UnitService
  ) {}

  ngOnChanges() {
    this.selectedWorkforce = this.minWorkforce;

    this._availableWorkforce = this
      ._computeAvailableWorkforcePipe
      .transform(this.dynamicUnits, this.now);
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
    
    this.selectedWorkforce = this.minWorkforce;

    let workforceDefaultValue = this.minWorkforce;
    
    this._availableWorkforce = this
      ._computeAvailableWorkforcePipe
      .transform(this.dynamicUnits, this.now);

    if (this._availableWorkforce < this.minWorkforce) {
      workforceDefaultValue = 0;
      this.selectedWorkforce = 0;
    }

    this.buildingImprovement = this
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
    
    this._timer = setInterval(() => {
      this._availableWorkforce = this
        ._computeAvailableWorkforcePipe
        .transform(this.dynamicUnits, this.now);

      this.now = new Date();
    }, 1000);
  }

  isInvalidForm(buildingImprovement: FormGroup) {
    if (buildingImprovement.invalid) {
      return true;
    }

    const code = buildingImprovement.get('code')?.value;
    const staticBuilding = this
      ._staticBuildings
      .find(
        building => building.code === code
      );
    if (!staticBuilding) {
      throw new Error(`Couldn't find static building with code '${code}'`);
    }

    const dynamicBuilding = this
      .dynamicBuildings
      .find(
        building => building._id === this.buildingId
      )
    if (!dynamicBuilding) {
      throw new Error(`Couldn't find building with id '${this.buildingId}'`);
    }

    const improvementType = this
      ._computeImprovementTypePipe
      .transform(
        staticBuilding
      );
    if (improvementType === 'extension') {
      const nextLevel = _h
        .computeBuildingCurrentLevel(
          this.now,
          improvementType,
          dynamicBuilding.constructions
        ) + 1;
      
      let requiredEntities: IRequiredBuildingForExtensionLevel[] = [];
      if (staticBuilding.extension?.requiredEntities) {
        requiredEntities = staticBuilding
          .extension
          .requiredEntities
          .buildings;
      }
        
      const fulfilled = _h
        .checkExtensionConstructionRequirements(
          this.now,
          requiredEntities,
          this.dynamicBuildings,
          nextLevel
        );
      if (!fulfilled) {
        return true;
      }
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

  onBuildingImprovement(
    buildingImprovement: FormGroup,
    improvementType: BuildingImprovementType
  ) {
    this._soundService.play('click');

    const { faction } = this._character.side;
    if (faction === 'alliance') {
      this._soundService.playRandomly('peasant_yes', 1, 4);

    } else if (faction === 'horde') {
      this._soundService.playRandomly('peon_yes', 1, 4);
      
    } else throw new Error("Character's faction is not valid.");
    
    const workforce = buildingImprovement.get('workforce');
    if (!workforce || !workforce.value) return;

    const payload: IBuildingUpgradeOrExtend = {
      garrisonId: '',
      buildingId: this.buildingId,
      workforce: workforce.value
    };

    switch (improvementType) {
      case 'extension': {
        this.extendBuilding.emit(payload);
        break;
      }

      case 'upgrade': {
        this.upgradeBuilding.emit(payload);
        break;
      }
    }
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

      this.buildingImprovement
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
