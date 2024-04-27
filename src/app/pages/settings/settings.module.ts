import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import {SettingsComponent} from "./settings/settings.component";
import {TicketsModule} from "../tickets/tickets.module";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";


@NgModule({
  declarations: [
    SettingsComponent,

  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TicketsModule,
    CalendarModule,
    DropdownModule,
    ToastModule,
    InputTextModule,
    PaginatorModule,

  ]
})
export class SettingsModule { }
