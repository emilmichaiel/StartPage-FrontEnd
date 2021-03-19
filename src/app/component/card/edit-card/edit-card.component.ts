import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CardService} from '../../../service/card.service';
import {Card} from '../../../model/card.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {

  hide: boolean = true;
  addCardForm: FormGroup;
  title = new FormControl(this.data.card.title, Validators.required);
  description = new FormControl(this.data.card.description);
  url = new FormControl(this.data.card.url, Validators.required);
  isSendingPut: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private cardService: CardService) {
  }

  ngOnInit(): void {
    this.addCardForm = new FormGroup({
      'title': this.title,
      'description': this.description,
      'url': this.url
    });
  }

  onEditCard() {
    if (this.addCardForm.valid) {;
      this.data.card.title = this.title.value;
      this.data.card.description = this.description.value;
      this.data.card.url = this.url.value;
      this.cardService.editCard(this.data.card);
    }
  }
}
