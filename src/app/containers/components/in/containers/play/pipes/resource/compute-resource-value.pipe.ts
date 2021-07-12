import {
  Pipe,
  PipeTransform
} from "@angular/core";
import { ResourceType } from "src/models/dynamic/ResourceType";

@Pipe({
  name: 'compute_resource_value'
})
export class ComputeResourceValue implements PipeTransform {
  transform(
    type: ResourceType,
    now: Date
  ) {
    console.log(type, now);
  }
}