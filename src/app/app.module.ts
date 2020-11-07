import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material-module';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- import it
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Icons as icons } from './app.icons';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Services and Interceptors
import { InterceptorProviders } from './interceptors/import.interceptor';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';
import { LoaderService } from './services/loader.service';

// Pipe
import { BriefDescription } from './utils/brief-description.pipe';

// Components
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationComponent } from './components/notification/notification.component';
import { UserComponent } from './components/user/user.component';
import { UserRepositoryComponent } from './components/user-repository/user-repository.component';

@NgModule({
	declarations: [
		AppComponent,
		UserListComponent,
		LoaderComponent,
		HeaderComponent,
		BriefDescription,
		NotificationComponent,
		UserComponent,
		UserRepositoryComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule,
		AppRoutingModule,
		FontAwesomeModule,
		NgxChartsModule,
		LazyLoadImageModule,
	],
	providers: [InterceptorProviders, UserService, NotificationService, LoaderService],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(library: FaIconLibrary) {
		library.addIcons(...icons);
	}
}
