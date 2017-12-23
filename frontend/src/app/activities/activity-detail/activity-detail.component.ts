import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Activity, ActivityService } from '../activity.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
  animations: [  ]
})
export class ActivityDetailComponent implements OnInit {
  public activity$: Observable<any>;
  public pageIndex: number;
  public pageSize: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.activity$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.pageIndex = +params.get('page');
        this.pageSize = +params.get('per_page');
        return this.activityService.getActivity(params.get('id'));
      });
    this.setNavData();
  }

  public setNavData(): void {
    if (!this.activityService.athleteData) {
      if (!this.activityService.athleteId) {
        this.activityService.getAthlete();
      } else {
        this.activityService.getAthleteData();
      }
    }
  }

  public goToActivities(activity: Activity): void {
    const activityId = activity ? activity.id : null;
    // Pass along the activity id if available
    // So that the ActivityList component can select that activity.
    this.router.navigate(['/activity-list', { id: activityId, page: this.pageIndex, per_page: this.pageSize }]);
  }

}
