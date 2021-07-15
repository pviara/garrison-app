import { BuildingInstanceModule } from './containers/building-instance/building-instance.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayComponent } from './play.component';
import { ResearchInstanceModule } from './containers/research-instance/research-instance.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './components/shared.module';
import { UnitInstanceModule } from './containers/unit-instance/unit-instance.module';

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