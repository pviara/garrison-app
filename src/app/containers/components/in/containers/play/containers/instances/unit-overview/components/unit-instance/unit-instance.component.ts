import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';
import { FetchByCodePipe } from 'src/app/shared/pipes/static/fetch-by-code.pipe';
import { GarrisonService } from 'src/app/containers/components/in/services/dynamic/garrison.service';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { IStaticEntity } from 'src/models/static/IStaticEntity';
import { IUnit } from 'src/models/static/IUnit';
import { IUnitCreate } from 'src/models/dynamic/payloads/IUnitCreate';
import { UnitService } from 'src/app/containers/components/in/services/static/unit.service';

@Component({
  selector: 'garrison-in-play-unit-instance',
  templateUrl: './unit-instance.component.html',
  styleUrls: ['./unit-instance.component.scss'],
  providers: [
    FetchByCodePipe
  ]
})
export class UnitInstanceComponent implements OnInit {
  units!: IUnit[];

  character!: ICharacter;

  garrison!: IGarrison;
  
  staticEntity!: IStaticEntity;
  
  constructor(
    private _unitService: UnitService,
    private _fetchByCodePipe: FetchByCodePipe,
    private _garrisonService: GarrisonService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.units = this
      ._unitService
      .getUnitsFromStorage() as IUnit[];

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
        
        const unit = this
          ._fetchByCodePipe
          .transform(this.units, code);
        if (!unit) {
          throw new Error(`A valid unit code must be given to ${this.constructor.name}.`);
        }

        this.staticEntity = unit;
      });
  }

  onUnitTraining(payload: IUnitCreate) {
    this._garrisonService
      .trainUnit({
        ...payload,
        garrisonId: this.garrison._id
      })
      .subscribe(result => {
        // ...
      });
  }
}