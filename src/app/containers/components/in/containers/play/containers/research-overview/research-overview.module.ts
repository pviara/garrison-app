import { CommonModule } from '@angular/common';
import { GarrisonService } from '../../../../services/dynamic/garrison.service';
import { NgModule } from "@angular/core";
import { ResearchInstanceComponent } from './components/research-instance/research-instance.component';
import { ResearchInstanceGuard } from './components/research-instance/research-instance.guard';
import { ResearchOverviewComponent } from './research-overview.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [
    ResearchInstanceComponent,
    ResearchOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    ResearchInstanceGuard,
    GarrisonService
  ]
})
export class ResearchOverviewModule {}