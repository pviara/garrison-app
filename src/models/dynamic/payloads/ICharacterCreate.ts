/**
 * Character creation payload.
 */
export interface ICharacterCreate {
  userId: string;
  name: string;
  side: {
    faction: string;
    banner: string;
  };
}