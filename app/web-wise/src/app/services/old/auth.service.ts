import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.login("admin", "admin");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.currentUserKey);
  }

  login(username: string, password: string): boolean {
    const user: User = {
      id: username,
      email: "john@doe.com",
      username: username
    };

    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  // register(username: string, email: string, password: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'X-CSRFToken': 'B9p9SRWnot4fedpd8sDpBJSOKxs1BXHn',
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //   });
  //   return this.http.post<any>('http://localhost:8001/api/v1/register/', { username, email, password }, { headers }).pipe(
  //     map(response => {
  //       const user = {
  //         id: response.id,
  //         username: response.username,
  //         email: response.email
  //       };
  //       localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  //       return true;
  //     }),
  //     catchError(error => {
  //       return throwError(error);
  //     })
  //   );
  // }
  register(username: string, email: string, password: string): boolean {
    return this.login(username, password);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.currentUserKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  getUserNameByUserId(userId: string): Observable<string> {
    const headers = new HttpHeaders({
      'X-CSRFToken': 'B9p9SRWnot4fedpd8sDpBJSOKxs1BXHn',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.get<any>('http://localhost:8001/api/v1/users/' + userId + '/username/', { headers }).pipe(
      map(response => response.username),
      catchError(error => {
        console.error('Error fetching username:', error);
        return '';
      })
    );
  }
}
