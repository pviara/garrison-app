import { CharacterService } from './services/character.service';
import { InfoblockComponent } from './components/infoblock/infoblock.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    InfoblockComponent
  ],
  imports: [],
  exports: [
    InfoblockComponent
  ],
  providers: [
    CharacterService
  ]
})
export class SharedModule {}
