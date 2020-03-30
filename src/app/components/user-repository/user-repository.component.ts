import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BaseComponent } from '../base.component';
import { takeUntil } from 'rxjs/operators';
import { Repository } from 'src/app/interfaces/repository';

@Component({
	selector: 'app-user-repository',
	templateUrl: './user-repository.component.html',
	styleUrls: ['./user-repository.component.css'],
})
export class UserRepositoryComponent extends BaseComponent implements OnInit {
	constructor(private userService: UserService) {
		super();
	}

	@Input() login: string;
	public repositoryList: Repository[];
	public languageList = [];

	// Graph properties
	public view: any[] = [600, 400];
	public showXAxis: boolean = true;
	public showYAxis: boolean = true;
	public gradient: boolean = false;
	public showXAxisLabel: boolean = true;
	public yAxisLabel: string = 'Languages';
	public xAxisLabel: string = 'Number of repositories';
	public showYAxisLabel: boolean = true;
	public colorScheme = 'cool';

	ngOnInit(): void {
		this.userService
			.getUserRepositories(this.login)
			.pipe(takeUntil(this.destroyed$))
			.subscribe((repositoryList: Repository[]) => {
				this.repositoryList = repositoryList;
				this.getLanguageByOwner();
			});
	}

	public openRepository(repositoryUrl: string): void {
		window.open(repositoryUrl, '_blank');
	}

	private getLanguageByOwner(): void {
		const languageGroup = this.repositoryList.reduce((acc, it) => {
			acc[it.language] = acc[it.language] + 1 || 1;
			return acc;
		}, {});

		let auxList = [];

		for (let language in languageGroup) {
			if (language !== 'null') {
				auxList.push({ name: language, value: languageGroup[language] });
			}
		}

		this.languageList = auxList;
	}
}
