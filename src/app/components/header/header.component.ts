import { Component } from "@angular/core";
import { UserService } from "../../services/user.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
	constructor(private userService: UserService) {}

	public getUser(event: KeyboardEvent) {
		const login: string = (event.target as HTMLInputElement).value;

		this.userService.searchUser(login.trim());
	}
}
