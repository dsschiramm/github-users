import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from "../interfaces/user";

@Injectable()
export class UserService {
	constructor(private http: HttpClient) {}

	public getUserList(number): Observable<User[]> {
		const options = { params: new HttpParams().set("since", `${number}`) };

		return this.http.get<User[]>("users", options);
	}
}
