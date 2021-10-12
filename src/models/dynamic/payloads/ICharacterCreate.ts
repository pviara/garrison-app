/**
 * Character creation payload.
 */
export interface ICharacterCreate {
  userId: string;
  name: string;
  gender: 'male' | 'female';
  side: {
    faction: string;
    banner: string;
  };
}