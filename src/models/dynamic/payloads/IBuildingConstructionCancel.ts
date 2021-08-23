/**
 * Garrison building construction cancelation payload.
 */
export interface IBuildingConstructionCancel {
  garrisonId: string;
  buildingId: string;
  constructionId: string;
}
