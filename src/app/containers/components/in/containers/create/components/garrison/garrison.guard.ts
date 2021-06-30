import {
  CanActivate,
  Router
} from '@angular/router';
import { CharacterService } from 'src/app/shared/services/character.service';
import { GarrisonService } from '../../../../services/dynamic/garrison.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GarrisonGuard implements CanActivate {
  constructor(
    private _characterService: CharacterService,
    private _garrisonService: GarrisonService,
    private _router: Router
  ) {}

  canActivate() {
    const garrisonIdFromStorage = this._garrisonService
      .getCurrentGarrisonIdFromStorage();
    if (garrisonIdFromStorage) {
      this._router.navigate(['/in']);
      return false;
    }

    const characterFromStorage = this._characterService
      .getCurrentCharacterFromStorage();
    if (!characterFromStorage) {
      this._router.navigate(['/in/create/character']);
      return false;
    }
    return true;
  }
}
