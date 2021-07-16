import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedModule } from '../../components/shared.module';
import { UnitOverviewComponent } from './unit-overview.component';

@NgModule({
  declarations: [
    UnitOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class UnitOverviewModule {}