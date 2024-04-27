import {Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserService} from "../../../services/user/user.service";
import  {IUser} from "../../../models/users";
import  {IMenuType} from "../../../models/menuType";
import { Input} from "@angular/core";
import {AuthService} from "../../../services/auth/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy,  OnChanges{
  @Input() menuType: IMenuType;
  items: MenuItem[];
  time: Date;
  user: IUser | null;
  private timerInterval: number;
  private settingsActive =  false;
  public btn: any
  constructor(private  userService: UserService,
              private authService: AuthService,
              private el: ElementRef) {}


  ngOnInit():void {
    this.items = this.initMenuItems();

    this.timerInterval = window.setInterval(() => {
      this.time = new Date();
    },1000)

    this.user = this.userService.getUser();

  }
  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink: ['tickets-list']
      },
      {
        label: 'Настройки',
        routerLink: ['settings']
      },
      {
        label: 'Заказы',
        routerLink: ['/orders']
      },
      {
        label: 'Выйти',
        routerLink: ['/auth'],

        command:(ev) => {
          this.removeUser()
        }
      },
    ]
  };
  ngOnDestroy():void {
    if(this.timerInterval) {
      window.clearInterval(this.timerInterval)
    }
  }

  ngOnChanges() {
  }

  private removeUser() {

  }
}

