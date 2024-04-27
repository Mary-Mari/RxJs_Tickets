import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMenuType} from "../../models/menuType";
import  { ITour} from "../../models/tours";
import {filter, Subject, subscribeOn, takeUntil, tap} from "rxjs";
import {ActivatedRoute, ActivatedRouteSnapshot, ActivationStart, Router} from "@angular/router";


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  selectedType: IMenuType;
  tickets:ITour[];
  destroyer = new Subject();
  showAside = true;
  dataProp ='asideHidden';


  constructor(private  router: Router,
              private  route: ActivatedRoute) { }


  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }

  ngOnInit(): void {


    this.showAside = !this.recursFindPropertyInData(this.route.snapshot, this.dataProp);

    this.router.events.pipe(
      tap((data) => {
        console.log('data', data)
      }),
      filter((ev) => ev instanceof ActivationStart),
      takeUntil(this.destroyer),
    ).subscribe((data) => {
      if(data instanceof ActivationStart) {
        this.showAside = !this.recursFindPropertyInData(data.snapshot, this.dataProp)
      }
    })
  }

  ngOnDestroy() {
    this.destroyer.next(true);
    this.destroyer.complete()
  }


  recursFindPropertyInData(currentSnapshot: ActivatedRouteSnapshot, searchProp: string): boolean {
    if(currentSnapshot?.data[searchProp]) {
      return true;
    } else {
      if(Array.isArray(currentSnapshot.children)) {
        let result = false;

        currentSnapshot.children.every((el, i) => {
          result = this.recursFindPropertyInData(el, searchProp);
          if(result) {
            return false;
          } else  {
            return true;
          }
        })
        return result;
      } else  {
        return false
      } } }
}
