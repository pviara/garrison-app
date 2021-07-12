import { Component } from '@angular/core';
import { SoundService } from 'src/app/shared/services/sound.service';

@Component({
  selector: 'garrison-in-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {
  constructor(private _soundService: SoundService) {}

  playClick() {
    this._soundService.play('click');
  }
}