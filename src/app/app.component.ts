import { Component, OnInit } from '@angular/core';
import { ActivityService } from './activity-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Activity Analysis';

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.activityService.getActivities();
  }
}
