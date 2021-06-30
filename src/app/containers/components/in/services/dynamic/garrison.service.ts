import { Injectable } from '@angular/core';

@Injectable()
export class GarrisonService {
  private _endpoint = 'garrison';
  
  constructor() {}

  getCurrentGarrisonIdFromStorage() {
    const garrisonIdFromStorage = localStorage.getItem('garrisonId');
    if (!garrisonIdFromStorage) return;

    return JSON.parse(garrisonIdFromStorage) as string;
  }
}