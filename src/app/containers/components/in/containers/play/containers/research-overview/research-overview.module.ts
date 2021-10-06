import { CastToInstantiableResearchPipe } from '../../pipes/static/cast-to-instantiable-research.pipe';
import { CommonModule } from '@angular/common';
import { ComputeAvailableResearchWorkforcePipe } from '../../pipes/dynamic/compute-available-research-workforce.pipe';
import { ComputeLaunchingDurationPipe } from '../../pipes/dynamic/compute-launching-duration.pipe';
import { ComputeResearchCurrentLevelPipe } from '../../pipes/dynamic/compute-research-current-level.pipe';
import { GarrisonService } from '../../../../services/dynamic/garrison.service';
import { NgModule } from "@angular/core";
import { ResearchDisplayerComponent } from './components/research-displayer/research-displayer.component';
import { ResearchInstanceComponent } from './components/research-instance/research-instance.component';
import { ResearchInstanceGuard } from './components/research-instance/research-instance.guard';
import { ResearchLaunchingComponent } from './components/research-launching/research-launching.component';
import { ResearchOverviewComponent } from './research-overview.component';
import { ResearchStateComponent } from './components/research-state/research-state.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule as GlobalSharedModule } from '../../../../../../../shared/shared.module';
import { SharedModule as PlaySharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [
    CastToInstantiableResearchPipe,
    ComputeAvailableResearchWorkforcePipe,
    ComputeLaunchingDurationPipe,
    ComputeResearchCurrentLevelPipe,
    ResearchDisplayerComponent,
    ResearchInstanceComponent,
    ResearchLaunchingComponent,
    ResearchOverviewComponent,
    ResearchStateComponent
  ],
  imports: [
    CommonModule,
    GlobalSharedModule,
    ReactiveFormsModule,
    RouterModule,
    PlaySharedModule
  ],
  providers: [
    GarrisonService,
    ResearchInstanceGuard
  ]
})
export class ResearchOverviewModule {}