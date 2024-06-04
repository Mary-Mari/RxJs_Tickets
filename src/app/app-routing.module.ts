import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketItemComponent } from './pages/ticket-info/ticket-item/ticket-item.component';




const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()  => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./pages/tickets/tickets.module').then(m => m.TicketsModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule)
  },
  { 
    path: 'tickets/:id', // Маршрут для отображения информации о конкретном туре
    component: TicketItemComponent
  },

  { path: '**',
    redirectTo: 'auth'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
