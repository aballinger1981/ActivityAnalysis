import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { MatTableModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ActivityListComponent } from './activity-list/activity-list.component';

import { ActivityService } from './activity-service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';




@NgModule({
  declarations: [
    AppComponent,
    ActivityListComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatMenuModule,
    HttpClientModule,
  ],
  providers: [ ActivityService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
