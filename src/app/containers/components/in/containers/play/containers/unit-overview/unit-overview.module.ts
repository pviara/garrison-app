import { CommonModule } from '@angular/common';
import { ComputeTotalAvailableUnitsPipe } from '../../pipes/dynamic/compute-total-available-units.pipe';
import { ComputeTotalUnvailableUnitsPipe } from '../../pipes/dynamic/compute-total-unavailable-units.pipe';
import { GarrisonService } from '../../../../services/dynamic/garrison.service';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';
import { UnitDisplayerComponent } from './components/unit-displayer/unit-displayer.component';
import { UnitInstanceComponent } from './components/unit-instance/unit-instance.component';
import { UnitInstanceGuard } from './components/unit-instance/unit-instance.guard';
import { UnitOverviewComponent } from './unit-overview.component';
import { UnitStateComponent } from './components/unit-state/unit-state.component';

@NgModule({
  declarations: [
    ComputeTotalAvailableUnitsPipe,
    ComputeTotalUnvailableUnitsPipe,
    UnitDisplayerComponent,
    UnitInstanceComponent,
    UnitOverviewComponent,
    UnitStateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    ComputeTotalUnvailableUnitsPipe,
    UnitInstanceGuard,
    GarrisonService
  ]
})
export class UnitOverviewModule {}