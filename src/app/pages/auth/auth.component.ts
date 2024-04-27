import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {IUser} from "../../models/users";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  login: string;
  psw: string;

  constructor( private  messageService: MessageService) { }
  isTabCaching: boolean = false

  ngOnInit(): void {
  }


}
