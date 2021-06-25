import { CharacterService } from './services/character.service';
import { InfoblockComponent } from './components/infoblock/infoblock.component';
import { NgModule } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    InfoblockComponent
  ],
  imports: [],
  exports: [
    InfoblockComponent
  ],
  providers: [
    AuthService,
    CharacterService,
    UserService
  ]
})
export class SharedModule {}
