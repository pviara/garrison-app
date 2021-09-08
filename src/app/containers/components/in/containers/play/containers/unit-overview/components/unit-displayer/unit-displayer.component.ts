import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { GarrisonUnit } from 'src/models/dynamic/IGarrison';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-unit-displayer',
  templateUrl: './unit-displayer.component.html',
  styleUrls: ['./unit-displayer.component.scss']
})
export class UnitDisplayerComponent implements OnDestroy, OnInit {
  @Input()
  character!: ICharacter;

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
}