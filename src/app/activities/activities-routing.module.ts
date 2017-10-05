import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';

const activitiesRoutes: Routes = [
  {
    path: 'activity-list', component: ActivityListComponent
  },
  {
    path: 'activity/:id', component: ActivityDetailComponent
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
