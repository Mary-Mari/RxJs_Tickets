// src/components/ticketlist/ticketlist.component.ts

import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ITour } from '../../../models/tours';
import { TicketsService } from '../../../services/tickets/tickets.service';
import { Router } from '@angular/router';
import { TiсketsStorageService } from '../../../services/tiсkets-storage/tiсkets-storage.service';
import { BlockStyleDirective } from '../../../directive/block-style.directive';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { ITourTypeSelect } from '../../../models/tours';

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
  private searchTicketSub: Subscription;
  ticketSearchValue: string;
  

  @ViewChild('tourWrap', { read: BlockStyleDirective }) blockDirective: BlockStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  constructor(
    private ticketsService: TicketsService,
    private router: Router,
    private ticketStorage: TiсketsStorageService
  ) {}

  ngOnInit(): void {

    this.loadTickets();

    this.ticketsService.ticketUpdateSubject$.subscribe((data)=> {
      this.tickets = data;
    })

    this.tourUnsubscriber = this.ticketsService.getTicketTypeObservable().subscribe((data: ITourTypeSelect) => {
      switch (data.value) {
        case 'single':
          this.tickets = this.ticketsCopy.filter((el) => el.type === 'single');
          break;
        case 'multi':
          this.tickets = this.ticketsCopy.filter((el) => el.type === 'multi');
          break;
        case 'all':
          this.tickets = [...this.ticketsCopy];
          break;
      }
      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0];
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }
      setTimeout(() => {
        this.blockDirective.updateItems();
        this.blockDirective.initStyle(0);
      });
    });
  }

  ngAfterViewInit() {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)
    ).subscribe((ev: any) => {
      if (this.ticketSearchValue) {
        this.tickets = this.ticketsCopy.filter((el) => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
      } else {
        this.tickets = [...this.ticketsCopy];
      }
    });
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
  }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`]);
  }

  directiveRenderComplete(ev: boolean) {
    this.blockDirective.initStyle(0);
  }

  loadTickets(): void {
    this.ticketsService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.ticketStorage.setStorage(data);
      },
      (error) => {
        console.log('Error fetching tickets', error);
      }
    );
  }
}
