import { IStaticEntity } from './IStaticEntity';

/**
 * The representation of a zone.
 */
export interface IZone extends IStaticEntity {
  /** In other words : faction (like the *horde* or the *alliance*). */
  side: string;

  /** Cartesian coordinates. */
  coordinates: {
    x: number;
    y: number;
  }
}
