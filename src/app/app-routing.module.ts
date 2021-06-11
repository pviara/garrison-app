import { AuthComponent } from './containers/components/public/components/containers/auth.component';
import { IndexComponent } from './containers/index.component';
import { IndexGuard } from './containers/index.guard';
import { LandingComponent } from './containers/components/public/components/landing.component';
import { NgModule } from '@angular/core';
import { PublicComponent } from './containers/components/public/public.component';
import { PublicGuard } from './containers/components/public/public.guard';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SignInComponent } from './containers/components/public/components/containers/components/sign-in/sign-in.component';
import { SignUpComponent } from './containers/components/public/components/containers/components/sign-up/sign-up.component';

const routes: Routes = [{
    path: '',
    component: IndexComponent,
    canActivate: [IndexGuard],
    pathMatch: 'full'
  },
  {
    path: 'public',
    canActivate: [PublicGuard],
    children: [{
      path: '',
      component: PublicComponent,
      children: [{
        path: '',
        component: LandingComponent
      },
      {
        path: 'auth',
        component: AuthComponent,
        children: [
        {
          path: '',
          component: SignInComponent
        },
        {
          path: 'sign-up',
          component: SignUpComponent
        }]
      }]
    }]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
