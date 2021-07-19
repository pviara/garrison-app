import { IRequiredBuilding } from './IBuilding';

/**
 * A single static entity stored inside a collection of
 * entities sharing the same type.
 */
export interface IStaticEntity {
  /** Unique identifier. */
  code: string;

  /**
   * Display text. Can be a single word or a set of words (jargon) displayed
   * in accordance with the reader's faction (side).
   */
  word: string | {
    side: string;
    jargon: string;
  } [];

  /**
   * Entity description.
   */
  description ? : string;
}

/**
 * The cost of instantiating the involved instantiable entity.
 */
export interface IStaticEntityCost {
  /** Cost in gold. */
  gold: number;

  /** Cost in wood. */
  wood: number;
}

/**
 * An instantiable static entity.
 */
export interface IInstantiable extends IStaticEntity {
  /** Instantiation requirements and characteristics. */
  instantiation: {
    requiredEntities: {
      buildings: IRequiredBuilding[];
    };
  }
}