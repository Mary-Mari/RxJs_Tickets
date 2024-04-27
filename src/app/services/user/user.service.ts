import { Injectable } from '@angular/core';
import  {IUser} from "../../models/users";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private user: IUser;
  private  usersStorage: IUser[] = [];
  private  userBehSubject = new BehaviorSubject<IUser | null>(null);
  readonly userBehSubject$ = this.userBehSubject.asObservable()
  private token: string;
  constructor() { }


  getUser(): IUser {

    if(this.user) {
      return  this.user
    } else {
      const userFromStore = JSON.parse(localStorage.getItem("token") || '');
      return  userFromStore
    }
  };
  setUser(user: IUser):void {
    this.user = user
    this.userBehSubject.next(this.user)
  };



  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }
}
