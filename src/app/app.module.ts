import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IndexModule } from './containers/index.module';
import { IndexGuard } from './containers/index.guard';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    IndexModule,
    SharedModule
  ],
  providers: [
    IndexGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
