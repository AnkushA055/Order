import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { AboutComponent } from './Components/about/about.component';
//import { LoginComponent } from './Components/login/login.component';
import { OrderModule } from './OrderModule/order.module';
import { GreatOutdoorsDataService } from './InMemoryWebAPIServices/greatoutdoors-dataservice';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    environment.production ? HttpClientInMemoryWebApiModule.forRoot(GreatOutdoorsDataService, { delay: 1000 }) : [],
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
