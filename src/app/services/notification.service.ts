import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarRef } from "@angular/material/snack-bar";

@Injectable({
	providedIn: "root"
})
export class NotificationService {
	constructor(private snackBar: MatSnackBar) {}

	snackBarConfig: MatSnackBarConfig;
	snackBarRef: MatSnackBarRef<any>;
	horizontalPosition: MatSnackBarHorizontalPosition = "center";
	verticalPosition: MatSnackBarVerticalPosition = "top";
	snackBarAutoHide = "1500";

	public showSuccess(message) {
		this.snackBarConfig = new MatSnackBarConfig();
		this.snackBarConfig.horizontalPosition = this.horizontalPosition;
		this.snackBarConfig.verticalPosition = this.verticalPosition;
		this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
		this.snackBarConfig.panelClass = "text-success";
		this.snackBarRef = this.snackBar.open(message, "", this.snackBarConfig);
	}

	public showError(message) {
		this.snackBarConfig = new MatSnackBarConfig();
		this.snackBarConfig.horizontalPosition = this.horizontalPosition;
		this.snackBarConfig.verticalPosition = this.verticalPosition;
		this.snackBarConfig.panelClass = "text-danger";
		this.snackBarRef = this.snackBar.open(message, "", this.snackBarConfig);
	}
}
