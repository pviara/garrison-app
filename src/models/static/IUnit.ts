import { IRequiredBuilding } from './IBuilding';
import { IInstantiable, IStaticEntity, IStaticEntityCost } from './IStaticEntity';

/**
 * The representation of a unit.
 */
 export interface IUnit extends IStaticEntity {
  /** Instantiation requirements and characteristics. */
  instantiation: {
    cost: IUnitCost;
    duration: number;
    requiredEntities?: {
      buildings: IRequiredBuilding[];
    }
  };

  /** Global statistics. */
  statistics: {
    types: {
      /** Unit type(s) : worker, explorer, fighter. */
      main: string[];

      /** How does the unit fight ? Melee ? Distance ? */
      fight?: string[];
    };
    
    /** Health points. */
    health: number;

    /** Attack statistics. */
    attack?: IUnitStatistic;

    /** Defense statistics. */
    defense?: IUnitStatistic;
  }
}

/**
 * The cost of instantiating a unit.
 */
export interface IUnitCost extends IStaticEntityCost {
  /** Cost in food. */
  food: number;
}

/**
 * The representation of unit's statistics. 
 */
interface IUnitStatistic {
  /** The damage being inflicted to/taken from the ennemy unit. */
  points: {
    /** Minimum damage/defense points. */
    min: number;

    /** Maximum damage/defense points. */
    max: number;
  };

  /** The time between two hits/parades. */
  cooldown: number;

  /** Can the unit hit or defense itself against ennemy air units ? */
  isDistance: boolean;
}

/**
 * An instantiable unit.
 */
 export interface IInstantiableUnit extends IInstantiable, IUnit {
  /** Instantiation requirements and characteristics. */
  instantiation: {
    cost: IUnitCost;
    duration: number;
    requiredEntities: {
      buildings: IRequiredBuilding[];
    };
  }
}