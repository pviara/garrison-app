/**
 * Garrison unit assignment payload.
 */
 export interface IUnitAssign {
  garrisonId: string;
  code: string;
  quantity: number;
  harvestCode: 'goldmine' | 'sawmill';
}