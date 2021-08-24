import { Injectable } from '@angular/core';

@Injectable()
export class SoundService {
  private _assetsPath = '../../../assets/sounds';

  private _sounds!: {
    name: string;
    path: string;
  }[];

  constructor() {
    this._sounds = [{
      name: 'building_finished',
      path: 'building_finished.ogg'
    },
    {
      name: 'click',
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
    },
    {
      name: 'peasant_yes_1',
      path: 'peasant_yes_1.ogg'
    },
    {
      name: 'peasant_yes_2',
      path: 'peasant_yes_2.ogg'
    },
    {
      name: 'peasant_yes_3',
      path: 'peasant_yes_3.ogg'
    },
    {
      name: 'peon_yes_1',
      path: 'peon_yes_1.ogg'
    },
    {
      name: 'peon_yes_2',
      path: 'peon_yes_2.ogg'
    },
    {
      name: 'peon_yes_3',
      path: 'peon_yes_3.ogg'
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

  playRandomly(sound: string, min: number, max: number) {
    const random = Math.floor(Math.random() * (max - min) + min);
    sound = `${sound}_${random}`;
    
    this.play(sound);
  }
}
