/**
 * Garrison building upgrade/extension payload.
 */
export interface IBuildingUpgradeOrExtend {
  garrisonId: string;
  buildingId: string;
  workforce: number;
}