import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RestInterceptorsService } from './services/interceptors/restinterceptors';
import { ConfigService } from '../assets/config/config-service/config.service';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StatisticComponent } from './pages/settings/statistic/statistic.component';

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
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule
    
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


