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
  selector: 'garrison-in-play-unit-instance',
  templateUrl: './unit-instance.component.html',
  styleUrls: ['./unit-instance.component.scss']
})
export class UnitInstanceComponent implements OnInit {
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