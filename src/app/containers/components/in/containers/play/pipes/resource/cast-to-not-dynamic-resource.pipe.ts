import { NotDynamicResource } from 'src/models/dynamic/IGarrison';
import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'cast_to_not_dynamic_resource'
})
export class CastToNotDynamicResource implements PipeTransform {
  transform(resource: any) {
    return resource as NotDynamicResource
  }
}
