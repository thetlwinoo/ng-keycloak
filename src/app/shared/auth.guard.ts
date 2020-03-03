import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
import { KeycloakLoginOptions } from 'keycloak-js';

@Injectable()
export class AppAuthGuard extends KeycloakAuthGuard {
    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
        super(router, keycloakAngular);
    }

    isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (!this.authenticated) {
                const scopes = 'openid profile offline_access';
                const options: KeycloakLoginOptions = {
                    scope: scopes,
                };
                this.keycloakAngular.login(options);
                return;
            }

            const requiredRoles = route.data.roles;
            if (!requiredRoles || requiredRoles.length === 0) {
                return resolve(true);
            } else {
                if (!this.roles || this.roles.length === 0) {
                    resolve(false);
                }
                let granted: boolean = false;
                for (const requiredRole of requiredRoles) {
                    if (this.roles.indexOf(requiredRole) > -1) {
                        granted = true;
                        break;
                    }
                }
                resolve(granted);
            }
        });
    }
}