import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CreateOrderFormComponent } from './pages/order-create/create-order-form/create-order-form.component';

@NgModule({
  declarations: [
    CreateOrderFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateOrderFormComponent
  ]
})
export class AppModule { }
