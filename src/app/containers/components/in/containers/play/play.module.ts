import { ComputeResourceValue } from './pipes/resource/compute-resource-value.pipe';
import { GarrisonResolver } from '../../resolvers/dynamic/garrison.resolver';
import { GlobalResourceDisplayerComponent } from './components/global-resource-displayer/global-resource-displayer.component';
import { NgModule } from '@angular/core';
import { PlayComponent } from './play.component';
import { ResourceDisplayer } from './components/resource-displayer/resource-displayer.component';
import { SmoothTextChangerDirective } from './directives/smooth-text-changer.directive';

@NgModule({
  declarations: [
    ComputeResourceValue,
    GlobalResourceDisplayerComponent,
    PlayComponent,
    ResourceDisplayer,
    SmoothTextChangerDirective
  ],
  imports: []
})
export class PlayModule {}