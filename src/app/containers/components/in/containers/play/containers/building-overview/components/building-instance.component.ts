import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';
import { BuildingService } from 'src/app/containers/components/in/services/static/building.service';
import { FetchByCodePipe } from '../../../pipes/static/fetch-by-code.pipe';
import { IBuilding } from 'src/models/static/IBuilding';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-building-instance',
  templateUrl: './building-instance.component.html',
  styleUrls: ['./building-instance.component.scss'],
  providers: [
    FetchByCodePipe
  ]
})
export class BuildingInstanceComponent implements OnInit {
  private _buildings!: IBuilding[];
  
  private _staticEntity!: IStaticEntity;
  
  constructor(
    private _buildingService: BuildingService,
    private _fetchByCodePipe: FetchByCodePipe,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._buildings = this
      ._buildingService
      .getBuildingsFromStorage() as IBuilding[];
    
    this._route
      .paramMap
      .subscribe(params => {
        const code = params.get('code');
        if (!code) return;
        
        const building = this
          ._fetchByCodePipe
          .transform(this._buildings, code);
        if (!building) {
          throw new Error(`A valid building code must be given to ${this.constructor.name}.`);
        }

        this._staticEntity = building;
        console.log(this._staticEntity);
      });
  }
}