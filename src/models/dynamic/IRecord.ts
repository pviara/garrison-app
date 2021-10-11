/**
 * The representation of a game record.
 */
 export interface IRecord {
  _id: string;
  garrisonId: string;
  moment: Date;
  entity: 'building' | 'research' | 'unit';
  code: string;
  quantity?: number;
  action: 'assignment' | 'cancelation' | 'improvement' | 'instantiation' | 'unassignment';
  resources?: {
    gold: number;
    wood: number;
    food?: number;
    plot?: number;
  };
}