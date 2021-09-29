import { CommonModule } from '@angular/common';
import { ComputeResearchCurrentLevelPipe } from '../../pipes/dynamic/compute-research-current-level.pipe';
import { GarrisonService } from '../../../../services/dynamic/garrison.service';
import { NgModule } from "@angular/core";
import { ResearchDisplayerComponent } from './components/research-displayer/research-displayer.component';
import { ResearchInstanceComponent } from './components/research-instance/research-instance.component';
import { ResearchInstanceGuard } from './components/research-instance/research-instance.guard';
import { ResearchOverviewComponent } from './research-overview.component';
import { ResearchStateComponent } from './components/research-state/research-state.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [
    ComputeResearchCurrentLevelPipe,
    ResearchDisplayerComponent,
    ResearchInstanceComponent,
    ResearchOverviewComponent,
    ResearchStateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    GarrisonService,
    ResearchInstanceGuard
  ]
})
export class ResearchOverviewModule {}