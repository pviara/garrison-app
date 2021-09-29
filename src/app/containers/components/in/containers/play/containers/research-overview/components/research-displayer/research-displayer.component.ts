import {
  Component,
  Input
} from '@angular/core';
import { GarrisonResearch } from 'src/models/dynamic/IGarrison';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-research-displayer',
  templateUrl: './research-displayer.component.html',
  styleUrls: ['./research-displayer.component.scss']
})
export class ResearchDisplayerComponent {
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