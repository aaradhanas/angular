import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

// Reference link : https://symbiotics.co.za/integrating-keycloak-with-an-angular-4-web-application-part-6/

declare let Keycloak: any;

@Injectable()
export class KeycloakService {
    static auth: any = {};

    static init(): Promise<any> {
        const keycloakauth: any = Keycloak({
            url: environment.keycloakRootUrl,
            realm: 'demo',
            clientId: 'demo-client',
            'ssl-required': 'external',
            'public-client' : true
        });

        KeycloakService.auth.loggedIn = false;

        return new Promise((resolve, reject) => {
            keycloakauth.init({onLoad: 'login-required'})
                .success(() => {
                    console.log(keycloakauth);
                    KeycloakService.auth.loggedIn = true;
                    KeycloakService.auth.authz = keycloakauth;
                    KeycloakService.auth.logoutUrl = keycloakauth.authServerUrl
                                                + '/realms/demo/protocol/openid-connect/logout?redirect_uri='
                                                + document.baseURI;
                    resolve();
                })
                .error(() => {
                    reject();
                });
        });
    }

    static getUsername(): string {
        return KeycloakService.auth.authz.tokenParsed.preferred_username;
    }

    static getFullName(): string {
        return KeycloakService.auth.authz.tokenParsed.name;
    }

    logout() {
        console.log('logout');
        KeycloakService.auth.loggedIn = false;
        KeycloakService.auth.authz = null;

        window.location.href = KeycloakService.auth.logoutUrl;
    }

    getToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (KeycloakService.auth.authz.token) {
                KeycloakService.auth.authz.updateToken(5)
                .success(() => {
                    resolve(KeycloakService.auth.authz.token);
                })
                .error(() => {
                    reject('Failed to refresh token');
                });
            }
        });
    }

}
