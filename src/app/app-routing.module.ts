import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CardComponent} from './component/card/card.component';
import {SetupComponent} from './component/setup/setup.component';
import {LoginComponent} from './component/login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {SettingsComponent} from './component/settings/settings.component';

const routes: Routes = [
  {path: '', component: CardComponent},
  {path: 'setup', component: SetupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
