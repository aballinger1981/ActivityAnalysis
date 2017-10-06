import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { AuthGuardService } from '../auth-guard.service';

const activitiesRoutes: Routes = [
  {
    path: 'activity-list',
    component: ActivityListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'activity/:id',
    component: ActivityDetailComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(activitiesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ActivityRoutingModule { }
