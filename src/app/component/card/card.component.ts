import {Component, OnInit} from '@angular/core';
import {CardService} from '../../service/card.service';
import {Card} from '../../model/card.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../service/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {AddCardComponent} from './add-card/add-card.component';
import {DeleteCardComponent} from './delete-card/delete-card.component';
import {EditCardComponent} from './edit-card/edit-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards: Card[];
  isAuth: boolean = false;
  private adminSub: Subscription;
  private cardAddSub: Subscription;
  private cardDeleteSub: Subscription;

  constructor(private cardService: CardService,
              private router: Router,
              private authService: AuthService,
              public dialog: MatDialog) {
    this.cardService.getAllCards().subscribe(
      response => {
        this.cards = response.body;
      }
    );
    this.adminSub = this.authService.admin.subscribe(
      admin => {
        this.isAuth = !!admin;
      }
    );
    this.cardAddSub = this.cardService.addedCard.subscribe(
      card => {
        this.cards.push(card);
      }
    );
    this.cardDeleteSub = this.cardService.deletedCardId.subscribe(
      id => {
        this.cards = this.cards.filter(e => e.id !== id);
      }
    );
  }

  ngOnInit(): void {
  }

  openAddCardDialog() {
    this.dialog.open(AddCardComponent);
  }

  openEditCardDialog(card: Card) {
    this.dialog.open(EditCardComponent, {
      data: {
        'card': card
      }
    });
  }

  openDeleteCardDialog(id: number, title: string) {
    this.dialog.open(DeleteCardComponent, {
      data: {
        'id': id,
        'title': title
      }
    });
  }

  ngOnDestroy(): void {
    this.adminSub.unsubscribe();
    this.cardAddSub.unsubscribe();
    this.cardDeleteSub.unsubscribe();
  }
}
