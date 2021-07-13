import { IStaticEntity } from "./IStaticEntity";

/**
 * The representation of a banner.
 */
export interface IBanner extends IStaticEntity {
  /** In other words : faction (like the *horde* or the *alliance*). */
  side: string;
}
