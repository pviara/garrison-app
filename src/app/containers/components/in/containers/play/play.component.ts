import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { GarrisonService } from '../../services/dynamic/garrison.service';
import { IBuilding } from 'src/models/static/IBuilding';
import { IBuildingConstructionCancel } from 'src/models/dynamic/payloads/IBuildingConstructionCancel';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IUnit } from 'src/models/static/IUnit';
import { SoundService } from 'src/app/shared/services/sound.service';
import { IUnitTrainingCancel } from 'src/models/dynamic/payloads/IUnitTrainingCancel';

@Component({
  selector: 'garrison-in-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnDestroy, OnInit {
  buildings!: IBuilding[];

  character!: ICharacter;
  
  garrison!: IGarrison;
  
  now = new Date();

  units!: IUnit[];
  
  private _timer: any;
  
  constructor(
    private _garrisonService: GarrisonService,
    private _route: ActivatedRoute,
    private _soundService: SoundService
  ) {}

  ngOnDestroy() {
    clearInterval(this._timer);
  }

  ngOnInit() {
    this.buildings = this._route.snapshot.data.buildings;
    this.character = this._route.snapshot.data.character;
    this.units = this._route.snapshot.data.units;
    
    this._garrisonService
      .garrisonSubject
      .subscribe(garrison => {
        if (!garrison) {
          throw new Error(`A valid garrison must be given to ${this.constructor.name}.`);
        }
        
        this.garrison = garrison;
      });
      
    this._timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  onConstructionCancelation(payload: IBuildingConstructionCancel) {
    this._soundService.play('click');

    this._garrisonService
      .cancelConstruction({
        garrisonId: this.garrison._id,
        buildingId: payload.buildingId,
        constructionId: payload.constructionId || (payload as any)._id
      })
      .subscribe(result => {
        // // alert('✖ Building construction has been canceled !');
      });
  }

  onTrainingCancelation({ code, seriesId }: IUnitTrainingCancel) {
    this._garrisonService
      .cancelTraining({
        garrisonId: this.garrison._id,
        code,
        seriesId
      })
      .subscribe(result => {
        // // alert('✖ Unit training has been canceled !');
      });
  }
}