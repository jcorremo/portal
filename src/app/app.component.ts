import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { ThemeService } from './services/theme.service';
import { Theme, everis } from './models/theme';
// Ngrx
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, getJSONData } from './app.state';
import { GetJSONData } from './state';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data$: Observable<any>

  // logged = JSON.parse(sessionStorage.getItem('currentUser'));
  themes: Theme[]
  defaultTheme: Theme = everis

  activeTheme: Theme
  
  logged = this.userService.getUserLoggedIn()
  
  constructor(
    private router: Router,
    private userService: UserService,
    private theme: ThemeService,
    private store: Store<AppState>
	) {}

  ngOnInit(): void {
    this.newData();
    this.data$ = this.store.pipe(select(getJSONData))

    this.initTheme()
    if (!this.logged) {
      this.router.navigate(['login']);
    }
  }

  newData() {
    this.store.dispatch(new GetJSONData({
      theme: '',
      title: '',
      logo: ''}
    ))
  }

  initTheme() {
    this.theme.getTheme().subscribe((res:any) => {
      this.themes = res.themes

      const theme = this.themes.filter(theme => theme.id === res.themeId)[0]

      if (theme) this.activeTheme = theme
      else this.activeTheme = this.defaultTheme

      document.title = `${this.activeTheme.properties.name} | Producto Digital`;
      document.querySelector('body').classList.add(`theme-${this.activeTheme.properties.selector}`);

      localStorage.setItem('theme',JSON.stringify(theme));
    })
  }
}
