import { Injectable} from "@angular/core";
import  {TicketsRestService} from "../rest/tickets-rest.service";
import {forkJoin, map, Observable, of, Subject, switchMap} from "rxjs";
import {INearestTour, INewNearestTour, ITour, ITourLocation, ITourTypeSelect} from "../../models/tours";

@Injectable( {
  providedIn: 'root'
})
export  class TicketsService {
  private ticketSubject = new Subject<ITourTypeSelect>()

  constructor(private  ticketServiceRest: TicketsRestService) {
  }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets().pipe(map(

      (value) => {
        const singleTours = value.filter((el) => el.type === 'single');
        return value.concat(singleTours)
      }
    ));

  }
  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }


  updateTour(type:ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }

  getError(): Observable<any> {
    const errorObservable = this.ticketServiceRest.getRestError();

    return errorObservable;
  }

  getNearestTours(): Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets();
  }

  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList();
  }



  getNameCountry(): Observable<INearestTour[]> {
    return forkJoin([this.getNearestTours(), this.getToursLocation()]).pipe(

      switchMap(([nearestTour, tourLocation]) => {

        const newArr: INewNearestTour[]= nearestTour.map((el) => {
          const location = tourLocation.find((loc) => loc.id === el.locationId);
          const newObj: any = {...el};
          newObj.toursLocation = location.name
          return newObj;
        })
        return of(newArr)
      })
    )

  }






}
