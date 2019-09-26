import { Injectable } from '@angular/core';
import { User } from '../models/user';
import * as moment from 'moment';
import Store from 'store'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserLoggedIn;
  public userLogged: User;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user: User) {
    this.isUserLoggedIn = true;
    this.userLogged = user;
		// sessionStorage.setItem('currentUser', JSON.stringify(user));
		Store.set('currentUser', JSON.stringify(user))
  }

  logoutUser() {
    const theme = localStorage.getItem('theme');
		sessionStorage.clear();
		Store.clearAll()
    localStorage.setItem('theme', theme);
    window.location.href = '/';
  }

  getUserLoggedIn() {
		// return JSON.parse(sessionStorage.getItem('currentUser'));
		return Store.get('currentUser');
	}
	
	tokenExp () {
		let now = moment();
		// console.log(moment(Store.get('token').access_token_exp).diff(now, 'seconds'));
		return Store.get('token') ? moment(Store.get('token').access_token_exp).diff(now, 'seconds') : 0;
	}
}
