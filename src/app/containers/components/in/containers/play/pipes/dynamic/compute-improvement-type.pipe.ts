import {
  Pipe,
  PipeTransform
} from "@angular/core";
import { BuildingImprovementType, IBuilding } from "src/models/static/IBuilding";

@Pipe({
  name: 'compute_improvement_type'
})
export class ComputeImprovementTypePipe implements PipeTransform {
  transform(staticEntity: IBuilding): BuildingImprovementType {
    const {
      extension,
      upgrades
    } = staticEntity;

    if (extension) {
      return 'extension';
    }
    
    if (upgrades && upgrades.length > 0) {
      return 'upgrade';
    }
    
    throw new Error('No improvement type was recognized for this building.');
  }
}
