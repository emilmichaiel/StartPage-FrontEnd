import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {NavBarComponent} from './component/nav-bar/nav-bar.component';
import {CardComponent} from './component/card/card.component';
import {AppRoutingModule} from './app-routing.module';
import {SidenavListComponent} from './component/sidenav-list/sidenav-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SetupComponent} from './component/setup/setup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './component/login/login.component';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {SettingsComponent} from './component/settings/settings.component';
import {SanitizerUrlPipe} from './pipe/sanitizer-url.pipe';
import {AddCardComponent} from './component/card/add-card/add-card.component';
import {Base64Pipe} from './pipe/base64.pipe';
import { EditCardComponent } from './component/card/edit-card/edit-card.component';
import { DeleteCardComponent } from './component/card/delete-card/delete-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CardComponent,
    SidenavListComponent,
    SetupComponent,
    LoginComponent,
    SettingsComponent,
    SanitizerUrlPipe,
    AddCardComponent,
    Base64Pipe,
    EditCardComponent,
    DeleteCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
