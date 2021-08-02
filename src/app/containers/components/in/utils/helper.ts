import { environment } from 'src/environments/environment';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import {
  GarrisonResearch,
  IOperatedProject
} from 'src/models/dynamic/IGarrison';
import { IInstantiableBuilding } from 'src/models/static/IBuilding';

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
}