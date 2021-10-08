import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { GarrisonBuilding } from 'src/models/dynamic/IGarrison';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-building-state',
  templateUrl: './building-state.component.html',
  styleUrls: ['./building-state.component.scss']
})
export class BuildingStateComponent implements OnDestroy, OnInit {
  @Input()
  dynamicBuildings!: GarrisonBuilding[];

  now = new Date();
  
  @Input()
  staticEntity!: IStaticEntity;

  private _timer: any;
  
  ngOnDestroy() {
    clearInterval(this._timer);
  }

  ngOnInit() {
    this._timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }
}