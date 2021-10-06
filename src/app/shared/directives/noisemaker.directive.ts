import { Directive, HostListener } from '@angular/core';
import { SoundService } from '../services/sound.service';

@Directive({
  selector: '[noisemaker]'
})
export class NoiseMakerDirective {
  @HostListener('click')
  onClick() {
    this._soundService.play('click');
  }

  constructor(private _soundService: SoundService) {}
}