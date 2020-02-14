import { Component } from "@angular/core";
import { LoaderService } from "../../services/loader.service";

@Component({
	selector: "app-loader",
	templateUrl: "./loader.component.html",
	styleUrls: ["./loader.component.css"]
})
export class LoaderComponent {
	constructor(private loaderService: LoaderService) {
		this.loaderService.isLoading.subscribe(value => (this.flShow = value));
	}

	public flShow: boolean;
	public color = "primary";
	public mode = "indeterminate";
	public value = 50;
}
