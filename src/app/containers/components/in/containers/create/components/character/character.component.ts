import {
  Component,
  OnInit
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
  
  constructor(
    private _formBuilder: FormBuilder,
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

  onCharacterCreation(form: FormGroup) {
    console.log(form);
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