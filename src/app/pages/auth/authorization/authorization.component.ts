import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth/auth.service";
import { IUser } from "../../../models/users";
import { MessageService } from "primeng/api";
import { Router } from '@angular/router';
import { UserService } from "../../../services/user/user.service";
import { ConfigService } from "../../../../assets/config/config-service/config.service";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServerError } from 'src/app/models/server-error';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  property: string = '';
  loginText = "Логин";
  pswText = "Пароль";
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;
  showCardNumber: boolean;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private config: ConfigService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.authTextButton = 'Авторизоваться';
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  ngOnDestroy(): void { }

  vipStatusSelected(): void {}

  onAuth(ev: Event): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber,
      id: this.login,
    };
    this.http.post<{ access_token: string }>('http://localhost:3000/users/', authUser).subscribe(
    (data: { access_token: string }) => {
      this.userService.setUser(authUser);
      const token: string = data.access_token;
      this.userService.setToken(token);
      this.userService.setToStore(token);

      this.router.navigate(['tickets/tickets-list']);
    }, (err:HttpErrorResponse) => {
      // const serverError = <ServerError>err.error;
      this.messageService.add({ severity: 'warn', summary: 'Ошибка' });
    });
  }
}
