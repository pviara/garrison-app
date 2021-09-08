import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { GarrisonUnit } from "src/models/dynamic/IGarrison";
import { IStaticEntity } from "src/models/static/IStaticEntity";
import { IUnit } from 'src/models/static/IUnit';

@Component({
  selector: 'garrison-in-play-unit-state',
  templateUrl: './unit-state.component.html',
  styleUrls: ['./unit-state.component.scss']
})
export class UnitStateComponent implements OnDestroy, OnInit {
  @Input()
  dynamicUnits!: GarrisonUnit[];

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

  isBuilderOrHarvester(staticUnit: IStaticEntity) {
    return staticUnit.code === 'peasant';
  }

  isResearcher(staticUnit: IStaticEntity) {
    return staticUnit.code === 'researcher';
  }
}