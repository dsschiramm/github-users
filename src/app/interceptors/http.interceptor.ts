import { Injectable } from "@angular/core";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
	HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { camelCase, mapKeys } from "lodash";
import { map, catchError, retry, finalize } from "rxjs/operators";
import { LoaderService } from "../services/loader.service";
import { NotificationService } from "../services/notification.service";
import { throwError } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class RequestInterceptor implements HttpInterceptor {
	constructor(
		private loaderService: LoaderService,
		private notificationService: NotificationService
	) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		this.showLoader();

		request = request.clone({
			url: request.url.replace("http://", "https://")
		});

		if (!request.headers.has("Content-Type")) {
			request = request.clone({
				headers: request.headers.set("Content-Type", "application/json")
			});
		}

		if (!request.headers.has("Accept")) {
			request = request.clone({
				headers: request.headers.set("Accept", "application/json")
			});
		}

		// if (!request.headers.has("User-Agent")) {
		// 	request = request.clone({
		// 		headers: request.headers.set("User-Agent", "github-users")
		// 	});
		// }

		// if (!request.headers.has("login")) {
		// 	request = request.clone({
		// 		headers: request.headers.set("login", "dsschiramm")
		// 	});
		// }

		// if (!request.headers.has("Cache-Control")) {
		// 	request = request.clone({
		// 		headers: request.headers.set(
		// 			"Cache-Control",
		// 			"public, max-age=31536000"
		// 		)
		// 	});
		// }

		// if (!request.headers.has("Authorization")) {
		// 	const token: string = localStorage.getItem("token");

		// 	if (token) {
		// 		request = request.clone({
		// 			headers: request.headers.set(
		// 				"Authorization",
		// 				"Bearer " + token
		// 			)
		// 		});
		// 	}
		// }

		// if (!request.headers.has("Access-Control-Allow-Origin")) {
		// 	request = request.clone({
		// 		headers: request.headers.set("Access-Control-Allow-Origin", "*")
		// 	});
		// }

		// if (!request.headers.has("Access-Control-Allow-Methods")) {
		// 	request = request.clone({
		// 		headers: request.headers.set(
		// 			"Access-Control-Allow-Methods",
		// 			"GET,PUT,POST,DELETE"
		// 		)
		// 	});
		// }

		// if (!request.headers.has("Access-Control-Allow-Headers")) {
		// 	request = request.clone({
		// 		headers: request.headers.set(
		// 			"Access-Control-Allow-Headers",
		// 			"Content-Type"
		// 		)
		// 	});
		// }

		request = request.clone({ url: this.formUrl(request.url) });

		console.log(request);

		return next.handle(request).pipe(
			retry(3),
			catchError((error: HttpErrorResponse) => this.errorHandler(error)),
			map((event: HttpEvent<any>) =>
				this.convertCamelCaseBodyResponse(event)
			),
			finalize(() => this.successHandler())
		);
	}

	private successHandler(): any {
		this.notificationService.showSuccess("Data successfully requested.");
		this.hideLoader();
	}

	private errorHandler(error: HttpErrorResponse): any {
		this.notificationService.showError("Servidor indisponível.");
		this.hideLoader();
		return throwError(error);
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

	private convertCamelCaseBodyResponse(
		event: HttpEvent<any>
	): HttpEvent<any> {
		if (event instanceof HttpResponse) {
			let camelCaseObject = [];

			if (event.body instanceof Array) {
				event.body.forEach(item => {
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
