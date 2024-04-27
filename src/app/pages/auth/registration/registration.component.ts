import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {ConfigService} from "../../../../assets/config/config-service/config.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  storageValue: boolean;
  showCardNumber: boolean;

  constructor( private  messageService: MessageService,
               private  authService: AuthService) { }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard
  }

  localStorageUser():void {

  }

  registration(ev: Event): void | boolean {

    if(this.psw !== this.pswRepeat) {
      this.messageService.add({severity: 'error', summary: 'Пароли не совпадают!'});
      return false;
    }

    const userObj: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber,
      email: this.email
    }


    if(!this.authService.checkUser(userObj)) {
      this. authService.setUser(userObj);
      this.messageService.add({severity: 'success', summary: 'Регистрация прошла успешно'});
    } else  {
      this.messageService.add({severity: 'warn', summary: 'Пользователь уже зарегистрирован'});
    }

    if(this.storageValue) {
      let jsonUser = JSON.stringify(userObj)
      localStorage.setItem("token", jsonUser)
    }
  }



}
