import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrlService} from './api-url.service';
import {Admin} from '../model/admin.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private regApiUrl: string;
  private loginApiUrl: string;
  admin = new BehaviorSubject<Admin>(null);

  constructor(private http: HttpClient,
              private apiUrlService: ApiUrlService,
              private _snackBar: MatSnackBar,
              private router: Router) {
    this.regApiUrl = this.apiUrlService.getApiUrl() + '/api/v1/auth/register';
    this.loginApiUrl = this.apiUrlService.getApiUrl() + '/api/v1/auth';
  }

  createAccount(admin: Admin) {
    this.http.post<Admin>(this.regApiUrl, admin).subscribe(
      response => {
        this._snackBar.open('Admin [' + response.username + '] account created successfully', 'close', {duration: 5000});
        this.router.navigate(['']);
      }, error => {
        this.triggerSnackBar(error);
      }
    );
  }

  adminLogin(admin: Admin) {
    this.http.post<{ _token: string, admin: Admin }>(this.loginApiUrl, admin).subscribe(
      response => {
        this._snackBar.open('Welcome back ' + response.admin.username, 'close', {duration: 5000});
        let loggedAdmin: Admin;
        loggedAdmin = response.admin;
        loggedAdmin._token = response._token;
        this.admin.next(loggedAdmin);
        localStorage.setItem('admin', JSON.stringify(loggedAdmin));
        this.router.navigate(['']);
      }, error => {
        this.triggerSnackBar(error);
      }
    );
  }

  adminLogout() {
    this.admin.next(null);
    this._snackBar.open('Logged Out', 'close', {duration: 5000});
    localStorage.removeItem('admin')
    this.router.navigate(['']);
  }

  adminAutoLogin() {
    const loaddedAdmin: Admin = JSON.parse(localStorage.getItem('admin'));
    if (!loaddedAdmin) {
      return;
    }
    if (loaddedAdmin._token) {
      this.admin.next(loaddedAdmin);
    }
  }

  private triggerSnackBar(error: any) {
    if (error.error.message) {
      this._snackBar.open(error.error.message, 'close', {duration: 5000});
    } else {
      this._snackBar.open(error.message, 'close', {duration: 5000});
    }
  }

}
