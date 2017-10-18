import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityRoutingModule } from './activities-routing.module';
import { MaterialModule } from '../material.module';

import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityService } from './activity.service';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    MaterialModule
  ],
  declarations: [
    ActivityListComponent,
    ActivityDetailComponent
  ],
  providers: [ ActivityService ]
})
export class ActivitiesModule { }
