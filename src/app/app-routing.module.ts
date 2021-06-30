import { AuthComponent } from './containers/components/public/components/containers/auth.component';
import {
  CharacterComponent as CreateCharacterComponent
} from './containers/components/in/containers/create/components/character/character.component';
import {
  CharacterGuard as CreateCharacterGuard
} from './containers/components/in/containers/create/components/character/character.guard';
import { CharacterResolver } from './containers/components/in/resolvers/dynamic/character.resolver';
import { CreateComponent } from './containers/components/in/containers/create/create.component';
import { FactionResolver } from './containers/components/in/resolvers/static/faction.resolver';
import {
  GarrisonComponent as CreateGarrisonComponent
} from './containers/components/in/containers/create/components/garrison/garrison.component';
import {
  GarrisonGuard as CreateGarrisonGuard
} from './containers/components/in/containers/create/components/garrison/garrison.guard';
import { GarrisonResolver } from './containers/components/in/resolvers/dynamic/garrison.resolver';
import { InComponent } from './containers/components/in/in.component';
import { InGuard } from './containers/components/in/in.guard';
import { LandingComponent as PublicLandingComponent } from './containers/components/public/components/landing.component';
import { LandingComponent as InLandingComponent } from './containers/components/in/components/landing.component';
import { NgModule } from '@angular/core';
import { PublicComponent } from './containers/components/public/public.component';
import { PublicGuard } from './containers/components/public/public.guard';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SignInComponent } from './containers/components/public/components/containers/components/sign-in/sign-in.component';
import { SignUpComponent } from './containers/components/public/components/containers/components/sign-up/sign-up.component';

const routes: Routes = [{
    path: 'public',
    canActivate: [PublicGuard],
    component: PublicComponent,
    children: [{
      path: '',
      children: [{
        path: '',
        component: PublicLandingComponent
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
    path: 'in',
    canActivate: [InGuard],
    component: InComponent,
    children: [{
      path: '',
      children: [{
        path: '',
        component: InLandingComponent,
        resolve: {
          character: CharacterResolver
        }
      },
      {
        path: 'create',
        component: CreateComponent,
        children: [{
          path: 'character',
          canActivate: [CreateCharacterGuard],
          component: CreateCharacterComponent,
          resolve: {
            factions: FactionResolver
          }
        },
        {
          path: 'garrison',
          canActivate: [CreateGarrisonGuard],
          component: CreateGarrisonComponent
        }]
      }]
    }]
  },
  {
    path: '**',
    redirectTo: '/public'
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
