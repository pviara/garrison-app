import { AuthService } from "src/app/shared/services/auth.service";
import {
  Component,
  OnInit
} from "@angular/core";
import { IAuthenticatedUser } from "src/models/dynamic/IUser";

@Component({
  selector: 'garrison-in-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  user!: IAuthenticatedUser;
  
  constructor(
    private _authService: AuthService
  ) {}

  ngOnInit() {
    const userFromStorage = this._authService.getCurrentUserFromStorage();
    if (!userFromStorage) return;

    this.user = userFromStorage;
  }
}