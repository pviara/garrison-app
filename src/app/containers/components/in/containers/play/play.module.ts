import { BuildingInstanceModule } from './containers/building-overview/building-overview.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayComponent } from './play.component';
import { ResearchInstanceModule } from './containers/research-overview/research-overview.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './components/shared.module';
import { UnitInstanceModule } from './containers/unit-overview/unit-overview.module';

@NgModule({
  declarations: [
    PlayComponent,
  ],
  imports: [
    BuildingInstanceModule,
    CommonModule,
    RouterModule,
    ResearchInstanceModule,
    SharedModule,
    UnitInstanceModule
  ]
})
export class PlayModule {}