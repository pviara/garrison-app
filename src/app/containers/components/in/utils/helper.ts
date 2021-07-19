import { ICharacter } from 'src/models/dynamic/ICharacter';

export class StaticHelper {
  static extractCharacterOutOf(characters: ICharacter[]) {
    return characters[0];
  }

  static isObjectEmpty(obj: object) {
    return Object.keys(obj).length === 0;
  }
}