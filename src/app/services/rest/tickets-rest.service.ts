import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITour, INearestTour, ITourLocation, ITourTypeSelect } from '../../models/tours';
import { IOrder } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class TicketsRestService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getTickets(): Observable<ITour[]> {
    return this.http.get<ITour[]>(`${this.apiUrl}/tours`);
  }

  getTourById(id: string): Observable<ITour> {
    return this.http.get<ITour>(`${this.apiUrl}/tours/${id}`);
  }

  getRestError(): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}/error`);
  }

  getNearestTickets(): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>(`${this.apiUrl}/nearest-tours`);
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>(`${this.apiUrl}/locations`);
  }

  createTour(formParams: FormData) {
    return this.http.post(`http://localhost:3000/tours/`, formParams)
  }

  generateTours(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/generate-tours`, {});
  }

  deleteTours(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tours`);
  }

  getNameCountry(): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>(`${this.apiUrl}/countries`);
  }

  sendTourData(data: IOrder): Observable<any> {
    return this.http.post('http://localhost:3000/orders/', data);
  }

  getTicketById(id: string): Observable<ITour> {
    return this.http.get<ITour>('http://localhost:3000/tours/' +id);
  }

  getSimilarTour(name: string) {
    return this.http.get(`http://localhost:3000/tours/name/${name}`)
  }

  // Метод для загрузки туров с сервера
  getTours(): Observable<ITour[]> {
    return this.http.get<ITour[]>('http://localhost:3000/tour-item');
  }
}
