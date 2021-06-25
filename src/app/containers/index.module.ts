import { AuthModule } from './components/public/components/containers/auth.module';
import { AuthService } from './services/auth.service';
import { InModule } from './components/in/in.module';
import { NgModule } from '@angular/core';
import { PublicGuard } from './components/public/public.guard';
import { PublicModule } from './components/public/public.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InGuard } from './components/in/in.guard';

@NgModule({
  imports: [
    AuthModule,
    InModule,
    PublicModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    AuthService,
    InGuard,
    PublicGuard
  ]
})
export class IndexModule {}
