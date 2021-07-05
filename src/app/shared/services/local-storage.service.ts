import { BehaviorSubject } from 'rxjs';
import { IAuthenticatedUser } from 'src/models/dynamic/IUser';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IFaction } from 'src/models/static/IFaction';
import { Injectable } from '@angular/core';
import { IZone } from 'src/models/static/IZone';

@Injectable()
export class LocalStorageService {
  characterSubject = new BehaviorSubject(this.character);
  factionsSubject = new BehaviorSubject(this.factions);
  garrisonIdSubject = new BehaviorSubject(this.garrisonId);
  userSubject = new BehaviorSubject(this.user);
  zonesSubject = new BehaviorSubject(this.zones);
  
  set character(value: ICharacter | undefined) {
    if (!value) return;
    const key = 'character';

    this.characterSubject.next(value);

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  set factions(value: IFaction[] | undefined) {
    if (!value) return;
    const key = 'factions';

    this.factionsSubject.next(value);

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));

  }
  
  set garrisonId(value: string | undefined) {
    if (!value) return;
    const key = 'garrisonId';

    this.garrisonIdSubject.next(value);

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  set user(value: IAuthenticatedUser | undefined) {
    if (!value) return;
    const key = 'user';

    this.userSubject.next(value);

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  set zones(value: IZone[] | undefined) {
    if (!value) return;
    const key = 'zones';

    this.zonesSubject.next(value);

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  get character() {
    const characterFromStorage = this._getFromStorage('character');
    if (!characterFromStorage) return;

    return JSON.parse(characterFromStorage) as ICharacter;
  }

  get factions() {
    const factionsFromStorage = this._getFromStorage('factions');
    if (!factionsFromStorage) return;

    return JSON.parse(factionsFromStorage) as IFaction[];
  }

  get garrisonId() {
    const garrisonIdFromStorage = this._getFromStorage('garrisonId');
    if (!garrisonIdFromStorage) return;

    return JSON.parse(garrisonIdFromStorage) as string;
  }

  get user() {
    const userFromStorage = this._getFromStorage('user');
    if (!userFromStorage) return;

    return JSON.parse(userFromStorage) as IAuthenticatedUser;
  }

  get zones() {
    const zonesFromStorage = this._getFromStorage('zones');
    if (!zonesFromStorage) return;

    return JSON.parse(zonesFromStorage) as IZone[];
  }

  private _getFromStorage(key: string) {
    return localStorage.getItem(key);
  }
}