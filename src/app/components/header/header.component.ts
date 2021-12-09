import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/_models/user.model';
import { AuthenticationService } from '@app/_services/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

}
