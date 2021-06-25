import { InComponent } from "./in.component";
import { InGuard } from "./in.guard";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [
        InComponent
    ],
    providers: [
        InGuard
    ]
})
export class InModule {}
