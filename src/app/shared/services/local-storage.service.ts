import { BehaviorSubject } from 'rxjs';
import { IAuthenticatedUser } from 'src/models/dynamic/IUser';
import { IBanner } from 'src/models/static/IBanner';
import { IBuilding } from 'src/models/static/IBuilding';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IFaction } from 'src/models/static/IFaction';
import { Injectable } from '@angular/core';
import { IResearch } from 'src/models/static/IResearch';
import { IUnit } from 'src/models/static/IUnit';
import { IZone } from 'src/models/static/IZone';

@Injectable()
export class LocalStorageService {
  bannersSubject = new BehaviorSubject(this.banners);
  buildingsSubject = new BehaviorSubject(this.buildings);
  characterSubject = new BehaviorSubject(this.character);
  factionsSubject = new BehaviorSubject(this.factions);
  garrisonIdSubject = new BehaviorSubject(this.garrisonId);
  researchSubject = new BehaviorSubject(this.researches);
  unitsSubject = new BehaviorSubject(this.units);
  userSubject = new BehaviorSubject(this.user);
  zonesSubject = new BehaviorSubject(this.zones);
  
  set buildings(value: IBuilding[] | undefined) {
    if (!value) return;
    const key = 'buildings';

    this.buildingsSubject.next(value);

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  set banners(value: IBanner[] | undefined) {
    if (!value) return;
    const key = 'banners';

    this.bannersSubject.next(value);

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }
  
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
  
  set researches(value: IResearch[] | undefined) {
    if (!value) return;
    const key = 'researches';

    this.researchSubject.next(value);

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  set units(value: IUnit[] | undefined) {
    if (!value) return;
    const key = 'units';

    this.unitsSubject.next(value);

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

  get banners() {
    const bannersFromStorage = this._getFromStorage('banners');
    if (!bannersFromStorage) return;

    return JSON.parse(bannersFromStorage) as IBanner[];
  }

  get buildings() {
    const buildingsFromStorage = this._getFromStorage('buildings');
    if (!buildingsFromStorage) return;

    return JSON.parse(buildingsFromStorage) as IBuilding[];
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

  get researches() {
    const researchesFromStorage = this._getFromStorage('researches');
    if (!researchesFromStorage) return;

    return JSON.parse(researchesFromStorage) as IResearch[];
  }

  get units() {
    const unitsFromStorage = this._getFromStorage('units');
    if (!unitsFromStorage) return;

    return JSON.parse(unitsFromStorage) as IUnit[];
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