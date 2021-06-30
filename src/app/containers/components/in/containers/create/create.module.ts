import {
  CharacterComponent as CreateCharacterComponent
} from './components/character/character.component';
import { CreateComponent } from './create.component';
import { 
  CharacterGuard as CreateCharacterGuard
} from './components/character/character.guard';
import {
  GarrisonComponent as CreateGarrisonComponent
} from './components/garrison/garrison.component';
import {
  GarrisonGuard as CreateGarrisonGuard
} from './components/garrison/garrison.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CreateCharacterComponent,
    CreateGarrisonComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    CreateCharacterGuard,
    CreateGarrisonGuard
  ]
})
export class CreateModule {}