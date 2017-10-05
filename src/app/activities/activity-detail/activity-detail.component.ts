import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { slideInDownAnimation } from '../../animations';
import { Activity, ActivityService } from '../activity.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css'],
  animations: [ slideInDownAnimation ]
})
export class ActivityDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  public activity$: Observable<Activity>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.activity$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.activityService.getActivity(params.get('id')));
  }

  public goToActivities(activity: Activity): void {
    const activityId = activity ? activity.id : null;
    // Pass along the activity id if available
    // So that the ActivityList component can select that activity.
    this.router.navigate(['/activity-list', { id: activityId }]);
  }

}
