import {
  Component,
  Input
} from "@angular/core";
import { IGarrison } from "src/models/dynamic/IGarrison";

@Component({
  selector: 'garrison-in-play-building-instance',
  templateUrl: './building-instance.component.html',
  styleUrls: ['./building-instance.component.scss']
})
export class BuildingInstanceComponent {
  @Input()
  garrison!: IGarrison;
  
  ngOnInit() {
    console.log('init building instance component', this.garrison);
  }
}