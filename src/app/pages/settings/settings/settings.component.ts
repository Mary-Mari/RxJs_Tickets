import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObservableExampleService} from "../../../services/observable/observable.service";
import {Subject, Subscription, take} from "rxjs";
import {SettingsService} from "../../../services/settings/settings.service";
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  login: string;
  settingsData: Subscription;
  settingsDataSubject: Subscription
  psw: string;
  user: IUser | null;
  storageValue: boolean;
  pswRepeat: string;
  newPsw: string

  constructor(private  observable: ObservableExampleService,
              private settingsService: SettingsService,
              private  messageService: MessageService,
              private  authService: AuthService,
              private  userService: UserService) {
    observable.initObservable()
  }

  ngOnInit(): void {
    this.login = this.userService.getUser()?.login;

    this.settingsData = this.settingsService.loadUserSetings().subscribe((data) => {
      console.log('settings data', data)
    });

    this.settingsDataSubject = this.settingsService.getSettingsSubjectObservable().pipe(take(1)) .subscribe(
      (data)=> {
        console.log('settings data from subject', data)
      }
    )


  }
  // В вашем компоненте SettingsComponent

  changePassword(ev: Event): void | boolean {
    if(this.login ) {
      if (this.newPsw !== this.pswRepeat) {
        this.messageService.add({ severity: 'error', summary: 'Новый пароль не совпадает!' });
        return false;
      }
      if (this.newPsw === this.psw) {
        this.messageService.add({ severity: 'error', summary: 'Такой пароль уже был!' });
        return false;
      }

      const userObj: IUser = {
        psw: this.psw,
        login: this.login,
      };
      const newUserObj: IUser = {
        psw: this.newPsw,
        login: this.login,
      };

      // Проверяем старый пароль на наличие в хранилище
      if(this.authService.checkPassword(userObj)) {
        this. authService.setPassword(newUserObj);
        this.userService.setToken('user-token')
        this.messageService.add({severity: 'success', summary: 'Пароль успешно изменен'});
      } else  {
        this.messageService.add({severity: 'error', summary: ' Текущий пароль не совпадает'});
      }
    } else {
      this.messageService.add({severity: 'error', summary: ' Такого пользователя не существует'});
    }
  }


  ngOnDestroy(): void {
    this.settingsData.unsubscribe()
  }



}
