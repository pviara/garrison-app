import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  GarrisonBuilding,
  GarrisonResearch,
  GarrisonResources,
  GarrisonUnit
} from 'src/models/dynamic/IGarrison';
import { IResearchCreate } from 'src/models/dynamic/payloads/IResearchCreate';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Component({
  selector: 'garrison-in-play-research-displayer',
  templateUrl: './research-displayer.component.html',
  styleUrls: ['./research-displayer.component.scss']
})
export class ResearchDisplayerComponent {
  @Input()
  dynamicBuildings!: GarrisonBuilding[];

  @Input()
  dynamicResearches!: GarrisonResearch[];

  @Input()
  dynamicUnits!: GarrisonUnit[];

  @Output()
  launchResearch = new EventEmitter<IResearchCreate>();

  now = new Date();

  @Input()
  resources!: GarrisonResources;
  
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

  onResearchLaunching(payload: IResearchCreate) {
    this.launchResearch.emit(payload);
  }
}