import { BuildingOverviewModule } from './containers/building-overview/building-overview.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayComponent } from './play.component';
import { ResearchOverviewModule } from './containers/research-overview/research-overview.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './components/shared.module';
import { UnitOverviewModule } from './containers/unit-overview/unit-overview.module';

@NgModule({
  declarations: [
    PlayComponent,
  ],
  imports: [
    BuildingOverviewModule,
    CommonModule,
    RouterModule,
    ResearchOverviewModule,
    SharedModule,
    UnitOverviewModule
  ]
})
export class PlayModule {}