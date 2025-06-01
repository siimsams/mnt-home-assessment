import { Component } from '@angular/core';
import { CreateOrderFormComponent } from './create-order-form/create-order-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [CommonModule, CreateOrderFormComponent],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.scss'
})
export class OrderCreateComponent {

}
