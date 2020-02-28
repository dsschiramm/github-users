import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserComponent } from "./components/user/user.component";

const routes: Routes = [
	{ path: "user", component: UserListComponent },
	{ path: "", redirectTo: "/user", pathMatch: "full" },
	{ path: "user/:id", component: UserComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
