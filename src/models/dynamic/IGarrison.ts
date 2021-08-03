/**
 * Built by the user. Center of the game.
 */
 export interface IGarrison {
  /** Garrison's unique identifier. */
  _id: string;

  /** Garrison's chief. */
  characterId: string;

  /** Garrison's name (e.g. 'The Old Retreat'). */
  name: string;

  /** Where is the garrison established ? */
  zone: string;

  /** Acquired resources. */
  resources: {
    gold: number;
    wood: number;
    food: number;
    plot: number;
    goldLastUpdate?: Date;
    woodLastUpdate?: Date;
  };

  /** Instances list. */
  instances: {
    /** Instantiated buildings. */
    buildings: {
      /** Building unique id. */
      _id?: string;

      /** Building unique identifier. */
      code: string;

      /** Building operated-constructions history. */
      constructions: IOperatedConstruction[];
    }[];

    /** Instantiated units. */
    units: {
      /** Unit's unique identifier. */
      code: string;

      /** Number of instances of this unit. */
      quantity: number;

      /** Units instances current state. */
      state: {
        /** Assignment list. */
        assignments: {
          /** Assignment unique id. */
          _id?: string;

          /** Assignment building. */
          buildingId?: string;

          /** Assignement type. */
          type: 'instantiation' | 'construction' | 'harvest';

          /** Number of assigned units. */
          quantity: number;

          /** End of assignment. */
          endDate: Date;
        }[];
      };
    }[];

    /** Researched upgrades. */
    researches: {
      /** Research unique id. */
      _id: string;

      /** Research unique identifier. */
      code: string;

      /** Research operated projects. */
      projects: IOperatedProject[];
    }[];
  };
}

export type GarrisonBuilding = IGarrison['instances']['buildings'][any];

export type GarrisonUnit = IGarrison['instances']['units'][any];

export type GarrisonResearch = IGarrison['instances']['researches'][any];

export type GarrisonResources = IGarrison['resources'];

/**
 * The representation of a building operated-construction history.
 */
export interface IOperatedConstruction {
  /** Construction unique id. */
  _id: string;

  /** When was the construction started ? */
  beginDate: Date;

  /** When did, or when will the construction end ? */
  endDate: Date;

  /** How many workers worked on this one ? */
  workforce: number;

  /** Improvement details. */
  improvement?: {
    /** Either 'upgrade' or 'extension'. */
    type: 'upgrade' | 'extension';

    /** What was the upgrade/extension level to be built ? */
    level: number;
  };
}

/**
 * The representation of an operated-project research history.
 */
export interface IOperatedProject {
  /** Research unique id. */
  _id: string;

  /** When was the research started ? */
  beginDate: Date;

  /** When did, or when will the research end ? */
  endDate: Date;

  /** How many workers worked on this one ? */
  workforce: number;

  /** What was the research level to be launched ? */
  level?: number;
}

export type InstanceType = keyof IGarrison['instances'];