import { GlobalResourceDisplayerComponent } from './components/global-resource-displayer/global-resource-displayer.component';
import { NgModule } from '@angular/core';
import { PlayComponent } from './play.component';
import { ResourceDisplayer } from './components/resource-displayer/resource-displayer.component';
import { SmoothTextChangerDirective } from './directives/smooth-text-changer.directive';

@NgModule({
  declarations: [
    GlobalResourceDisplayerComponent,
    PlayComponent,
    ResourceDisplayer,
    SmoothTextChangerDirective
  ],
  imports: [],
  providers: []
})
export class PlayModule {}