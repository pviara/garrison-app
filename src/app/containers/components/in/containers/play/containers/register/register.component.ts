import { ActivatedRoute } from '@angular/router';
import {
  AfterViewInit,
  Component,
  OnInit
} from '@angular/core';
import { IBuilding } from 'src/models/static/IBuilding';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IRecord } from 'src/models/dynamic/IRecord';
import { IResearch } from 'src/models/static/IResearch';
import { IUnit } from 'src/models/static/IUnit';
import { RegisterService } from '../../../../services/dynamic/register.service';
import { SoundService } from 'src/app/shared/services/sound.service';

type FilterType = 'building' | 'research' | 'unit';

@Component({
    selector: 'garrison-in-play-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit, OnInit {
  buildings!: IBuilding[];
  
  character!: ICharacter;

  filteredRecords!: IRecord[];
  
  garrisonId!: string;
  
  records: IRecord[] = [];

  researches!: IResearch[];

  units!: IUnit[];

  private _appliedFilters: FilterType[] = [];
  
  constructor(
    private _route: ActivatedRoute,
    private _registerService: RegisterService,
    private _soundService: SoundService
  ) {}

  ngAfterViewInit() {
    this._soundService.play('open_register');
  }

  ngOnInit() {
    this.buildings = this._route.snapshot.data.buildings;
    this.character = this._route.snapshot.data.character;
    this.garrisonId = this._route.snapshot.data.garrisonId;
    this.records = this._route.snapshot.data.records;
    this.filteredRecords = this.records;
    this.researches = this._route.snapshot.data.researches;
    this.units = this._route.snapshot.data.units;

    this
      ._registerService
      .recordsSubject
      .subscribe(records => {
        this.records = records || [];
        this.filteredRecords = this.records;

        if (!this.areFiltersAllRemoved()) {
          this.filteredRecords = this._applyFilter(this._appliedFilters);
        }
      });
  }

  areFiltersAllRemoved() {
    return this._appliedFilters.length === 0;
  }

  hasFilterBeenApplied(filter: FilterType) {
    return this
      ._appliedFilters
      .find(
        applied => applied === filter
      );
  }

  removeAllFilters() {
    this._appliedFilters = [];
    this.filteredRecords = this.records;
  }

  toggleFilter(filter: FilterType) {
    const existing = this.hasFilterBeenApplied(filter);
    if (!existing) {
      this._appliedFilters.push(filter);
      this.filteredRecords = this._applyFilter(this._appliedFilters);
      return;
    }

    const index = this
      ._appliedFilters
      .findIndex(
        applied => applied === filter
      );
    this._appliedFilters.splice(index, 1);
    this.filteredRecords = this._applyFilter(this._appliedFilters);

    if (this.areFiltersAllRemoved()) {
      this.filteredRecords = this.records;
    }
  }

  private _applyFilter(filters: FilterType[]) {
    const records = this.records;
    return records
      .filter(
        record => filters.find(filter => record.entity === filter)
      );
  }
}