import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';
import { BuildingService } from 'src/app/containers/components/in/services/static/building.service';
import { FetchByCodePipe } from '../../../../../pipes/static/fetch-by-code.pipe';
import { GarrisonService } from 'src/app/containers/components/in/services/dynamic/garrison.service';
import { IBuilding } from 'src/models/static/IBuilding';
import { IBuildingCreate } from 'src/models/dynamic/payloads/IBuildingCreate';
import { IStaticEntity } from 'src/models/static/IStaticEntity';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { IUnitAssign } from 'src/models/dynamic/payloads/IUnitAssign';
import { IBuildingUpgradeOrExtend } from 'src/models/dynamic/payloads/IBuildingUpgradeOrExtend';

@Component({
  selector: 'garrison-in-play-building-instance',
  templateUrl: './building-instance.component.html',
  styleUrls: ['./building-instance.component.scss'],
  providers: [
    FetchByCodePipe
  ]
})
export class BuildingInstanceComponent implements OnInit {
  buildings!: IBuilding[];

  character!: ICharacter;

  garrison!: IGarrison;
  
  staticEntity!: IStaticEntity;
  
  constructor(
    private _buildingService: BuildingService,
    private _fetchByCodePipe: FetchByCodePipe,
    private _garrisonService: GarrisonService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buildings = this
      ._buildingService
      .getBuildingsFromStorage() as IBuilding[];

    this.character = this._route.snapshot.data.character;

    this._garrisonService
      .garrisonSubject
      .subscribe(garrison => {
        if (!garrison) {
          throw new Error(`A valid garrison must be given to ${this.constructor.name}.`);
        }

        this.garrison = garrison;
      });
    
    this._route
      .paramMap
      .subscribe(params => {
        const code = params.get('code');
        if (!code) return;
        
        const building = this
          ._fetchByCodePipe
          .transform(this.buildings, code);
        if (!building) {
          throw new Error(`A valid building code must be given to ${this.constructor.name}.`);
        }

        this.staticEntity = building;
      });
  }

  onBuildingCreation(payload: IBuildingCreate) {
    this._garrisonService
      .createBuilding({
        ...payload,
        garrisonId: this.garrison._id
      })
      .subscribe(result => {
        // ...
      });
  }

  onBuildingExtension(payload: IBuildingUpgradeOrExtend) {
    this._garrisonService
      .extendBuilding({
        ...payload,
        garrisonId: this.garrison._id
      })
      .subscribe(result => {
        // ...
      });
  }

  onBuildingUpgrade(payload: IBuildingUpgradeOrExtend) {
    this._garrisonService
      .upgradeBuilding({
        ...payload,
        garrisonId: this.garrison._id
      })
      .subscribe(result => {
        // ...
      });
  }

  onUnitAssignment(payload: IUnitAssign) {
    this._garrisonService
      .assignUnit({
        ...payload,
        garrisonId: this.garrison._id
      })
      .subscribe(result => {
        // ...
      });
  }

  onUnitUnassignment(payload: IUnitAssign) {
    this._garrisonService
      .unassignUnit({
        ...payload,
        garrisonId: this.garrison._id
      })
      .subscribe(result => {
        // ...
      });
  }
}