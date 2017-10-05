import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityRoutingModule } from './activities-routing.module';

import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityStoreService } from './activity-store.service';
import { ActivityService } from './activity.service';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule
  ],
  declarations: [
    ActivityListComponent,
    ActivityDetailComponent
  ],
  providers: [ ActivityStoreService, ActivityService ]
})
export class ActivitiesModule { }
