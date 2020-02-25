import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from "../interfaces/user";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root"
})
export class UserService {
	constructor(private http: HttpClient) {}

	private userSearched = new Subject<any>();

	public getUserList(page: number): Observable<User[]> {
		const options = { params: new HttpParams().set("since", `${page}`) };

		return this.http.get<User[]>("users", options);
	}

	public getRepositoryLink(login: string): string {
		return `${environment.url}/${login}?tab=repositories`;
	}

	public searchUser(login: string): void {
		this.http
			.get<User>(`users/${login}`)
			.subscribe((user: User) => this.userSearched.next(user));
	}

	public getUserSearched(): Observable<User> {
		return this.userSearched.asObservable();
	}
}
