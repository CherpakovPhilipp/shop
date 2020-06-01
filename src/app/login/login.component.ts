import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  message: string;

  private unsubscribe: Subject<void> = new Subject();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.setMessage();
  }

  ngOnDestroy() {
    console.log('[takeUntil ngOnDestroy]');
    // this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onLogin() {
    this.message = 'Trying to log in ...';

    const observer = {
      next: () => {
        this.setMessage();

        if (this.authService.isLoggedIn) {
          const redirect = this.authService.redirectUrl;

          this.router.navigate([redirect]);
        }
      },
      error: (err: any) => console.log(err),
      complete: () => console.log('[takeUntil] complete')
    };

    this.authService
      .login()
      // The TakeUntil subscribes and begins mirroring the source Observable.
      // It also monitors a second Observable that you provide.
      // If this second Observable emits an item or sends a termination notification,
      // the Observable returned by TakeUntil stops mirroring the source Observable and terminates.
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(observer);
  }

  onLogout() {
    this.authService.logout();
    this.setMessage();
  }

  private setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
}