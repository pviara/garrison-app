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
      name: 'create',
      path: 'create_passed.ogg'
    },
    {
      name: 'create_human',
      path: 'create_human.ogg'
    },
    {
      name: 'create_orc',
      path: 'create_orc.ogg'
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

    const audio = new Audio(`${this._assetsPath}/${fromAssets.path}`);
    audio.volume = 0.3;
    audio.play();
  }
}
