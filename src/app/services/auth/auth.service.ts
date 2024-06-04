import { Injectable } from '@angular/core';
import { IUser } from "../../models/users";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, of } from 'rxjs';
import { Router } from '@angular/router';

const LOCAL_STORAGE_NAME = 'currentUser';
const LOCAL_STORAGE_TOKEN_NAME = 'accessToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userStorage: IUser[] = [];
  private currentUser: IUser | null = null;
  private accessToken: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    if (this.isAuthenticated) {
      return;
    }
    const storedUser: IUser | null = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) || 'null');
    const storedToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME) || 'null');
    if (storedUser) {
      this.userStorage.push(storedUser);
      this.auth(storedUser, storedToken);
    }
  }

  private auth(user: IUser, token: string, isRememberMe?: boolean) {
    this.currentUser = user;
    this.accessToken = token;
    if (isRememberMe) {
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(user));
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, JSON.stringify(token));
    }
  }

  private authAndRedirect(user: IUser, token: string, isRememberMe?: boolean) {
    this.auth(user, token, isRememberMe);
    this.router.navigate(['tickets']);
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  get user(): IUser | null {
    return this.currentUser;
  }

  get token(): string | null {
    return this.isAuthenticated ? this.accessToken : null;
  }

  authUser(login: string, password: string, isRememberMe: boolean): Observable<boolean> {
    return this.http.post<any>('http://localhost:3000/users/auth', { login, password }).pipe(
      map((result: any) => {
        if (result.error) {
          return false;
        }
        const user = result.user;
        this.authAndRedirect(user, result.token, isRememberMe);
        return true;
      })
    );
  }

  addUser(user: IUser, isRememberMe?: boolean): Observable<boolean> {
    return this.http.post<any>('http://localhost:3000/users/registration', user).pipe(
      map((result: any) => {
        if (result.error) {
          return false;
        }
        this.authAndRedirect(result.user, result.token, isRememberMe);
        return true;
      })
    );
  }

  logout() {
    this.userStorage = this.userStorage.filter(({ login }) => login === this.currentUser?.login);
    this.currentUser = null;
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    this.router.navigate(['auth']);
  }

  changePassword(password: string): Observable<boolean> {
    if (!this.currentUser) {
      return of(false);
    }
    return this.http.post<any>('http://localhost:3000/users/change-password', { password }).pipe(
      map((result: any) => {
        if (result.error) {
          return false;
        }
        this.currentUser.psw = password;
        const dbUser = this.userStorage.find(({ login }) => login === this.currentUser?.login)!;
        dbUser.psw = password;
        return true;
      })
    );
  }
}
