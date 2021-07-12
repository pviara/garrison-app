import { GarrisonService } from '../../services/dynamic/garrison.service';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable()
export class GarrisonResolver implements Resolve<Observable<IGarrison>> {
  constructor(private _garrisonService: GarrisonService) {}

  resolve(): Observable<IGarrison> {
    return this._garrisonService.getCurrentGarrison();
  }
}