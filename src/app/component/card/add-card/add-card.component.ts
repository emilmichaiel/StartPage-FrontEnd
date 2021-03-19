import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ImageService} from '../../../service/image.service';
import {Card} from '../../../model/card.model';
import {CardService} from '../../../service/card.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  hide: boolean = true;
  addCardForm: FormGroup;
  title = new FormControl(null, Validators.required);
  description = new FormControl(null);
  url = new FormControl(null, Validators.required);
  uploadImage = new FormControl(null, Validators.required);
  isSendingPut: boolean = false;
  selectedFile: any;
  srcResult: any;
  imageSrc: string;

  constructor(private cardService: CardService) {
  }

  ngOnInit(): void {
    this.addCardForm = new FormGroup({
      'title': this.title,
      'description': this.description,
      'url': this.url,
      'uploadImage': this.uploadImage
    });
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#imageUpload');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
      this.selectedFile = inputNode.files[0];
      this.imageSrc = URL.createObjectURL(inputNode.files[0]);
    }
  }

  onAddCard() {
    if (this.addCardForm.valid) {
      let card = new Card();
      card.title = this.title.value;
      card.description = this.description.value;
      card.url = this.url.value;
      this.cardService.addCard(this.selectedFile, card);
    }
  }

}
