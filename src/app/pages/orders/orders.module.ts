import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { TreeTableModule} from "primeng/treetable";
import {CheckboxModule} from "primeng/checkbox";
import {OrderHeaderComponent} from "./order-header/order-header.component";
import {TicketsModule} from "../tickets/tickets.module";
import {HeaderComponent} from "../tickets/header/header.component";
import {FooterComponent} from "../tickets/footer/footer.component";
import {AsideComponent} from "../tickets/aside/aside.component";



@NgModule({
  declarations: [
    OrdersComponent,
    OrderHeaderComponent,
  ],

  imports: [
    CommonModule,
    OrdersRoutingModule,
    TreeTableModule,
    CheckboxModule,
    TicketsModule
  ]
})
export class OrdersModule { }
