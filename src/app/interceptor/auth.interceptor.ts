import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.admin.pipe(
      take(1),
      exhaustMap(admin => {
          if (!admin) {
            return next.handle(req);
          }
          const modifiedReq = req.clone({
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + admin._token)
          });
          return next.handle(modifiedReq);
        }
      )
    );
  }

}
