import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewOrdersComponent } from './NewOrder/neworder.component';
import { OrderRoutingModule } from './order-routing.module';
//jitne component and sub module hai yaha dalo
//import { AdminHomeComponent } from './admin-home/admin-home.component';
//import { SuppliersComponent } from './suppliers/suppliers.component';
//import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    NewOrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderRoutingModule
  ],
  exports: [
    OrderRoutingModule,
    NewOrdersComponent

  ]
})
export class OrderModule { }

