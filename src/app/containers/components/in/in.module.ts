import { CharacterResolver } from './resolvers/dynamic/character.resolver';
import { CommonModule } from '@angular/common';
import { CreateModule } from './containers/create/create.module';
import { FactionResolver } from './resolvers/static/faction.resolver';
import { FactionService } from './services/static/faction.service';
import { GarrisonResolver } from './resolvers/dynamic/garrison.resolver';
import { GarrisonService } from './services/dynamic/garrison.service';
import { InComponent } from "./in.component";
import { InGuard } from "./in.guard";
import { LandingComponent } from "./components/landing.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";

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
    FactionResolver,
    FactionService,
    GarrisonResolver,
    GarrisonService,
    InGuard
  ]
})
export class InModule {}
