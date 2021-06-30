import { AuthService } from './services/auth.service';
import { CharacterService } from './services/character.service';
import { FetchAppropriateWordPipe } from './pipes/static/fetch-appropriate-word.pipe';
import { FilterZonesByFactionPipe } from './pipes/static/filter-zones-by-faction.pipe';
import { InfoblockComponent } from './components/infoblock/infoblock.component';
import { NgModule } from '@angular/core';
import { SoundService } from './services/sound.service';
import { StringCapitalizePipe } from './pipes/global/string_capitalize.pipe';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    FetchAppropriateWordPipe,
    FilterZonesByFactionPipe,
    InfoblockComponent,
    StringCapitalizePipe
  ],
  imports: [],
  exports: [
    FetchAppropriateWordPipe,
    FilterZonesByFactionPipe,
    InfoblockComponent,
    StringCapitalizePipe
  ],
  providers: [
    AuthService,
    CharacterService,
    SoundService,
    UserService
  ]
})
export class SharedModule {}
