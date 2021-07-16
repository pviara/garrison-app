import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { BuildingOverviewComponent } from './containers/building-overview/building-overview.component';

@Component({
  selector: 'garrison-in-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {
  private _garrison!: IGarrison;
  
  constructor(private _route: ActivatedRoute) {}

  onOutletLoaded(component: Component) {
    if (!(component instanceof BuildingOverviewComponent)) {
      return;
    }
    
    this._garrison = this._route.snapshot.data.garrison;
    component.garrison = this._garrison;
  }
}