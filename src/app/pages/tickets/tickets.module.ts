import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { MenubarModule} from "primeng/menubar";
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketlistComponent } from './tickets-list/ticketlist.component';
import { AsideComponent } from './aside/aside.component';
import { DropdownModule } from 'primeng/dropdown';
import  {FormsModule} from "@angular/forms";
import {BlockStyleDirective} from "../../directive/block-style.directive";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketlistComponent,
    AsideComponent,
    BlockStyleDirective

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AsideComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    NgOptimizedImage,
    CalendarModule,
    ToastModule,
    InputTextModule
  ],
  providers: [MessageService]
})
export class TicketsModule { }
