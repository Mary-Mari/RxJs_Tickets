import { Component, AfterViewInit, ViewChild, ElementRef, OnInit} from '@angular/core';
import { ITour } from "../../../models/tours";
import { TicketsService } from "../../../services/tickets/tickets.service";
import { Router} from "@angular/router";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {BlockStyleDirective} from "../../../directive/block-style.directive";



@Component({
  selector: 'app-tickets-list',
  templateUrl: './ticketlist.component.html',
  styleUrls: ['./ticketlist.component.scss']
})
export class TicketlistComponent implements OnInit, AfterViewInit {
  tickets: ITour[];
  filteredTour: ITour[] = [];
  searchQuery: string;
  showFilteredResults: boolean = false;

  @ViewChild('tourWrap', {read: BlockStyleDirective}) blockDirective: BlockStyleDirective
  @ViewChild('tourWrap') tourWrap: ElementRef
  constructor(private ticketsService: TicketsService,
              private router: Router,
              private  ticketStorage: TiсketsStorageService) { }

  ngOnInit(): void {
    this.ticketsService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketStorage.setStorage(data);
        setTimeout(() => {
          this.blockDirective.initStyle(0);
        });

      } ) }

  ngAfterViewInit() {  }

  searchOnButtonClick(): void {
    if (this.searchQuery) {
      this.filteredTour = this.tickets.filter(tour =>
        tour.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      this.showFilteredResults = true;
    } else {
      this.showFilteredResults = false;
      this.filteredTour = [...this.tickets];
    }
  }

  goToTicketInfoPage(item: ITour) {

    this.router.navigate([`/tickets/ticket/${item.id}`])
  }

  directiveRenderComplete(ev: boolean) {
    this.blockDirective.initStyle(0)
  }

}
