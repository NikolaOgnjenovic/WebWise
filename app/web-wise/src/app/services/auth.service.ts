import { Injectable } from '@angular/core';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor() {}

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(email: string, password: string): boolean {
    this.currentUser = {
      id: '1',
      username: email,
      password,
      email,
    }

    this.currentUser = null;
    return false; // todo: success bool
  }

  logout(): void {
    this.currentUser = null;
  }

  register(username: string, email: string, password: string): void {
    // todo: backend
    this.login(email, password);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
