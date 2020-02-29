import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { AuthService } from '../../core/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private servicesEndpoint = SERVER_API_URL + 'api';

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handleAccess(request, next));
    }

    private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        if (
            !request ||
            !request.url ||
            (/^http/.test(request.url) && !request.url.startsWith(SERVER_API_URL) && !request.url.startsWith(this.servicesEndpoint))
        ) {
            return next.handle(request).toPromise();
        }

        try {
            const token = await this.authService.getValidToken();
            console.log('token', token)
            if (!!token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        } catch (err) {
            // ignore
        }
        return next.handle(request).toPromise();
    }
}
