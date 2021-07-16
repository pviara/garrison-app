import { BuildingOverviewComponent } from './building-overview.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedModule } from '../../components/shared.module';
import { GarrisonService } from '../../../../services/dynamic/garrison.service';

@NgModule({
  declarations: [
    BuildingOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    GarrisonService
  ]
})
export class BuildingInstanceModule {}