import { BuildingInstanceComponent } from './building-instance.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [
    BuildingInstanceComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class BuildingInstanceModule {}