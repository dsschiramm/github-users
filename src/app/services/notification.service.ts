import { Injectable } from "@angular/core";
import {
	MatSnackBar,
	MatSnackBarConfig,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import { NotificationComponent } from "./../components/notification/notification.component";

@Injectable({
	providedIn: "root"
})
export class NotificationService {
	constructor(private snackBar: MatSnackBar) {}

	snackBarConfig: MatSnackBarConfig;
	horizontalPosition: MatSnackBarHorizontalPosition = "right";
	verticalPosition: MatSnackBarVerticalPosition = "top";
	snackBarAutoHide = "1500";

	public showSuccess(message) {
		this.snackBar.openFromComponent(NotificationComponent, {
			data: {
				message: message,
				class: "alert-primary"
			},
			duration: parseInt(this.snackBarAutoHide, 0),
			verticalPosition: this.verticalPosition,
			horizontalPosition: this.horizontalPosition
		});
	}

	public showError(message) {
		this.snackBar.openFromComponent(NotificationComponent, {
			data: { message: message, class: "alert-danger" },
			verticalPosition: this.verticalPosition,
			horizontalPosition: this.horizontalPosition
		});
	}
}
