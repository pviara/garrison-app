import { ActivatedRoute } from '@angular/router';
import {
  Component,
  Input,
  OnInit
} from "@angular/core";
import { IBuilding } from 'src/models/static/IBuilding';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IGarrison } from "src/models/dynamic/IGarrison";

@Component({
  selector: 'garrison-in-play-building-overview',
  templateUrl: './building-overview.component.html',
  styleUrls: ['./building-overview.component.scss']
})
export class BuildingOverviewComponent implements OnInit {
  buildings!: IBuilding[];
  
  character!: ICharacter;
  
  @Input()
  garrison!: IGarrison;

  constructor(
    // // private _garrisonService: GarrisonService,
    private _route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.buildings = this._route.snapshot.data.buildings;
    this.character = this._route.snapshot.data.character;

    // ? do we need that ?
    // // this._garrisonService
    // //     .garrisonSubject
    // //     .subscribe(garrison => console.log('in BuildingOverviewComponent', garrison));
  }
}