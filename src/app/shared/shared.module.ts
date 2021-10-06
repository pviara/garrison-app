import { AuthService } from './services/auth.service';
import { CharacterService } from './services/character.service';
import { FetchAppropriateWordPipe } from './pipes/static/fetch-appropriate-word.pipe';
import { FilterZonesByFactionPipe } from './pipes/static/filter-zones-by-faction.pipe';
import { InfoblockComponent } from './components/infoblock/infoblock.component';
import { LocalStorageService } from './services/local-storage.service';
import { NgModule } from '@angular/core';
import { NoiseMakerDirective } from './directives/noisemaker.directive';
import { SoundService } from './services/sound.service';
import { StringCapitalizePipe } from './pipes/global/string_capitalize.pipe';

@NgModule({
  declarations: [
    FetchAppropriateWordPipe,
    FilterZonesByFactionPipe,
    InfoblockComponent,
    NoiseMakerDirective,
    StringCapitalizePipe
  ],
  imports: [],
  exports: [
    FetchAppropriateWordPipe,
    FilterZonesByFactionPipe,
    InfoblockComponent,
    NoiseMakerDirective,
    StringCapitalizePipe
  ],
  providers: [
    AuthService,
    CharacterService,
    LocalStorageService,
    SoundService
  ]
})
export class SharedModule {}
