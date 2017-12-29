import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityRoutingModule } from './activities-routing.module';
import { MaterialModule } from '../material.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityService } from './activity.service';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityInterceptor } from './activity.interceptor';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    MaterialModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfQIE3UGWkKT7mG0RkKcySqjYQNf_h8tQ'
    })
  ],
  declarations: [
    ActivityListComponent,
    ActivityDetailComponent,
    SideNavComponent
  ],
  providers: [ActivityService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ActivityInterceptor,
    multi: true,
  } ]
})
export class ActivitiesModule { }
