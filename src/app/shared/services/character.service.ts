import { HttpClient } from '@angular/common/http';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { Injectable } from '@angular/core';

@Injectable()
export class CharacterService {
  constructor(/* private client: HttpClient */) {}

  /**
   * Get registered character from local storage.
   * @returns The registered character.
   */
  getCurrentCharacter() {
    const characterFromStorage = localStorage.getItem('character');
    if (!characterFromStorage) return;

    return JSON.parse(characterFromStorage) as ICharacter;
  }
}