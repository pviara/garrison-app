import { IZone } from 'src/models/static/IZone';
import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'filter_zones_by_faction'
})
export class FilterZonesByFactionPipe implements PipeTransform {
  transform(zones: IZone[], faction: string) {
    return zones.filter(zone => zone.side === faction);
  }
}