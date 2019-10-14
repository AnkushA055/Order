import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrdersComponent } from './NewOrder/neworder.component';

const routes: Routes = [
  { path: "neworder", component: NewOrdersComponent },
  { path: "**", redirectTo: '/neworder', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }


