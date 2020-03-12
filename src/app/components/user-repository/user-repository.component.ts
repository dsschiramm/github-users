import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base.component';
import { takeUntil } from 'rxjs/operators';
import { Repository } from 'src/app/interfaces/repository';

@Component({
	selector: 'app-user-repository',
	templateUrl: './user-repository.component.html',
	styleUrls: ['./user-repository.component.css'],
})
export class UserRepositoryComponent extends BaseComponent implements OnInit {
	constructor(private userService: UserService, private route: ActivatedRoute) {
		super();
	}

	@Input() login: string;
	public repositoryList: Repository[];

	ngOnInit(): void {
		// this.route.params.pipe(takeUntil(this.destroyed$)).subscribe(params => {
		// 	this.userService.getUserRepositories(params.id);
		// });
		console.log('nginit');
		console.log(this.login);

		this.userService.getUserRepositories(this.login).subscribe((repositoryList: Repository[]) => {
			console.log(repositoryList);
			this.repositoryList = repositoryList;
		});
	}
}
