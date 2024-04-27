import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {TreeNode} from "primeng/api";
import {OrderType} from "../../shared/mocks/orders";
import {OrdersService} from "../../services/orders/orders.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  private _destroyer: Subscription;
  tableData$: Observable<TreeNode<OrderType[]>[]>;
  tableData: TreeNode<OrderType[]>[] = []

  constructor( private  orderService: OrdersService) { }

  ngOnInit(): void {

    this.initOrders()

   this._destroyer= this.orderService.groupOrders$.subscribe((data) => {
      this.initOrders()
    })
  }

  initOrders(): void {
    this.tableData$ = this.orderService.getOrders();
  }
  ngOnDestroy(): void
  {
    this._destroyer.unsubscribe();
  }



}
