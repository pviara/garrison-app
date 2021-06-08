import { AuthModule } from './components/public/components/containers/auth.module';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { IndexComponent } from './index.component';
import { PublicGuard } from './components/public/public.guard';
import { PublicModule } from './components/public/public.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    AuthModule,
    PublicModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    PublicGuard
  ]
})
export class IndexModule {}
