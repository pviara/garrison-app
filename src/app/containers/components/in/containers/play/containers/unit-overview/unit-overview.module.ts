import { CommonModule } from '@angular/common';
import { GarrisonService } from '../../../../services/dynamic/garrison.service';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';
import { UnitInstanceComponent } from './components/unit-instance/unit-instance.component';
import { UnitInstanceGuard } from './components/unit-instance/unit-instance.guard';
import { UnitOverviewComponent } from './unit-overview.component';

@NgModule({
  declarations: [
    UnitInstanceComponent,
    UnitOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    UnitInstanceGuard,
    GarrisonService
  ]
})
export class UnitOverviewModule {}