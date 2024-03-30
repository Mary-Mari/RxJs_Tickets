import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketsComponent} from "./tickets.component";
import {TicketlistComponent} from "./tickets-list/ticketlist.component";

const routes: Routes = [
  { path: '', component: TicketsComponent,
  children: [
    {
    path: 'tickets-list',
    component: TicketlistComponent
  },
    {
      path: 'ticket/:id',
      loadChildren: () => import('../ticket-info/ticket-info.module').then(m => m.TicketInfoModule)
    },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
