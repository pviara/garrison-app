import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/models/dynamic/IUser';

@Injectable()
export class AuthService {
  constructor(/* private client: HttpClient */) {}

  /**
   * Get authenticated user from local storage.
   * @returns The authenticated user.
   */
  getCurrentUser() {
    const userFromStorage = localStorage.getItem('user');
    if (!userFromStorage) return;
    
    return JSON.parse(userFromStorage) as IUser;
  }
}
