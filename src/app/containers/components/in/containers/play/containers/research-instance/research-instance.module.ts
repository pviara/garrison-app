import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedModule } from '../../components/shared.module';
import { ResearchInstanceComponent } from './research-instance.component';

@NgModule({
  declarations: [
    ResearchInstanceComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class ResearchInstanceModule {}