
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { TicketsRestService } from '../rest/tickets-rest.service';
import { ITour, INearestTour, ITourLocation, ITourTypeSelect } from '../../models/tours';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private ticketSubject = new Subject<ITourTypeSelect>();

  private ticketUpdateSubject = new Subject<ITour[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();

  constructor(private ticketServiceRest: TicketsRestService) {}

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets();
  }

  getTourById(id: string): Observable<ITour> {
    return this.ticketServiceRest.getTourById(id);
  }

  updateTicketList(data: ITour[]) {
    this.ticketUpdateSubject.next(data);
  }

  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }

  getSimilarTour(name: string) {
    return this.ticketServiceRest.getSimilarTour(name)
  }

  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }

  getError(): Observable<any> {
    return this.ticketServiceRest.getRestError();
  }

  getNearestTours(): Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets();
  }

  getTourLocations() {
    return this.ticketServiceRest.getLocationList();
  }

  transformData(data: INearestTour[], tourLocations: ITourLocation[]) {
    const newTicketData: INearestTour[] = [];
    data.forEach((e) => {
      newTicketData.push({
        ...e,
        region: tourLocations.find((region) => e.locationId === region.id)
      })
    });
    return newTicketData;
  }

  // Добавляем метод для создания тура
  createTour(formParams: FormData) {
    return this.ticketServiceRest.createTour(formParams)
}
  

  generateTours(): Observable<void> {
    return this.ticketServiceRest.generateTours().pipe(
      tap(() => {
        this.ticketSubject.next({ type: 'update' } as any); // Обновление списка туров после генерации
      })
    );
  }

  deleteTours(): Observable<void> {
    return this.ticketServiceRest.deleteTours().pipe(
      tap(() => {
        this.ticketSubject.next({ type: 'update' } as any); // Обновление списка туров после удаления
      })
    );
  }

  getNameCountry(): Observable<string[]> {
    return this.ticketServiceRest.getNameCountry().pipe(
      map(nearestTours => nearestTours.map(tour => tour.name))
    );
  }

  sendTourData(data: any): Observable<any>{
    return this.ticketServiceRest.sendTourData(data);
  }

  getTicketById(id: string): Observable<ITour>{
    return this.ticketServiceRest.getTourById(id);
  }
}
