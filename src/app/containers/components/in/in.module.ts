import { InComponent } from "./in.component";
import { InGuard } from "./in.guard";
import { LandingComponent } from "./components/landing.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    InComponent,
    LandingComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  providers: [
    InGuard
  ]
})
export class InModule {}
