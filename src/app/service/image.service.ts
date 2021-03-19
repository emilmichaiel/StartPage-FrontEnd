import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrlService} from './api-url.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Image} from '../model/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private uploadApiUrl: string;
  private getApiUrl: string;

  constructor(private http: HttpClient,
              private apiUrlService: ApiUrlService,
              private _snackBar: MatSnackBar) {
    this.uploadApiUrl = this.apiUrlService + '/api/v1/image/upload';
    this.getApiUrl = this.apiUrlService + '/api/v1/image/get/';
  }

  uploadImage(imageFile: File) {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', imageFile, imageFile.name);
    return this.http.post<Image>('http://localhost:8080/api/v1/image/upload', uploadImageData, {observe: 'response'});
  }

  getBase64Image(id: number) {
    return this.http.get<Image>('http://localhost:8080/api/v1/image/get/' + id, {observe: 'response'});
  }


  triggerSnackBar(res: any) {
    if (res.status === 200) {
      this._snackBar.open('Image uploaded Successfully', 'close', {duration: 5000});
    } else {
      this._snackBar.open('Image not uploaded!', 'close', {duration: 5000});
    }
  }
}
