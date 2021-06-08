import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IndexModule } from './containers/index.module';
import { CharacterService } from './services/character.service';
import { IndexGuard } from './containers/index.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,

    // custom
    IndexModule
  ],
  providers: [
    CharacterService,
    IndexGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
