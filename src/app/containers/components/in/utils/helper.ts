import { environment } from 'src/environments/environment';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import {
  GarrisonBuilding,
  GarrisonResearch,
  GarrisonUnit,
  IOperatedConstruction,
  IOperatedProject
} from 'src/models/dynamic/IGarrison';
import { BuildingImprovementType, IInstantiableBuilding } from 'src/models/static/IBuilding';

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
        const factor = currentLevel > 0 ? currentLevel : 1;
        profitLimit += 180 * factor;
      }

      return profitLimit;
  }

  static computeBuildingCurrentLevel(
    moment: Date,
    improvementType: BuildingImprovementType,
    constructions: IOperatedConstruction[]
  ) {
    const improvements = constructions
      .filter(
        construction => this.hasPast(construction.endDate, moment)
        && construction.improvement?.type === improvementType
      );
    if (improvements.length === 0) {
      // no improvement was found, but is the building at least been instantiated ?
      if (constructions.length > 1) return -1;
    }

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
}