import { ICharacter } from 'src/models/dynamic/ICharacter';

export class StaticHelper {
  static extractCharacterOutOf(characters: ICharacter[]) {
    return characters[0];
  }

  static isObjectEmpty(obj: object) {
    return Object.keys(obj).length === 0;
  }

  static hasPast(date: Date | string, now?: Date) {
    if (!now) now = new Date();
    
    if (typeof date === 'string') {
      date = new Date(date);
    }

    return date.getTime() <= now.getTime();
  }
}