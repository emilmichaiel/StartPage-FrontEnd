import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CardService} from '../../../service/card.service';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.css']
})
export class DeleteCardComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private cardService: CardService) {
  }

  ngOnInit(): void {
  }

  onDelete() {
    this.cardService.deleteCard(this.data.id);
  }

}
