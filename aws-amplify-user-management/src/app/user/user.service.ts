import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, Group } from 'src/app/component/user/user';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private listUrl = environment.apiBaseUrl + '/user-list'
  private listInGroupUrl = environment.apiBaseUrl + '/user-list/in-group'
  private approveUrl = environment.apiBaseUrl + '/approve'
  private enableUrl = environment.apiBaseUrl + '/enable'
  private disableUrl = environment.apiBaseUrl + '/disable'
  private deleteUrl = environment.apiBaseUrl + '/delete'
  private listGroupUrl = environment.apiBaseUrl + '/group-list'

  constructor(private http: HttpClient) { }

  public getUsers(token: string, group: string): Observable<User[]> {
    if (!group || group === "all") {
      return this.getAllUsers(token);
    } else {
      return this.getUsersInGroup(token, group);
    }
  }

  private getAllUsers(token: string): Observable<User[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };
    const body = {
      'UserPoolId': environment.amplify.Auth.userPoolId
    }

    return this.http.post<any>(this.listUrl, body, httpOptions).pipe(
      map(users => users['Users']),
      tap(users => users['Users']),
      catchError(this.handleError('ListUsers', []))
    );
  }

  private getUsersInGroup(token: string, group: string): Observable<User[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };
    const body = {
      'UserPoolId': environment.amplify.Auth.userPoolId,
      'GroupName': group
    }

    return this.http.post<any>(this.listInGroupUrl, body, httpOptions).pipe(
      map(users => users['Users']),
      tap(users => users['Users']),
      catchError(this.handleError('ListUsersInGroup', []))
    );
  }

  public getGroups(token: string): Observable<Group[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };
    const body = {
      'UserPoolId': environment.amplify.Auth.userPoolId
    }

    return this.http.post<any>(this.listGroupUrl, body, httpOptions).pipe(
      map(groups => groups['Groups']),
      tap(groups => groups['Groups']),
      catchError(this.handleError('ListGroups', []))
    );
  }

  public approveUser(userName: string, token: string): Observable<User[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };
    const body = {
      'UserPoolId': environment.amplify.Auth.userPoolId,
      'Username' : userName
    }

    return this.http.post<any>(this.approveUrl, body, httpOptions).pipe(
      map(res => res['ResponseMetadata']),
      tap(res => res['ResponseMetadata']),
      catchError(this.handleError('ApproveUser', []))
    );
  }

  public enableUser(userName: string, token: string): Observable<User[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };
    const body = {
      'UserPoolId': environment.amplify.Auth.userPoolId,
      'Username' : userName
    }

    return this.http.post<any>(this.enableUrl, body, httpOptions).pipe(
      map(res => res['ResponseMetadata']),
      tap(res => res['ResponseMetadata']),
      catchError(this.handleError('EnableUser', []))
    );
  }

  public disableUser(userName: string, token: string): Observable<User[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };
    const body = {
      'UserPoolId': environment.amplify.Auth.userPoolId,
      'Username' : userName
    }

    return this.http.post<any>(this.disableUrl, body, httpOptions).pipe(
      map(res => res['ResponseMetadata']),
      tap(res => res['ResponseMetadata']),
      catchError(this.handleError('DisableUser', []))
    );
  }

  public deleteUser(userName: string, token: string): Observable<User[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };
    const body = {
      'UserPoolId': environment.amplify.Auth.userPoolId,
      'Username' : userName
    }

    return this.http.post<any>(this.deleteUrl, body, httpOptions).pipe(
      map(res => res['ResponseMetadata']),
      tap(res => res['ResponseMetadata']),
      catchError(this.handleError('DeleteUser', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
 
      this.log(`${operation} failed: ${error.message}`);
 
      return of(result as T);
    };
  }
 
  private log(message: string) {
    console.log('userService: ' + message);
  }
}
