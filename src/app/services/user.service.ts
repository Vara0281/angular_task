import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.baseurl)
      .pipe(
        tap(res => console.log(res)),
        map(res => res.data),
        catchError(this.handleError));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<any>(`${this.baseurl}/${id}`)
      .pipe(
        map(res => res.data),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client Side Error :', error.error.message);
    } else {
      console.error('Server Side Error :', error);
    }
    return throwError(
      'There is a problem with the service. We are notified & working on it. Please try again later.'
    );
  }
}
