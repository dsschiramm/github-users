import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './http.interceptor';

export const InterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
];