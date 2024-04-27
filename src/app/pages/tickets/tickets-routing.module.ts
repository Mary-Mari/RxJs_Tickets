import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketsComponent} from "./tickets.component";
import {TicketlistComponent} from "./tickets-list/ticketlist.component";
import {SettingsComponent} from "../settings/settings/settings.component";

const routes: Routes = [
  { path: '', component: TicketsComponent,
    children: [
      {
        path: 'tickets-list',
        component: TicketlistComponent,

      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {asideHidden: true}
      },
      {
        path: 'ticket/:id',
        loadChildren: () => import('../ticket-info/ticket-info.module').then(m => m.TicketInfoModule),
        data: {asideHidden: true}

      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
