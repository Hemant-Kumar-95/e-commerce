import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInRequest } from '../models/sign-in-request.model';
import { SignUpRequest } from '../models/sign-up-request.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  private loggedInUser: User;

  getLoggedInUser(): User {
    return this.loggedInUser;
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser = user;
  }

  signOut(): void {
    this.loggedInUser = null;
  }

  isUserLoggedIn() {
    if (this.loggedInUser) {
      return true;
    }
    return false;
  }



  authenticateUser(data: SignInRequest): Observable<User> {
    return this.http.post<User>('api/user/authenticate', data);
  }

  registerUser(data: SignUpRequest): Observable<User> {
    return this.http.post<User>('api/user/register', data);
  }

  isUserIdAvailable(userId: string): Observable<boolean> {
    return this.http.post<boolean>('api/user/isUserIdAvailable', userId);
  }
}
