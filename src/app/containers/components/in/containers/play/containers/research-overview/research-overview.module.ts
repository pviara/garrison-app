import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedModule } from '../../components/shared.module';
import { ResearchOverviewComponent } from './research-overview.component';

@NgModule({
  declarations: [
    ResearchOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class ResearchInstanceModule {}