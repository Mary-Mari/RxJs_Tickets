import { Component, OnDestroy, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import { Router } from '@angular/router';
import  { UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../../assets/config/config-service/config.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  property: string = '';
  loginText = "Логин"
  pswText = "Пароль"
  psw: string;
  login:string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;
  showCardNumber: boolean;




  constructor (private  messageService: MessageService,
               private  authService: AuthService,
               private router: Router,
               private userService: UserService,
               private  config: ConfigService)  { }


  ngOnInit(): void {
    this.authTextButton = 'Авторизоваться';
    this.showCardNumber = ConfigService.config.useUserCard
  }

  ngOnDestroy(): void { }

  vipStatusSelected():void {}


  onAuth(ev: Event): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    }
    if(this.authService.checkUser(authUser)) {
      this.authService.setUser(authUser);
      this.userService.setUser(authUser)

      this.userService.setToken('user-token')

      this.router.navigate(['tickets/tickets-list'])
      this.messageService.add({severity: 'success', summary: 'Авторизация прошла успешно'});
    } else  {
      this.messageService.add({severity: 'error', summary: 'Пользователь ввел неверные данные'});
    }


  }

}
