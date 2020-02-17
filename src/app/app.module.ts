import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
	FaIconLibrary,
	FontAwesomeModule
} from "@fortawesome/angular-fontawesome";
import { InterceptorProviders } from "./interceptors/import.interceptor";
import { MaterialModule } from "./material-module";
import { Icons as icons } from "./app.icons";
import { AppRoutingModule } from "./app-routing.module";
import { BriefDescription } from "./utils/brief-description.pipe";
import { AppComponent } from "./app.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { HeaderComponent } from "./components/header/header.component";
import { NotificationComponent } from "./components/notification/notification.component";

@NgModule({
	declarations: [
		AppComponent,
		UserListComponent,
		LoaderComponent,
		HeaderComponent,
		BriefDescription,
		NotificationComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule,
		AppRoutingModule,
		FontAwesomeModule
	],
	providers: [InterceptorProviders],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(library: FaIconLibrary) {
		library.addIcons(...icons);
	}
}
