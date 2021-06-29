import { CharacterResolver } from './resolvers/dynamic/character.resolver';
import { GarrisonResolver } from './resolvers/dynamic/garrison.resolver';
import { GarrisonService } from './services/garrison.service';
import { InComponent } from "./in.component";
import { InGuard } from "./in.guard";
import { LandingComponent } from "./components/landing.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { CreateModule } from './containers/create/create.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    InComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    CreateModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    CharacterResolver,
    GarrisonResolver,
    GarrisonService,
    InGuard
  ]
})
export class InModule {}
