import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./services/auth/auth.service";
import { TicketsModule} from "./pages/tickets/tickets.module";
import { TicketsRestService } from './services/rest/tickets-rest.service';
import { TicketsService } from './services/tickets/tickets.service';
import {HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
