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
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { SoundService } from 'src/app/shared/services/sound.service';

@Component({
  selector: 'garrison-in-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  character!: ICharacter;
  garrison!: IGarrison;
  user!: IAuthenticatedUser;
  
  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _soundService: SoundService
  ) {}

  ngOnInit() {
    const userFromStorage = this._authService.getCurrentUserFromStorage();
    if (!userFromStorage) return;

    this.user = userFromStorage;
  }

  playClickAndRedirect() {
    this._router.navigate(['./create/character'], {
      relativeTo: this._route
    });
    this._soundService.play('click');
    this._soundService.play('create');
  }
}