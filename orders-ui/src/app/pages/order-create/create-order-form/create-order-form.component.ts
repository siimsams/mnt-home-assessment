import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-create-order-form',
  templateUrl: './create-order-form.component.html',
  styleUrls: ['./create-order-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreateOrderFormComponent implements OnInit {
  orderForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      orderNumber: ['', [Validators.required]],
      paymentDescription: ['', [Validators.required]],
      streetAddress: ['', [Validators.required]],
      town: ['', [Validators.required]],
      country: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      amount: ['', [Validators.required, Validators.min(0)]],
      currency: ['', [Validators.required]],
      paymentDueDate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      
      const order: Order = this.orderForm.value;
      
      this.orderService.createOrder(order).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/orders']);
        },
        error: (error) => {
          this.isSubmitting = false;
          
          // COMMENT: This could be done better by sending error messages for each field.
          if (error.status === 400 && error.error?.message === 'Order number already exists') {
            this.errorMessage = 'This order number is already in use. Please use a different order number.';
            const orderNumberControl = this.orderForm.get('orderNumber');
            orderNumberControl?.markAsTouched();
            orderNumberControl?.setErrors({ duplicate: true });
          } else {
            this.errorMessage = error.error?.message || 'Failed to create order. Please try again.';
          }
        }
      });
    }
  }
} 