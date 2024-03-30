import { Injectable} from "@angular/core";
import  {TicketsRestService} from "../rest/tickets-rest.service";
import  {Observable} from "rxjs";
import {ITour} from "../../models/tours";

@Injectable( {
  providedIn: 'root'
})
export  class TicketsService {

  constructor(private  ticketServiceRest: TicketsRestService) {
  }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets();
}
}
