import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakLoginOptions } from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private keycloakService: KeycloakService) { }
    options: KeycloakLoginOptions;
    getValidToken() {
        // const url = this.keycloakService.getKeycloakInstance().createRegisterUrl();
        return this.keycloakService.getToken();
    }

    isLoggedIn(): Promise<boolean> {
        return this.keycloakService.isLoggedIn();
    }

    loadUserProfile(): Promise<KeycloakProfile> {
        let userDetails = this.keycloakService.loadUserProfile();
        return userDetails;
    }

    logout(): Promise<void> {
        return this.keycloakService.logout();
    }
}
