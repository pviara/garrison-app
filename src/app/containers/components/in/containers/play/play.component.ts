import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { IBuilding } from 'src/models/static/IBuilding';
import { GarrisonService } from '../../services/dynamic/garrison.service';

@Component({
  selector: 'garrison-in-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  garrison!: IGarrison;

  buildings!: IBuilding[];
  
  constructor(
    private _garrisonService: GarrisonService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buildings = this._route.snapshot.data.buildings;
    
    this._garrisonService
      .garrisonSubject
      .subscribe(garrison => {
        if (!garrison) {
          throw new Error(`A valid garrison must be given to ${this.constructor.name}.`);
        }
        
        this.garrison = garrison;
      });
  }
}