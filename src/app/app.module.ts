import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ActivitiesModule } from './activities/activities.module';

import { MatTableModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatTableModule,
    MatMenuModule,
    HttpClientModule,
    ActivitiesModule,
    AppRoutingModule
  ],
  providers: [ AuthGuardService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
