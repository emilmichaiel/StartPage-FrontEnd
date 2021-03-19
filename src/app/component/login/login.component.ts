import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Admin} from '../../model/admin.model';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  loginForm: FormGroup;
  username = new FormControl(null, Validators.required);
  password = new FormControl(null, Validators.required);
  isSendingPost: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': this.username,
      'password': this.password
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isSendingPost = true;
      let admin = new Admin();
      admin.username = this.username.value;
      admin.password = this.password.value;
      this.authService.adminLogin(admin);
      this.isSendingPost = false;
    }
  }
}
