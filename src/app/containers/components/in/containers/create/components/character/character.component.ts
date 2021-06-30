import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { SoundService } from 'src/app/shared/services/sound.service';

@Component({
  selector: 'garrison-in-create-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  characterCreation!: FormGroup;
  
  @ViewChild('submitButton')
  submitButton!: ElementRef;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _renderer: Renderer2,
    private _soundService: SoundService
  ) {}

  ngOnInit() {
    this.characterCreation = this
      ._formBuilder
      .group({
        faction: this
          ._formBuilder
          .control(null, Validators.required),
        name: this
          ._formBuilder
          .control('', Validators.required)
      });
  }

  onCharacterCreation(characterCreation: FormGroup) {
    this._soundService.play('click');
    if (characterCreation.invalid) return;

    this._renderer.setAttribute(
      this.submitButton.nativeElement,
      'disabled',
      'true'
    );

    // TODO 🛠 call character service
    console.log(characterCreation.value);
  }

  selectFaction(faction: 'alliance' | 'horde') {
    if (faction === 'alliance') {
      this._soundService.play('create_human');
    } else {
      this._soundService.play('create_orc');
    }
    this.characterCreation.get('faction')?.setValue(faction);
  }
}