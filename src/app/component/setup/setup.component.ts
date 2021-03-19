import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Admin} from '../../model/admin.model';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  hide: boolean = true;
  regForm: FormGroup;
  username = new FormControl(null, Validators.required);
  password = new FormControl(null, Validators.required);
  passwordAgain = new FormControl(null, Validators.required);
  isSendingPost: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      'username': this.username,
      'password': this.password,
      'passwordAgain': this.passwordAgain
    });
  }

  onCreateAccount() {
    if (this.regForm.valid) {
      this.isSendingPost = true;
      let admin = new Admin();
      admin.username = this.username.value;
      admin.password = this.password.value;
      this.authService.createAccount(admin);
      this.isSendingPost = false;
    }
  }

  checkPasswords() {
    if (this.password.value !== this.passwordAgain.value) {
      this.password.setErrors({'passwordNotMatch': 'Passwords do no match'});
      this.passwordAgain.setErrors({'passwordNotMatch': 'Passwords do no match'});
    } else {
      if (this.password.value && this.passwordAgain.value) {
        this.password.setErrors(null);
        this.passwordAgain.setErrors(null);
      }
    }
  }
}
