import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { IBuilding } from 'src/models/static/IBuilding';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IRecord } from 'src/models/dynamic/IRecord';
import { IResearch } from 'src/models/static/IResearch';
import { IUnit } from 'src/models/static/IUnit';
import { RegisterService } from '../../../../services/dynamic/register.service';

@Component({
    selector: 'garrison-in-play-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  buildings!: IBuilding[];
  
  character!: ICharacter;
  
  garrisonId!: string;
  
  records: IRecord[] = [];

  researches!: IResearch[];

  units!: IUnit[];
  
  constructor(
    private _route: ActivatedRoute,
    private _registerService: RegisterService
  ) {}

  ngOnInit() {
    this.buildings = this._route.snapshot.data.buildings;
    this.character = this._route.snapshot.data.character;
    this.garrisonId = this._route.snapshot.data.garrisonId;
    this.records = this._route.snapshot.data.records;
    this.researches = this._route.snapshot.data.researches;
    this.units = this._route.snapshot.data.units;

    this
      ._registerService
      .recordsSubject
      .subscribe(records => {
        this.records = records || [];
      });
  }
}