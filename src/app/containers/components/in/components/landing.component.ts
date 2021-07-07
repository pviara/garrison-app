import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { AuthService } from "src/app/shared/services/auth.service";
import {
  Component,
  OnInit
} from "@angular/core";
import { IAuthenticatedUser } from "src/models/dynamic/IUser";
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { SoundService } from 'src/app/shared/services/sound.service';
import { StaticHelper as _h } from '../utils/helper';

@Component({
  selector: 'garrison-in-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  character!: ICharacter;
  garrisonId!: string;
  user!: IAuthenticatedUser;
  
  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _soundService: SoundService
  ) {}

  ngOnInit() {
    const {
      character,
      garrisonId
    } = this._route.snapshot.data;

    this.character = Array.isArray(character)
      ? _h.extractCharacterOutOf(character)
      : character;

    this.garrisonId = garrisonId;
    
    const userFromStorage = this._authService.getCurrentUserFromStorage();
    if (!userFromStorage) return;

    this.user = userFromStorage;
  }

  redirectTo(path: string) {
    this._router.navigate([path], {
      relativeTo: this._route
    });
    this._soundService.play('click');
    this._soundService.play('create');
  }
}