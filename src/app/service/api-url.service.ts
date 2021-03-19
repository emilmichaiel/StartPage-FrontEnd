import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  private apiUrl: string = 'http://localhost:8080';

  getApiUrl() {
    return this.apiUrl;
  }
  
}
