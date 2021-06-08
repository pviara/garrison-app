import { AuthModule } from './components/containers/auth.module';
import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PublicComponent
  ],
  imports: [
    AuthModule,
    RouterModule
  ],
  providers: []
})
export class PublicModule {}
