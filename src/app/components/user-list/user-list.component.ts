import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { BaseComponent } from '../base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css'],
})
export class UserListComponent extends BaseComponent implements OnInit {
	constructor(private userService: UserService) {
		super();
	}

	public userList: User[];
	public defaultImage = '/assets/images/defaultImageUser.png';

	ngOnInit() {
		this.userService
			.getUserList(0)
			.pipe(takeUntil(this.destroyed$))
			.subscribe((userList: User[]) => {
				this.userList = userList;
			});
	}

	public openRepository(login: string): void {
		this.userService.searchUser(login);
	}
}
