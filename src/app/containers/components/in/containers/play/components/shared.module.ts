import { CastToBuildingPipe } from '../pipes/static/cast-to-building.pipe';
import { CommonModule } from '@angular/common';
import { ComputeConstructionRequirementsPipe } from '../pipes/dynamic/compute_construction_requirements.pipe';
import { ComputeImagePathPipe } from '../pipes/static/compute-image-path.pipe';
import { ComputeResourceValuePipe } from '../pipes/resource/compute-resource-value.pipe';
import { EntityDisplayerComponent } from './entity-displayer/entity-displayer.component';
import { EntityNavigatorComponent } from './entity-navigator/entity-navigator.component';
import { EntityRequirementsComponent } from './entity-requirements/entity-requirements.component';
import { FactionHoverBackgroundDirective } from '../directives/faction-hover-background.directive';
import { FetchByCodePipe } from '../pipes/static/fetch-by-code.pipe';
import { FillWithUnusableSlotsPipe } from '../pipes/static/fill-with-unusable-slots.pipe';
import { GlobalResourceDisplayerComponent } from './global-resource-displayer/global-resource-displayer.component';
import { NgModule } from '@angular/core';
import { ResourceDisplayerComponent } from './resource-displayer/resource-displayer.component';
import { RouterModule } from '@angular/router';
import { SharedModule as GlobalSharedModule } from 'src/app/shared/shared.module';
import { SmoothTextChangerDirective } from '../directives/smooth-text-changer.directive';

@NgModule({
  declarations: [
    CastToBuildingPipe,
    ComputeConstructionRequirementsPipe,
    ComputeImagePathPipe,
    ComputeResourceValuePipe,
    EntityDisplayerComponent,
    EntityNavigatorComponent,
    EntityRequirementsComponent,
    FactionHoverBackgroundDirective,
    FetchByCodePipe,
    FillWithUnusableSlotsPipe,
    GlobalResourceDisplayerComponent,
    ResourceDisplayerComponent,
    SmoothTextChangerDirective
  ],
  imports: [
    CommonModule,
    GlobalSharedModule,
    RouterModule
  ],
  exports: [
    CastToBuildingPipe,
    ComputeConstructionRequirementsPipe,
    ComputeImagePathPipe,
    ComputeResourceValuePipe,
    EntityDisplayerComponent,
    EntityNavigatorComponent,
    EntityRequirementsComponent,
    FactionHoverBackgroundDirective,
    FetchByCodePipe,
    FillWithUnusableSlotsPipe,
    GlobalResourceDisplayerComponent,
    ResourceDisplayerComponent,
    SmoothTextChangerDirective
  ]
})
export class SharedModule {}