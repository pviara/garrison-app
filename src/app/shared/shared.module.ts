import { AuthService } from './services/auth.service';
import { CharacterService } from './services/character.service';
import { InfoblockComponent } from './components/infoblock/infoblock.component';
import { NgModule } from '@angular/core';
import { SoundService } from './services/sound.service';
import { UserService } from './services/user.service';

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
    SoundService,
    UserService
  ]
})
export class SharedModule {}
