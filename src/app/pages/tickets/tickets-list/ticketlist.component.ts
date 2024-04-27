import { Component, AfterViewInit, ViewChild, ElementRef, OnInit} from '@angular/core';
import { ITour } from "../../../models/tours";
import { TicketsService } from "../../../services/tickets/tickets.service";
import { Router} from "@angular/router";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {BlockStyleDirective} from "../../../directive/block-style.directive";
import {debounce, debounceTime, fromEvent, Subscription} from "rxjs";
import  { ITourTypeSelect} from "../../../models/tours";
import {OnDestroy} from "@angular/core";


@Component({
  selector: 'app-tickets-list',
  templateUrl: './ticketlist.component.html',
  styleUrls: ['./ticketlist.component.scss']
})
export class TicketlistComponent implements OnInit, AfterViewInit, OnDestroy {
  tickets: ITour[];
  ticketsCopy: ITour[];
  searchQuery: string;
  private tourUnsubscriber: Subscription;

  @ViewChild('tourWrap', {read: BlockStyleDirective}) blockDirective: BlockStyleDirective
  @ViewChild('tourWrap') tourWrap: ElementRef
  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  searchTicketSub: Subscription;
  ticketSearchValue: string
  constructor(private ticketsService: TicketsService,
              private router: Router,
              private  ticketStorage: TiсketsStorageService) { }

  ngOnInit(): void {

    this.ticketsService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.ticketStorage.setStorage(data);
      }
    )

    this.tourUnsubscriber = this.ticketsService.getTicketTypeObservable().subscribe((data: ITourTypeSelect) => {
      console.log('data', data)

      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;

      }
      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }
      setTimeout(() => {

        this.blockDirective.updateItems();

        this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
      });
    });
    this.tourUnsubscriber = this.ticketsService.getTicketTypeObservable()
      .subscribe((data:ITourTypeSelect) =>
      {  console.log('data', data)  });
  }



  ngAfterViewInit() {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.pipe(

      debounceTime(200)).subscribe((ev:any) => {
      if(this.ticketSearchValue) {
        this.tickets = this.ticketsCopy.filter((el) => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
      } else {
        this.tickets = [...this.ticketsCopy]
      }
    });
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe()
  }

  goToTicketInfoPage(item: ITour) {

    this.router.navigate([`/tickets/ticket/${item.id}`])
  }

  directiveRenderComplete(ev: boolean) {
    this.blockDirective.initStyle(0)
  }

}
