import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  isAuth: boolean = false;
  private adminSub: Subscription;
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.adminSub = this.authService.admin.subscribe(
      admin => {
        this.isAuth = !!admin;
      }
    );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  triggerLogout(){
    this.authService.adminLogout();
  }
  ngOnDestroy(): void {
    this.adminSub.unsubscribe();
  }

}
