import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//All components of one module is imported
//import { LoginComponent } from './Components/login/login.component';
//import { AboutComponent } from './Components/about/about.component';

const routes: Routes = [
  { path: "", redirectTo:'/ordermodule', pathMatch: "full" },
  //{ path: "login", component: LoginComponent },
  //{ path: "about", component: AboutComponent },
  { path: "ordermodule", loadChildren: () => import("./OrderModule/order.module").then(m => m.OrderModule) },
  { path: "**", redirectTo: '/ordermodule', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


