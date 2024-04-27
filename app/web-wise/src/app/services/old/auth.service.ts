import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(username: string, password: string): boolean {
    this.currentUser = {
      id: 'user1',
      email: "john@doe.com",
      username: username
    }
    return true;
    // const headers = new HttpHeaders({
    //   'X-CSRFToken': 'B9p9SRWnot4fedpd8sDpBJSOKxs1BXHn',
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    // });
    // return this.http.post<any>('http://localhost:8001/api/v1/login/', { username, password }, { headers }).pipe(
    //   map(response => {
    //     this.currentUser = {
    //       id: response['user_id'],
    //       username: response.username,
    //       email: response.email
    //     };
    //     return true;
    //   }),
    //   catchError(error => {
    //     return throwError(error);
    //   })
    // );
  }

  logout(): void {
    this.currentUser = null;
  }

  register(username: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-CSRFToken': 'B9p9SRWnot4fedpd8sDpBJSOKxs1BXHn',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.post<any>('http://localhost:8001/api/v1/register/', { username, email, password }, { headers }).pipe(
      map(response => {
        this.currentUser = {
          id: response.id,
          username: response.username,
          email: response.email
        };
        return true;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUser;
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
