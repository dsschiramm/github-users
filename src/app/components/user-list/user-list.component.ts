import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../interfaces/user";

@Component({
	selector: "app-user-list",
	templateUrl: "./user-list.component.html",
	styleUrls: ["./user-list.component.css"],
	providers: [UserService]
})
export class UserListComponent implements OnInit {
	constructor(private userService: UserService) {}

	public userList: User[];

	ngOnInit() {
		this.userService.getUserList(0).subscribe((userList: User[]) => {
			this.userList = userList;
		});
	}

	public openRepository(login: string): void {
		window.open(this.userService.getRepositoryLink(login), "_blank");
	}
}
