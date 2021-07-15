import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedModule } from '../../components/shared.module';
import { UnitInstanceComponent } from './unit-instance.component';

@NgModule({
  declarations: [
    UnitInstanceComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class UnitInstanceModule {}