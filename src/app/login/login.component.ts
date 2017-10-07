import { Component, OnInit } from '@angular/core';
import { ActivityStoreService } from '../activities/activity-store.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public activityStore: ActivityStoreService,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}
