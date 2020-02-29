import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private keycloakService: KeycloakService) { }

    getValidToken() {
        return this.keycloakService.getToken();
    }

    isLoggedIn(): Promise<boolean> {
        return this.keycloakService.isLoggedIn();
    }

    loadUserProfile(): Promise<KeycloakProfile> {
        return this.keycloakService.loadUserProfile();
    }

    logout(): Promise<void> {
        return this.keycloakService.logout();
    }
}
