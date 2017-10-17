import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ActivitiesModule } from './activities/activities.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ActivitiesModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
