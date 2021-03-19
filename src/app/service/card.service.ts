import {Injectable} from '@angular/core';
import {ApiUrlService} from './api-url.service';
import {HttpClient} from '@angular/common/http';
import {Card} from '../model/card.model';
import {ImageService} from './image.service';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private apiUriGetAllCard: string;
  private apiUriAddCard: string;
  private apiUriPutCard: string;
  private apiUriDeleteCard: string;
  addedCard = new Subject<Card>();
  deletedCardId = new Subject<number>();

  constructor(private apiUrlService: ApiUrlService,
              private http: HttpClient,
              private imageService: ImageService,
              private _snackBar: MatSnackBar) {
    this.apiUriGetAllCard = this.apiUrlService.getApiUrl() + '/api/v1/card/getall';
    this.apiUriAddCard = this.apiUrlService.getApiUrl() + '/api/v1/card/add';
    this.apiUriPutCard = this.apiUrlService.getApiUrl() + '/api/v1/card/update';
    this.apiUriDeleteCard = this.apiUrlService.getApiUrl() + '/api/v1/card/delete';
  }

  getAllCards() {
    return this.http.get<Card[]>(this.apiUriGetAllCard, {observe: 'response'});
  }


  addCard(imageFile: File, card: Card) {
    return this.imageService.uploadImage(imageFile)
      .subscribe(
        response => {
          card.image = response.body;
          this.http.post<Card>(this.apiUriAddCard, card, {observe: 'response'})
            .subscribe(response => {
              this.addedCard.next(response.body);
              this._snackBar.open('New card created successfully!', 'close', {duration: 5000});
            });
        }, error => {
          if (error.error.message) {
            this._snackBar.open(error.error.message, 'close', {duration: 5000});
          } else {
            this._snackBar.open(error.message, 'close', {duration: 5000});
          }
        }
      );
  }

  editCard(card: Card) {
    this.http.put(this.apiUriPutCard + '/' + card.id, card, {observe: 'response'}).subscribe(
      response => {
        if (response.status === 200) {
          this._snackBar.open('Card updated successfully', 'close', {duration: 5000});
        }
      }, error => {
        if (error.error.message) {
          this._snackBar.open(error.error.message, 'close', {duration: 5000});
        } else {
          this._snackBar.open(error.message, 'close', {duration: 5000});
        }
      }
    );

  }

  deleteCard(id: number) {
    this.http.delete(this.apiUriDeleteCard + '/' + id, {observe: 'response'}).subscribe(
      response => {
        if (response.status === 204) {
          this._snackBar.open('Card Deleted Successfully!', 'close', {duration: 5000});
          this.deletedCardId.next(id);
        }
      }, error => {
        if (error.error.message) {
          this._snackBar.open(error.error.message, 'close', {duration: 5000});
        } else {
          this._snackBar.open(error.message, 'close', {duration: 5000});
        }
      }
    );
  }

}
