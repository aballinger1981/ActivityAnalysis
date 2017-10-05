import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ActivityListComponent } from './activity-list/activity-list.component';

import { ActivityService } from './activity-service';
import { LoginComponent } from './login/login.component';

const appRoutes = [
  {
    path: 'activity-list',
    component: ActivityListComponent
  },
  {
    path: '',
    redirectTo: '/activity-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: 'LoginComponent'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    ActivityListComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
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
