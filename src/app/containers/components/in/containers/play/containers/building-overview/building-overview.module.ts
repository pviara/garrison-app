import { BuildingInstanceComponent } from './components/building-instance.component';
import { BuildingInstanceGuard } from './components/building-instance.guard';
import { BuildingOverviewComponent } from './building-overview.component';
import { CommonModule } from '@angular/common';
import { GarrisonService } from '../../../../services/dynamic/garrison.service';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [
    BuildingInstanceComponent,
    BuildingOverviewComponent
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