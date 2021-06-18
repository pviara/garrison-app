/**
 * The representation of a character.
 */
export interface ICharacter {
  /** Character's unique id. */
  _id: string;

  /** Character's owner. */
  userId: string;

  /** Character's name. */
  name: string;

  /** Character's side details. */
  side: {
    /** The faction whose player belongs to. */
    faction: string;

    /** The banner whose player belongs to. */
    banner: string;
  };
}
