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
import { TabViewModule } from 'primeng/tabview';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TourLoaderComponent } from './tour-loader/tour-loader.component';
import { TableModule } from 'primeng/table';




@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent,
    StatisticComponent,
    TourLoaderComponent
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
    TabViewModule,
    ReactiveFormsModule,
    TableModule
  ],
  providers: [
    MessageService
  ]
})
export class SettingsModule { }
