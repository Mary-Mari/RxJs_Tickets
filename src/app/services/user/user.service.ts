import { Injectable } from '@angular/core';
import  {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor() { }

  private user: IUser;
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
  };
}
