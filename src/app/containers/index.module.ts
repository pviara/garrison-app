import { AuthModule } from './components/public/components/containers/auth.module';
import { InGuard } from './components/in/in.guard';
import { InModule } from './components/in/in.module';
import { NgModule } from '@angular/core';
import { PublicGuard } from './components/public/public.guard';
import { PublicModule } from './components/public/public.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    AuthModule,
    InModule,
    PublicModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    InGuard,
    PublicGuard
  ]
})
export class IndexModule {}
