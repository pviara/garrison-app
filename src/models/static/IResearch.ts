import { IRequiredBuilding } from './IBuilding';
import {
  IInstantiable,
  IStaticEntity,
  IStaticEntityCost
} from './IStaticEntity';

/**
 * The representation of a research.
 */
export interface IResearch extends IStaticEntity {
  /** Instantiation requirements and characteristics. */
  instantiation: {
    cost: IStaticEntityCost;
    minWorkforce: number;
    duration: number;
    requiredEntities?: {
      buildings: IRequiredBuilding[];
    }
  };

  /** Number to add to any base variable in harvest buildings, units attack, defense... */
  bonus: number;
}

/**
 * An instantiable research.
 */
 export interface IInstantiableResearch extends IInstantiable {
  /** Instantiation requirements and characteristics. */
  instantiation: {
    cost: IStaticEntityCost;
    duration: number;
    minWorkforce: number;
    requiredEntities: {
      buildings: IRequiredBuilding[];
    };
  }
}