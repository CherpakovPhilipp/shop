import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string = '/admin';

  constructor() {}

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(2000),
      tap(val => (this.isLoggedIn = val))
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}