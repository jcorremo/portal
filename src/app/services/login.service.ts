import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // apiUrl: string = 'https://everispocaval-eval-prod.apigee.net/oauth/client_credential/accesstoken?grant_type=client_credentials';
  apiUrl: string = 'https://everispocaval-eval-prod.apigee.net/login/rs256/';

  login(user: string, password: string) {
    let body = `user=${user}&password=${password}`
    return this.http.post(
      this.apiUrl,
			body,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
    );
  }
}
