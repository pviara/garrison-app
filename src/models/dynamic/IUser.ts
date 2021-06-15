/**
 * The representation of a user.
 */
export interface IUser {
  /** User's unique id. */
  _id: string;

  /** User's displayed nickname. */
  username: string;

  /** User's both e-mail and login. */
  email: string;

  /** User's password details. */
  password: {
    hash: string;
    salt: string;
  };

  /** Indicates whether the user has confirmed his account. */
  isConfirmed?: boolean;
}

/**
 * The representation of an authenticated user.
 */
export interface IAuthenticatedUser extends IUser {
  /** User's authentication token. */
  token: string;
}