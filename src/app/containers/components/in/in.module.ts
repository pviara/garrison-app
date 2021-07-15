import { BannerResolver } from './resolvers/static/banner.resolver';
import { BannerService } from './services/static/banner.service';
import { BuildingResolver } from './resolvers/static/building.resolver';
import { BuildingService } from './services/static/building.service';
import { CharacterResolver } from './resolvers/dynamic/character.resolver';
import { CommonModule } from '@angular/common';
import { CreateModule } from './containers/create/create.module';
import { FactionResolver } from './resolvers/static/faction.resolver';
import { FactionService } from './services/static/faction.service';
import { GarrisonIdResolver } from './resolvers/dynamic/garrison-id.resolver';
import { GarrisonResolver } from './resolvers/dynamic/garrison.resolver';
import { GarrisonService } from './services/dynamic/garrison.service';
import { InComponent } from "./in.component";
import { InGuard } from "./in.guard";
import { LandingComponent } from "./components/landing.component";
import { NgModule } from "@angular/core";
import { PlayModule } from './containers/play/play.module';
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { ResearchResolver } from './resolvers/static/research.resolver';
import { ResearchService } from './services/static/research.service';
import { ZoneResolver } from './resolvers/static/zone.resolver';
import { ZoneService } from './services/static/zone.service';
import { UnitService } from './services/static/unit.service';
import { UnitResolver } from './resolvers/static/unit.resolver';

@NgModule({
  declarations: [
    InComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    CreateModule,
    PlayModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    BannerResolver,
    BannerService,
    BuildingResolver,
    BuildingService,
    CharacterResolver,
    FactionResolver,
    FactionService,
    GarrisonIdResolver,
    GarrisonResolver,
    GarrisonService,
    InGuard,
    ResearchResolver,
    ResearchService,
    UnitResolver,
    UnitService,
    ZoneResolver,
    ZoneService
  ]
})
export class InModule {}
