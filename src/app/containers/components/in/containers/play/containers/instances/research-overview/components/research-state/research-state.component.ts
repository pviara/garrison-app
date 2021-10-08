import {
  Component,
  Input
} from '@angular/core';
import { GarrisonResearch } from 'src/models/dynamic/IGarrison';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-research-state',
  templateUrl: './research-state.component.html',
  styleUrls: ['./research-state.component.scss']
})
export class ResearchStateComponent {
  @Input()
  dynamicResearches!: GarrisonResearch[];

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
