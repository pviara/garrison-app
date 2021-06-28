import { Component } from '@angular/core';
import { SoundService } from 'src/app/shared/services/sound.service';

@Component({
  selector: 'garrison-public-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [
    SoundService
  ]
})
export class LandingComponent {
  constructor(private _soundService: SoundService) {}

  playClick() {
    this._soundService.play('click');
  }
}
