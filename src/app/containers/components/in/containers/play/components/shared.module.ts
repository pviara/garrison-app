import { CommonModule } from '@angular/common';
import { ComputeImagePathPipe } from '../pipes/static/compute-image-path.pipe';
import { ComputeResourceValuePipe } from '../pipes/resource/compute-resource-value.pipe';
import { EntityNavigatorComponent } from './entity-navigator/entity-navigator.component';
import { FactionHoverBackgroundDirective } from '../directives/faction-hover-background.directive';
import { FetchByCodePipe } from '../pipes/static/fetch-by-code.pipe';
import { FillWithUnusableSlotsPipe } from '../pipes/static/fill-with-unusable-slots.pipe';
import { GlobalResourceDisplayerComponent } from './global-resource-displayer/global-resource-displayer.component';
import { NgModule } from '@angular/core';
import { ResourceDisplayerComponent } from './resource-displayer/resource-displayer.component';
import { RouterModule } from '@angular/router';
import { SmoothTextChangerDirective } from '../directives/smooth-text-changer.directive';

@NgModule({
  declarations: [
    ComputeImagePathPipe,
    ComputeResourceValuePipe,
    EntityNavigatorComponent,
    FactionHoverBackgroundDirective,
    FetchByCodePipe,
    FillWithUnusableSlotsPipe,
    GlobalResourceDisplayerComponent,
    ResourceDisplayerComponent,
    SmoothTextChangerDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ComputeImagePathPipe,
    ComputeResourceValuePipe,
    EntityNavigatorComponent,
    FactionHoverBackgroundDirective,
    FetchByCodePipe,
    FillWithUnusableSlotsPipe,
    GlobalResourceDisplayerComponent,
    ResourceDisplayerComponent,
    SmoothTextChangerDirective
  ]
})
export class SharedModule {}