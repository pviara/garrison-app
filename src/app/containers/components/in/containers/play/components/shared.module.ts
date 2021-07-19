import { CastToInstantiablePipe } from '../pipes/static/cast-to-building.pipe';
import { CommonModule } from '@angular/common';
import { ComputeInstantiationRequirementsPipe } from '../pipes/dynamic/compute-instantiation-requirements.pipe';
import { ComputeImagePathPipe } from '../pipes/static/compute-image-path.pipe';
import { ComputeResourceValuePipe } from '../pipes/resource/compute-resource-value.pipe';
import { ComputeTotalAvailableBuildingsPipe } from '../pipes/dynamic/compute-total-available-buildings.pipe';
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
import { ComputeTotalUnavailableBuildingsPipe } from '../pipes/dynamic/compute-total-unavailable-buildings.pipe';

@NgModule({
  declarations: [
    CastToInstantiablePipe,
    ComputeInstantiationRequirementsPipe,
    ComputeImagePathPipe,
    ComputeResourceValuePipe,
    ComputeTotalAvailableBuildingsPipe,
    ComputeTotalUnavailableBuildingsPipe,
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
    CastToInstantiablePipe,
    ComputeInstantiationRequirementsPipe,
    ComputeImagePathPipe,
    ComputeResourceValuePipe,
    ComputeTotalAvailableBuildingsPipe,
    ComputeTotalUnavailableBuildingsPipe,
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