import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;
    const accessToken = route.queryParams['code'];
    return this.checkLogin(url, accessToken);
  }

  checkLogin(url: string, accessToken: string | undefined): boolean {
    if (localStorage.getItem('stravaToken') && (url === '/login' || url === '/token-exchange')) {
      this.router.navigate(['/activity-list']);
      return false;
    }
    if (!localStorage.getItem('stravaToken') && (url !== '/login' && !accessToken)) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
