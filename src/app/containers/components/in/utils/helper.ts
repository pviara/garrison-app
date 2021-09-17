import { environment } from 'src/environments/environment';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import {
  GarrisonBuilding,
  GarrisonResearch,
  GarrisonUnit,
  IOperatedConstruction,
  IOperatedProject
} from 'src/models/dynamic/IGarrison';
import { BuildingImprovementType, IBuildingCost, IInstantiableBuilding, IRequiredBuildingForExtensionLevel } from 'src/models/static/IBuilding';

export class StaticHelper {
  static extractCharacterOutOf(characters: ICharacter[]) {
    return characters[0];
  }

  static isObjectEmpty(obj: object) {
    return Object.keys(obj).length === 0;
  }

  static hasPast(date: Date | string, now?: Date) {
    if (!now) now = new Date();
    
    if (typeof date === 'string') {
      date = new Date(date);
    }

    return date.getTime() <= now.getTime();
  }
  
  static computeConstructionCost(
    instantiationCost: IBuildingCost,
    improvementLevel = 0
  ) {
    const getPowerFactor = (factor = this.getFactor('default')) => {
      return Math.pow(factor, improvementLevel);
    };
    return {
      gold: Math.floor(instantiationCost.gold * getPowerFactor()),
      wood: Math.floor(instantiationCost.wood * getPowerFactor()),
      plot: Math.floor(
        instantiationCost.plot * getPowerFactor(
          this.getFactor('decreased')
        )
      )
    } as IBuildingCost;
  }

  static computeConstructionDurationAndWorkforce(
    moment: Date,
    workforce: number,
    building: IInstantiableBuilding,
    improvementLevel: number,
    researches: GarrisonResearch[]
  ) {
    let {
      duration,
      minWorkforce
    } = building.instantiation;

    duration = duration * Math.pow(
      environment.decreasedFactor,
      improvementLevel
    );

    minWorkforce = minWorkforce * Math.pow(
      2, improvementLevel
    );

    let bonus = environment.workingBonus;
    const matchingResearch = researches
      .find(research =>
        research.code === 'improved-construction'
      );

    if (matchingResearch) {
      bonus -= this
        .computeResearchCurrentLevel(
          moment,
          matchingResearch.projects
        ) / 100;
    }
    
    // apply bonus: each additionnal worker reduces duration by 3%
    return {
      duration: duration * Math.pow(bonus, workforce - minWorkforce),
      minWorkforce
    };
  }
  
  static computeResearchCurrentLevel(
    moment: Date,
    projects: IOperatedProject[]
  ) {
    const finished = projects
      .filter(project =>
        moment.getTime() > project.endDate.getTime()
      );

    return finished
      .map(project => <number>project.level)
      .reduce((prev, next) => next > prev ? next : prev, 0);
  }

  static computeElapsedMinutes(date: Date, now?: Date) {
    if (!now) now = new Date();

    return (now.getTime() - date.getTime()) / 1000 / 60;
  }

  static computeGlobalProfitLimit(
    moment: Date,
    harvestCode: 'goldmine' | 'sawmill',
    dynamicBuildings: GarrisonBuilding[]
  ) {
    const dynamicHarvestBuildings = dynamicBuildings
      .filter(building => {
        const available = this.checkBuildingAvailability(
          moment,
          building
        );

        if (available && building.code === harvestCode) {
          return building;
        }
        else return null;
      });

      let profitLimit = 0;
      for (const harvestBuilding of dynamicHarvestBuildings) {
        const currentLevel = this.computeBuildingCurrentLevel(
          moment,
          'extension',
          harvestBuilding.constructions
        );
        const factor = currentLevel + 1;
        profitLimit += 180 * factor;
      }

      return profitLimit;
  }

  static checkExtensionConstructionRequirements(
    moment: Date,
    requirements: IRequiredBuildingForExtensionLevel[],
    buildings: GarrisonBuilding[],
    nextExtension: number
  ) {
    const unfulfilled = requirements
      .some(building => {
        // simply look for the required building inside garrison existing buildings
        const existing = buildings.find(garrBuilding => garrBuilding.code === building.code);
        if (!existing) return true;

        if (building.upgradeLevel && (building.level === nextExtension)) {
          // is the building at the required upgrade level ?
          const upgraded = existing
            .constructions
            .find(construction => <number>construction.improvement?.level >= <number>building.upgradeLevel);
          if (!upgraded) return true;

          // is the building still being processed for this specific upgrade ?
          if (upgraded.endDate.getTime() > moment.getTime()) return true;
        }
        return false;
      });

    return !unfulfilled;
  }

  static computeBuildingCurrentLevel(
    moment: Date,
    improvementType: BuildingImprovementType,
    constructions: IOperatedConstruction[],
    hasPastCheck = true
  ) {
    const improvements = constructions
      .filter(
        construction => {
          if (construction.improvement?.type === improvementType) {
            if (hasPastCheck && !this.hasPast(construction.endDate, moment)) {
              return null;
            } else {
              return construction;
            }
          }
          return null;
        }
      );

    return improvements
      .map(construction => <number>construction.improvement?.level)
      .reduce((prev, next) => next > prev ? next : prev, 0);
  }

  static checkBuildingAvailability(
    moment: Date,
    dynamicBuilding: GarrisonBuilding
  ) {
    return dynamicBuilding
      .constructions
      .every(
        construction => this.hasPast(construction.endDate, moment)
      );
  }
  
  static getFactor(type: 'default' | 'decreased') {
    switch (type) {
      case 'default':
        if (!environment.defaultFactor) throw new Error('Couldn\'t retrieve DEFAULT_FACTOR from environment file.');
        return environment.defaultFactor;

      case 'decreased':
        if (!environment.decreasedFactor) throw new Error('Couldn\'t retrieve DECREASED_FACTOR from environment file.');
        return +environment.decreasedFactor;
    }
  }
}