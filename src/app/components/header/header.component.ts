import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;

	constructor(private userService: UserService) {}

	ngOnInit() {
		fromEvent(this.searchInput.nativeElement, 'keyup')
			.pipe(
				// get value
				map((event: any) => {
					return event.target.value.trim();
				}),
				// if character length greater then 2
				filter((res) => res.length > 3),

				// Time in milliseconds between key events
				debounceTime(1000),

				// If previous query is diffent from current
				distinctUntilChanged()

				// subscription for response
			)
			.subscribe((text: string) => {
				this.userService.searchUser(text);
			});
	}

	public getUser(event: KeyboardEvent) {
		const login: string = (event.target as HTMLInputElement).value;

		this.userService.searchUser(login.trim());
	}
}
