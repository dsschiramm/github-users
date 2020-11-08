import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { camelCase, mapKeys } from 'lodash';
import { map, catchError, retry, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { NotificationService } from '../services/notification.service';
import { throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
	constructor(private loaderService: LoaderService, private notificationService: NotificationService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.notificationService.close();
		this.showLoader();

		request = request.clone({
			url: request.url.replace('http://', 'https://'),
		});

		if (!request.headers.has('Content-Type')) {
			request = request.clone({
				headers: request.headers.set('Content-Type', 'application/json'),
			});
		}

		if (!request.headers.has('Accept')) {
			request = request.clone({
				headers: request.headers.set('Accept', 'application/json'),
			});
		}

		request = request.clone({ url: this.formUrl(request.url) });

		return next.handle(request).pipe(
			//retry(3),
			catchError((error: HttpErrorResponse) => this.errorHandler(error)),
			map((event: HttpEvent<any>) => this.convertCamelCaseBodyResponse(event)),
			finalize(() => this.hideLoader())
		);
	}

	private errorHandler(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.log('this is client side error');
			console.log(`Error: ${error.error.message}`);
		} else {
			console.log('this is server side error');
			console.log(`Error Code: ${error.status},  Message: ${error.message}`);

			switch (error.status) {
				case 401: //login
					this.notificationService.showError('É necessário logar para acessar o resto do conteúdo.');
					break;
				case 403: //forbidden
					this.notificationService.showError(
						'Infelizmente o limite de acesso a API do Github foi atingido, tente novamente em alguns minutos.'
					);
					break;
				default:
					return throwError(error);
					break;
			}
		}
	}

	private formUrl(url: string): string {
		return `${environment.apiUrl}/${url}`;
	}

	private showLoader(): void {
		this.loaderService.isLoading.next(true);
	}

	private hideLoader(): void {
		this.loaderService.isLoading.next(false);
	}

	private convertCamelCaseBodyResponse(event: HttpEvent<any>): HttpEvent<any> {
		if (event instanceof HttpResponse) {
			let camelCaseObject = [];

			if (event.body instanceof Array) {
				event.body.forEach((item) => {
					camelCaseObject.push(mapKeys(item, (v, k) => camelCase(k)));
				});
			} else {
				camelCaseObject = mapKeys(event.body, (v, k) => camelCase(k));
			}

			const modEvent = event.clone({ body: camelCaseObject });

			return modEvent;
		}
	}
}
