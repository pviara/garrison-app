import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { BuildingInstanceComponent } from './containers/building-instance.component';

@Component({
  selector: 'garrison-in-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {
  private _garrison!: IGarrison;
  
  constructor(private _route: ActivatedRoute) {}

  onOutletLoaded(component: Component) {
    if (!(component instanceof BuildingInstanceComponent)) {
      return;
    }
    
    this._garrison = this._route.snapshot.data.garrison;
    component.garrison = this._garrison;
  }
}