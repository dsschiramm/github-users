import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User, buildUser } from '../interfaces/user';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Repository } from '../interfaces/repository';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient, private router: Router) {}

	private userSearched = new BehaviorSubject<User>(buildUser());

	public getUserList(page: number): Observable<User[]> {
		const options = { params: new HttpParams().set('since', `${page}`) };

		return this.http.get<User[]>('users', options);
	}

	public getRepositoryLink(login: string): string {
		return `${environment.url}/${login}?tab=repositories`;
	}

	public searchUser(login: string): void {
		if (login.length < 5 && this.router.url !== '/user') {
			this.router.navigate(['/user']);
		} else if (login.length >= 5) {
			this.http.get<User>(`users/${login}`).subscribe((user: User) => {
				if (user) {
					this.userSearched.next(user);

					if (!this.router.url.includes('/user/')) {
						this.router.navigate([`/user/${user.login}`]);
					}
				} else {
					console.log('USUARIO NAO ENCONTRADO');
				}
			});
		}
	}

	public getUserSearched(): Observable<User> {
		return this.userSearched.asObservable();
	}

	public getUserRepositories(login: string): Observable<Repository[]> {
		const options = { params: new HttpParams().set('sort', 'pushed') };

		return this.http.get<Repository[]>(`users/${login}/repos`, options);
	}
}
