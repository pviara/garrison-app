import {
  CanActivate,
  Router
} from '@angular/router';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CharacterGuard implements CanActivate {
  constructor(
    private _characterService: CharacterService,
    private _router: Router
  ) {}

  canActivate() {
    const characterFromStorage = this._characterService
      .getCurrentCharacterFromStorage();
    if (characterFromStorage) {
      this._router.navigate(['/in/create/garrison']);
      return false;
    }
    return true;
  }
}
