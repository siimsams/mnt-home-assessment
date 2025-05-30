import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  displayedColumns = ['orderNumber', 'paymentDescription'];
  total = 0;
  limit = 25;
  page = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getOrders(this.page, this.limit).subscribe(res => {
      this.orders = res.data;
      this.total = res.totalPages * res.limit;
      this.limit = res.limit;
      this.page = res.page - 1;
    });
  }

  onPageChange(event: PageEvent) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.fetchOrders();
  }
}
