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
    const code = route.queryParams['code'];
    if (localStorage.getItem('accessToken') && url === '/login') {
      this.router.navigate(['activity-list']);
      return false;
    } else if (!localStorage.getItem('accessToken') && code) {
      this.authService.tokenExchange(code, url);
      return false;
    } else if (!localStorage.getItem('accessToken') && url !== '/login') {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
