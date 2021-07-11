import { NgModule } from '@angular/core';
import { ResourceDisplayer } from './components/resource-displayer/resource-displayer.component';
import { PlayComponent } from './play.component';

@NgModule({
  declarations: [
    PlayComponent,
    ResourceDisplayer
  ],
  imports: [],
  providers: []
})
export class PlayModule {}