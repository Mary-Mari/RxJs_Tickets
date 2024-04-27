import { Component } from '@angular/core';
import { ConfigService} from "../assets/config/config-service/config.service";
import {filter, fromEvent, tap, map, exhaustMap, of, delay, withLatestFrom, switchMap, mergeMap} from "rxjs";
import  {OnInit} from "@angular/core";
import {UserService} from "./services/user/user.service";
import {RouterOutlet} from "@angular/router";
import {AppModule} from "./app.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ticketSales2022';
  prop: string;

  constructor(private  configService: ConfigService,
              private userService: UserService) {
    this.configService.configLoad()

  }


  ngOnInit () {
    const clickEv = fromEvent<MouseEvent>(document, 'click');

    clickEv.pipe(
      tap((data) => {
        console.log('data', data)
      }),
      filter((el) => {
        return(el.target as HTMLElement).nodeName === "INPUT"
      }),
      map((data) => {
        return data.clientX;
      }),
      withLatestFrom(this.userService.userBehSubject$, of('new Data')),
      mergeMap(([clientX, user, newData]) => {
        return of({clientX, user, newData}).pipe(delay(2000))
      })
    )
      .subscribe((data) => {
        console.log('data from subscribe', data)
      })

  }
}
