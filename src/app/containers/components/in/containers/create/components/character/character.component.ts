
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { catchError } from 'rxjs/operators';
import { CharacterService } from 'src/app/shared/services/character.service';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ICharacterCreate } from 'src/models/dynamic/payloads/ICharacterCreate';
import { IFaction } from 'src/models/static/IFaction';
import { of } from 'rxjs';
import { SoundService } from 'src/app/shared/services/sound.service';

@Component({
  selector: 'garrison-in-create-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  apiError!: string;
  characterCreation!: FormGroup;
  factions!: IFaction[];
  
  @ViewChild('submitButton')
  submitButton!: ElementRef;
  
  constructor(
    private _authService: AuthService,
    private _characterService: CharacterService,
    private _formBuilder: FormBuilder,
    private _renderer: Renderer2,
    private _route: ActivatedRoute,
    private _router: Router,
    private _soundService: SoundService
  ) {}

  ngOnInit() {
    this.factions = this._route.snapshot.data.factions;
    
    this.characterCreation = this
      ._formBuilder
      .group({
        faction: this
          ._formBuilder
          .control(null, [
            Validators.required,
            this._factionValidator()
          ]),
        gender: this
          ._formBuilder
          .control(this._pickRandomGender(), Validators.required),
        name: this
          ._formBuilder
          .control('', Validators.required)
      });
  }

  onCharacterCreation(characterCreation: FormGroup) {
    if (characterCreation.invalid) return;

    this._renderer.setAttribute(
      this.submitButton.nativeElement,
      'disabled',
      'true'
    );

    const { faction } = characterCreation.value;
    const { gender } = characterCreation.value;
    const { name } = characterCreation.value;
    const userFromStorage = this._authService
      .getCurrentUserFromStorage();

    const payload: ICharacterCreate = {
      userId: userFromStorage?._id as string,
      name,
      gender,
      side: {
        faction,
        banner: faction === 'alliance'
          ? 'lordaeron'
          : 'warsong'
      }
    };

    this._characterService
      .create(payload)
      .pipe(
        catchError((err) => {
          this.apiError = err.error.message;
          this._soundService.play('error');

          this._renderer.removeAttribute(
            this.submitButton.nativeElement,
            'disabled'
          );

          return of(err);
        })
      )
      .subscribe((result: any) => {
        if (result.error) return;

        this._characterService.addCharacterToLocalStorage([result]);

        this._router.navigate(['../garrison'], {
          relativeTo: this._route
        });
      });
  }

  selectFaction(faction: string) {
    const gender = this.characterCreation.get('gender')?.value;
    if (!gender) {
      return;
    }

    if (faction === 'alliance') {
      this._soundService.play(`create_human_${gender}`);
    } else if (faction === 'horde') {
      this._soundService.play(`create_orc_${gender}`);
    }
    this.characterCreation.get('faction')?.setValue(faction);
  }

  selectGender(gender: 'male' | 'female') {
    const faction = this.characterCreation.get('faction')?.value;

    if (faction === 'alliance') {
      this._soundService.play(`create_human_${gender}`);
    } else if (faction === 'horde') {
      this._soundService.play(`create_orc_${gender}`);
    }
    
    this.characterCreation.get('gender')?.setValue(gender);
  }

  private _factionValidator() {
    return (control: AbstractControl) => {
      const isValidZone = this
        .factions
        .find(faction => faction.code === control.value);

      return isValidZone ? null : {
        invalid: { value: control.value }
      }
    }
  }

  private _pickRandomGender(): 'male' | 'female' {
    return Math.floor(Math.random() * (2 - 1 + 1)) + 1 === 1
      ? 'male'
      : 'female';
  }
}