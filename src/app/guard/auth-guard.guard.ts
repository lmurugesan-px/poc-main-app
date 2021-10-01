import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.http.post('http://localhost:3000/verify', {token: localStorage.getItem('token')}).pipe(map((res: any)=>{
        console.log(res);
        const { auth } = res;
        return auth ? true: false;
      }))

      // this.http.post('http://localhost:3000/verify', {token: localStorage.getItem('token')}).subscribe((res: any)=>{
      //   const { auth } = res;
      //   return auth
      // }, err => {
      // this.router.navigate(['login']);
      //   return false;
      // })

    // if (localStorage.getItem('token') === 'abc') {
    //   return true;
    // } else {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    // return true;
  }
}
