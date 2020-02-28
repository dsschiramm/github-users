import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../interfaces/user";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "../base.component";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "app-user",
	templateUrl: "./user.component.html",
	styleUrls: ["./user.component.css"]
})
export class UserComponent extends BaseComponent implements OnInit {
	constructor(
		private userService: UserService,
		private route: ActivatedRoute
	) {
		super();
	}

	public user: User;

	ngOnInit(): void {
		this.route.params.pipe(takeUntil(this.destroyed$)).subscribe(params => {
			this.userService.searchUser(params.id);
		});

		this.userService
			.getUserSearched()
			.pipe(takeUntil(this.destroyed$))
			.subscribe((user: User) => {
				this.user = user;
			});
	}

	public openRepository(login: string): void {
		window.open(this.userService.getRepositoryLink(login), "_blank");
	}
}
