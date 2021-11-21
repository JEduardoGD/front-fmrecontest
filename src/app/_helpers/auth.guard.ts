<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/_services/auth/authentication.service';
=======
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "@app/_services/auth/authentication.service";
>>>>>>> 7f9b9af8f196a35eaeac3e4cb38c79c69d3812c8

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
<<<<<<< HEAD
        console.log('[AuthGuard - canActivate]');
        const currentUser = this.authenticationService.currentUserValue;
        console.log(currentUser);
=======
        const currentUser = this.authenticationService.currentUserValue;
>>>>>>> 7f9b9af8f196a35eaeac3e4cb38c79c69d3812c8
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 7f9b9af8f196a35eaeac3e4cb38c79c69d3812c8
