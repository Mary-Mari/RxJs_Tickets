import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {ConfigService} from "../../../../assets/config/config-service/config.service";
import { HttpClient } from '@angular/common/http';

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
               private  authService: AuthService,
              private http: HttpClient) { }

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
      email: this.email,
      id: this.login,
    }
    this.http.post('http://localhost:3000/users/', userObj).subscribe((data:Object)=> {})


    this.http.post<IUser>('http://localhost:3000/users/', userObj).subscribe((data) => {
      if (this.storageValue) {
        const objUserJsonStr = JSON.stringify(userObj);
        window.localStorage.setItem('user_'+userObj.login, objUserJsonStr);
      }
      this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});
 
    }, ()=> {
      this.messageService.add({severity:'warn', summary:'Пользователь уже зарегистрирован'});
    });
  }



}
