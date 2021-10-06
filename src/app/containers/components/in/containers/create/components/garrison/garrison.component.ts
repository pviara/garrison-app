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
import { catchError } from 'rxjs/operators';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { GarrisonService } from '../../../../services/dynamic/garrison.service';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IGarrisonCreate } from 'src/models/dynamic/payloads/IGarrisonCreate';
import { IZone } from 'src/models/static/IZone';
import { of } from 'rxjs';
import { SoundService } from 'src/app/shared/services/sound.service';
import { StaticHelper as _h } from '../../../../utils/helper';

@Component({
  selector: 'garrison-in-create-garrison',
  templateUrl: './garrison.component.html',
  styleUrls: ['./garrison.component.scss']
})
export class GarrisonComponent implements OnInit {
  apiError!: string;
  character!: ICharacter;
  garrisonCreation!: FormGroup;
  zones!: IZone[];
  
  @ViewChild('submitButton')
  submitButton!: ElementRef;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _garrisonService: GarrisonService,
    private _renderer: Renderer2,
    private _route: ActivatedRoute,
    private _router: Router,
    private _soundService: SoundService
  ) {}

  ngOnInit() {
    const {
      character,
      zones
    } = this._route.snapshot.data;

    this.character = Array.isArray(character)
      ? _h.extractCharacterOutOf(character)
      : character;

    this.zones = zones;
    
    this.garrisonCreation = this
      ._formBuilder
      .group({
        zone: this
          ._formBuilder
          .control(null, [
            Validators.required,
            this._zoneValidator()
          ]),
        name: this
          ._formBuilder
          .control('', Validators.required)
      });
  }

  onGarrisonCreation(garrisonCreation: FormGroup) {
    if (garrisonCreation.invalid) return;

    this._renderer.setAttribute(
      this.submitButton.nativeElement,
      'disabled',
      'true'
    );

    const { name } = garrisonCreation.value;
    const { zone } = garrisonCreation.value;

    const payload: IGarrisonCreate = {
      characterId: this.character._id,
      name,
      zone
    };
    
    this._garrisonService
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

        this._garrisonService.addGarrisonIdToLocalStorage(result._id);

        this._router.navigate(['/in']);
      });
  }

  selectZone(faction: string) {
    this.garrisonCreation.get('zone')?.setValue(faction);
  }

  private _zoneValidator() {
    return (control: AbstractControl) => {
      const isValidZone = this
        .zones
        .find(zone => zone.code === control.value);

      return isValidZone ? null : {
        invalid: { value: control.value }
      }
    }
  }
}