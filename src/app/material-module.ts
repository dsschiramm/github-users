import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@NgModule({
	exports: [
		MatProgressSpinnerModule,
		MatCardModule,
		MatSnackBarModule,
		MatToolbarModule,
		MatButtonModule,
		MatInputModule,
		MatListModule,
	],
})
export class MaterialModule {}
