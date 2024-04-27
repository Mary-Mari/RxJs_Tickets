import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { TicketsModule } from './pages/tickets/tickets.module';
import { TicketsRestService } from './services/rest/tickets-rest.service';
import { TicketsService } from './services/tickets/tickets.service';
import { RestInterceptorsService } from './services/interceptors/restinterceptors';
import { ConfigService } from '../assets/config/config-service/config.service';

function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config);
  });
}
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
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


