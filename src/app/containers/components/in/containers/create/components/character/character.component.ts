
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

    const { faction } = characterCreation.value;
    const { name } = characterCreation.value;
    const userFromStorage = this._authService
      .getCurrentUserFromStorage();

    const payload: ICharacterCreate = {
      userId: userFromStorage?._id as string,
      name,
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
        
        this._soundService.play('click');
        this._soundService.play('create');
      });
  }

  selectFaction(faction: string) {
    this._soundService.play('click');
    if (faction === 'alliance') {
      this._soundService.play('create_human');
    } else {
      this._soundService.play('create_orc');
    }
    this.characterCreation.get('faction')?.setValue(faction);
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
}