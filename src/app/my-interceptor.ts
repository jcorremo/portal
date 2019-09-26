import { Injectable } from "@angular/core";
import { retry, tap, timeout } from "rxjs/operators";
import Store from 'store'

const defaultTimeout = 30000

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, timer } from 'rxjs';

/**
 * Function which will be called for all http calls
 * We have to clone the current request and then we can add parameters to header
 * 
 * @example
 * It is the times it go to retry
 * timeout(defaultTimeout)
 * 
 * Are the times that it go to retry
 * retry(2)
 * 
 * tap: error => any action in case of a failuer
 * 
 * tap: event => any action in case of a success
 *
 */

 @Injectable()
export class MyInterceptor implements HttpInterceptor {
	constructor() { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
		const updatedRequest = request.clone({ 
			setHeaders: {
				'Authorization': Store.get('token') ? `Bearer ${Store.get('token').access_token}` : ''
				// 'Content-Type': !request.headers['Content-Type'] ? 'application/x-www-form-urlencoded' : request.headers['Content-Type'] 
			} 
		});
		console.log("Before making api call : ", updatedRequest);
    return next.handle(updatedRequest).pipe(
			timeout(defaultTimeout),
			retry(2),
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          if (event instanceof HttpResponse) {
            console.log("api call error :", event);
          }
        }
      )
    );
	}
}