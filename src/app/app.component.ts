import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngClient';
  userDetails: KeycloakProfile;

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    if (await this.authService.isLoggedIn()) {
      this.userDetails = await this.authService.loadUserProfile();
      console.log('user details', this.userDetails)
    }
  }

  login() {

  }

  async logout() {
    await this.authService.logout();
  }
}
