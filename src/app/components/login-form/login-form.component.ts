import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import * as moment from 'moment';
import Store from 'store'

const SESSION_TIME = 15; // In minutes

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  user = { username: '', password: '' };
  loading = false;
  error = '';

  private data: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.loading = true;
    this.loginService.login(this.user.username, this.user.password).subscribe(
      res => {
        this.data = res;
        // Get token exp
        // let tokenExp = JSON.parse(atob(this.data.jwt.split('.')[1])).exp;
        const tokenExp = moment().add(SESSION_TIME, 'm').format();
        // Save token data to session
        // sessionStorage.setItem('access_token', this.data.jwt);
				sessionStorage.setItem('access_token_exp', tokenExp);
				Store.set('token', {
					access_token: this.data.jwt,
					access_token_exp: tokenExp
				})
        // Set user
        Store.set('currentUser', {
          username: this.user.username
        })
      },
      error => {
        console.error(error);
        this.loading = false;
        this.error = 'Credenciales inválidas';
        setTimeout(() => {
          this.error = '';
          return;
        }, 3000);
      },
      () => this.navigate()
    );
  }

  navigate() {
    this.router.navigate(['/']);
  }
}
