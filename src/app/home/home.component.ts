import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import * as moment from 'moment';
import { Theme, everis } from '../models/theme';
import { ThemeService } from '../services/theme.service';

const REFRESH_TIME = 1; // value in minutes
// let tokenExp;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  themes: Theme[]
  defaultTheme: Theme = everis

  activeTheme: Theme
  themeLogo: string = ""
  themeName: string = ""

  constructor(
    private router: Router,
    private userService: UserService,
    private theme: ThemeService
  ) { }

  ngOnInit() {
    this.loadLogo()
		// window.addEventListener('click', this.validateToken);
		// if (this.userService.tokenExp() < 1) this.userService.logoutUser();
    // tokenExp =  moment(sessionStorage.getItem('access_token_exp'));
  }

  ngOnDestroy() {
    // window.removeEventListener('click', this.validateToken);
  }

  validateToken = () => {
    // Compare dates
    if (this.userService.tokenExp() < 1) {
      // Token expires
      alert('Su sesión ha expirado');
      this.userService.logoutUser();
    }
    else if (this.userService.tokenExp() < REFRESH_TIME * 60) {
      // Refresh token
      console.log('need refresh token')
    }
  }

  loadLogo() {
    this.theme.getTheme().subscribe((res:any) => {
      this.themes = res.themes

      const theme = this.themes.filter(theme => theme.id === res.themeId)[0]

      if (theme) this.activeTheme = theme
      else this.activeTheme = this.defaultTheme

      this.themeLogo = `./assets/images/${this.activeTheme.properties.logo}`
      this.themeName = this.activeTheme.properties.name
    })
  }
}
