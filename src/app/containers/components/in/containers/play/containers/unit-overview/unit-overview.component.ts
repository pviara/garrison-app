import { ActivatedRoute } from '@angular/router';
import {
  Component,
  Input,
  OnInit
} from "@angular/core";
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IGarrison } from "src/models/dynamic/IGarrison";
import { IUnit } from 'src/models/static/IUnit';

@Component({
  selector: 'garrison-in-play-unit-overview',
  templateUrl: './unit-overview.component.html',
  styleUrls: ['./unit-overview.component.scss']
})
export class UnitOverviewComponent implements OnInit {
  units!: IUnit[];
  
  character!: ICharacter;
  
  @Input()
  garrison!: IGarrison;

  constructor(private _route: ActivatedRoute) {}
  
  ngOnInit() {
    this.units = this._route.snapshot.data.units;
    this.character = this._route.snapshot.data.character;
  }
}