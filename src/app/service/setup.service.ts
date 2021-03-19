import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrlService} from './api-url.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  private checkApiUrl: string;

  constructor(private apiUrlService: ApiUrlService,
              private http: HttpClient,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.checkApiUrl = this.apiUrlService.getApiUrl() + '/api/v1/setup/check';
  }

  checkSetup() {
    return this.http.get<{ status: string }>(this.checkApiUrl).subscribe(
      response => {
        this.startSetup(response);
      }, error => {
        this._snackBar.open(error.message, 'close', {duration: 5000});
      }
    );
  }

  private startSetup(response) {
    if (response.status) {
      this.router.navigate(['setup']);
    }
  }

}
