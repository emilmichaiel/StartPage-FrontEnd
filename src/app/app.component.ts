import {Component, OnInit} from '@angular/core';
import {SetupService} from './service/setup.service';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private setupService: SetupService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.setupService.checkSetup();
    this.authService.adminAutoLogin();
  }

}
