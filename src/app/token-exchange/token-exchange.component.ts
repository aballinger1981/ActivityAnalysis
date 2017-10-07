import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-token-exchange',
  templateUrl: './token-exchange.component.html',
  styleUrls: ['./token-exchange.component.css']
})
export class TokenExchangeComponent implements OnInit {
  public accessToken: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        this.accessToken = params['code'];
        if (this.accessToken) {
          localStorage.setItem('stravaToken', this.accessToken);
          this.router.navigate(['/activity-list']);
        }
      });
  }

}
