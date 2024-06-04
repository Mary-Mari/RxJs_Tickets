import { Injectable } from '@angular/core';
import  {IUser} from "../../models/users";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private user: IUser | null = null;
  private  usersStorage: IUser[] = [];
  private  userBehSubject = new BehaviorSubject<IUser | null>(null);
  readonly userBehSubject$ = this.userBehSubject.asObservable()
  private token: string | null;
  constructor() { }


  getUser(): IUser | null {
      return  this.user;
  }

  setUser(user: IUser) {
    this.user = user
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string| null {
    return this.token;
  }

  setToStore(token: string) {
    window.localStorage.setItem('userToken', token)
  }

  getFromStore() {
    return window.localStorage.getItem('userToken')
  }

  getAllToken(): string | null {
    if (this.token) {
      return this.token;
    } else {
      return this.getFromStore()
    }
  }

  removeUser(){
    
  }
  }

