import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { ComputeMostAffordableImprovementPipe } from '../../../../pipes/dynamic/compute_most_affordable_improvement.pipe';
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
import { IBuilding } from 'src/models/static/IBuilding';
import { StaticHelper as _h } from 'src/app/containers/components/in/utils/helper';
import { IUnitAssign } from 'src/models/dynamic/payloads/IUnitAssign';
import { IBuildingUpgradeOrExtend } from 'src/models/dynamic/payloads/IBuildingUpgradeOrExtend';

@Component({
  selector: 'garrison-in-play-building-displayer',
  templateUrl: './building-displayer.component.html',
  styleUrls: ['./building-displayer.component.scss'],
  providers: [
    ComputeMostAffordableImprovementPipe
  ]
})
export class BuildingDisplayerComponent implements OnDestroy, OnInit {
  @Output()
  assignUnit = new EventEmitter<IUnitAssign>();
  
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

  @Output()
  extendBuilding = new EventEmitter<IBuildingUpgradeOrExtend>();
  
  now = new Date();
  
  @Input()
  resources!: GarrisonResources;
  
  @Input()
  staticEntity!: IStaticEntity;

  @Output()
  upgradeBuilding = new EventEmitter<IBuildingUpgradeOrExtend>();

  @Output()
  unassignUnit = new EventEmitter<IUnitAssign>();

  private _timer: any;

  constructor(
    private _computeMostAffordableImprovementPipe: ComputeMostAffordableImprovementPipe,
  ) {}
  
  ngOnDestroy() {
    clearInterval(this._timer);
  }
  
  ngOnInit() {
    this._timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  isHarvestableBuilding(staticBuilding: IStaticEntity) {
    const dynamicBuildings = this
      .dynamicBuildings
      .filter(
        building => building.code === staticBuilding.code
      );
    
    return (staticBuilding as any).harvest?.maxWorkforce
      && dynamicBuildings.length > 0
      && dynamicBuildings
        .some(
          building => _h
            .checkBuildingAvailability(
              this.now,
              building
            )
        )
  }

  isImprovableBuilding(staticBuilding: IStaticEntity) {
    return (
        (staticBuilding as any).extension
        || (staticBuilding as any).upgrades.length > 0
      )
      && this
        ._computeMostAffordableImprovementPipe
        .transform(
          staticBuilding.code,
          staticBuilding as IBuilding,
          this.dynamicBuildings,
          this.now
        );
  }
  
  onBuildingCreation(buildingCreation: IBuildingCreate) {
    this.createBuilding.emit(buildingCreation);
  }

  onBuildingExtension(buildingExtension: IBuildingUpgradeOrExtend) {
    this.extendBuilding.emit(buildingExtension);
  }

  onBuildingUpgrade(buildingUpgrade: IBuildingUpgradeOrExtend) {
    this.upgradeBuilding.emit(buildingUpgrade);
  }
  
  onUnitAssignment(unitAssignment: IUnitAssign) {
    this.assignUnit.emit(unitAssignment);
  }

  onUnitUnassignment(unitUnassignment: IUnitAssign) {
    this.unassignUnit.emit(unitUnassignment);
  }
}