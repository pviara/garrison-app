import { BuildingInstanceModule } from './containers/building-instance.module';
import { CommonModule } from '@angular/common';
import { ComputeResourceValue } from './pipes/resource/compute-resource-value.pipe';
import { FactionHoverBackgroundDirective } from './directives/faction-hover-background.directive';
import { GlobalResourceDisplayerComponent } from './components/global-resource-displayer/global-resource-displayer.component';
import { NgModule } from '@angular/core';
import { PlayComponent } from './play.component';
import { ResourceDisplayer } from './components/resource-displayer/resource-displayer.component';
import { RouterModule } from '@angular/router';
import { SmoothTextChangerDirective } from './directives/smooth-text-changer.directive';

@NgModule({
  declarations: [
    ComputeResourceValue,
    FactionHoverBackgroundDirective,
    GlobalResourceDisplayerComponent,
    PlayComponent,
    ResourceDisplayer,
    SmoothTextChangerDirective
  ],
  imports: [
    BuildingInstanceModule,
    CommonModule,
    RouterModule
  ]
})
export class PlayModule {}