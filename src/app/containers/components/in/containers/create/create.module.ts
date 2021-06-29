import {
  CharacterComponent as CreateCharacterComponent
} from './components/character/character.component';
import { CreateComponent } from './create.component';
import { 
  CharacterGuard as CreateCharacterGuard
} from './components/character/character.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CreateCharacterComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    CreateCharacterGuard
  ]
})
export class CreateModule {}