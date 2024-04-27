import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {
  private subject = new Subject<string>()
  constructor() { }


  initObservable() : void {


    const observable = new Observable((subscriber => {
      subscriber.next(4);
      subscriber.next(5);
      setTimeout(() => {
        subscriber.next('asyncData');
        subscriber.error('error')
      })
    }))

    observable.subscribe((data) => {
      console.log('observable data', data)
    }, (error => {
      console.log('error', error)
    }))
    // sub.unsubscribe()
  }


  getSubject():Subject<string> {
    return this.subject

  }
}
