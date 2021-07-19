import { BuildingDisplayerComponent } from './components/building-displayer/building-displayer.component';
import { BuildingInstanceComponent } from './components/building-instance/building-instance.component';
import { BuildingInstanceGuard } from './components/building-instance/building-instance.guard';
import { BuildingOverviewComponent } from './building-overview.component';
import { BuildingStateComponent } from './components/building-state/building-state.component';
import { CommonModule } from '@angular/common';
import { GarrisonService } from '../../../../services/dynamic/garrison.service';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [
    BuildingDisplayerComponent,
    BuildingInstanceComponent,
    BuildingOverviewComponent,
    BuildingStateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    BuildingInstanceGuard,
    GarrisonService
  ]
})
export class BuildingOverviewModule {}