import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { AuthCoreModule } from 'app/core/core.module';
let keycloakService: KeycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthCoreModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HomeModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
})
export class AppModule implements DoBootstrap {
  async ngDoBootstrap(appRef: ApplicationRef) {

    const { keycloak } = environment;

    await keycloakService
      .init({ config: keycloak, })
      .then(() => {
        console.log('[ngDoBootstrap] bootstrap app');

        appRef.bootstrap(AppComponent);
      })
      .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
  }
}
