import { Howl, Howler } from 'howler';
import { Injectable } from '@angular/core';

@Injectable()
export class SoundService {
  private _assetsPath = '../../../assets/sounds';

  private _sounds!: {
    name: string;
    path: string;
  }[];

  constructor() {
    this._sounds = [{ name: 'click',
      path: 'global_button-click.ogg'
    },
    {
      name: 'error',
      path: 'global_error.ogg'
    },
    {
      name: 'greetings',
      path: 'global_greetings.ogg'
    }];
  }

  play(sound: string) {
    const fromAssets = this._sounds.find(s => s.name === sound);
    if (!fromAssets) {
      throw new Error(`No sound was found with the name '${sound}'.`);
    }
    
    const howl = new Howl({
      src: [`${this._assetsPath}/${fromAssets.path}`]
    });

    howl.volume(0.3);
    howl.play();
  }
}
