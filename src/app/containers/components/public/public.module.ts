import { AuthModule } from './components/containers/auth.module';
import { LandingComponent } from './components/landing.component';
import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LandingComponent,
    PublicComponent
  ],
  imports: [
    AuthModule,
    RouterModule,
    SharedModule
  ]
})
export class PublicModule {}
