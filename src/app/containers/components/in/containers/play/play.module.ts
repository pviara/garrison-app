import { NgModule } from '@angular/core';
import { PlayComponent } from './play.component';
import { ResourceDisplayer } from './components/resource-displayer/resource-displayer.component';
import { SmoothTextChangerDirective } from './directives/smooth-text-changer.directive';

@NgModule({
  declarations: [
    PlayComponent,
    ResourceDisplayer,
    SmoothTextChangerDirective
  ],
  imports: [],
  providers: []
})
export class PlayModule {}