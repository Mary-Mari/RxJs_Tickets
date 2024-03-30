import { Injectable } from '@angular/core';
import { ITour} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TiсketsStorageService {
  private ticketStorage: ITour[]
  constructor() { }


  setStorage(data: ITour[]): void {
   this.ticketStorage = data;
    localStorage.setItem('tickets', JSON.stringify(data))
  }
  getStorage(): ITour[]  {
    if (this.ticketStorage) {
      return this.ticketStorage;
    } else {
      const storedData = localStorage.getItem('tickets');
      if (storedData) {
        return JSON.parse(storedData);
      } else {
        return [];
      }
    }
  }

}
