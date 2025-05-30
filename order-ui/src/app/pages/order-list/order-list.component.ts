import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order/order.service';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { OrderFiltersComponent } from './components/order-filters/order-filters.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { Country } from '../../types/country';

interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    OrderFiltersComponent,
    OrderTableComponent
  ],
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  
  pagination: PaginationState = {
    page: 0,
    limit: 25,
    total: 0
  };
  
  countryFilter: string[] = [];
  descriptionFilter = '';
  
  // TODO: Move to a separate service
  readonly COUNTRIES: Country[] = [
    { code: 'EST', name: 'Estonia' },
    { code: 'FIN', name: 'Finland' },
    { code: 'LVA', name: 'Latvia' },
    { code: 'LTU', name: 'Lithuania' },
    { code: 'SWE', name: 'Sweden' },
    { code: 'NOR', name: 'Norway' },
    { code: 'DNK', name: 'Denmark' },
    { code: 'POL', name: 'Poland' },
    { code: 'DEU', name: 'Germany' },
    { code: 'NLD', name: 'Netherlands' }
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  private resetPagination(): void {
    this.pagination.page = 0;
  }

  fetchOrders(): void {
    this.orderService.getOrders(
      this.pagination.page,
      this.pagination.limit,
      this.countryFilter,
      this.descriptionFilter
    ).subscribe(res => {
      this.orders = res.data;
      this.pagination.total = res.totalItems;
      this.pagination.limit = res.limit;
      this.pagination.page = res.page - 1;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pagination.limit = event.pageSize;
    this.pagination.page = event.pageIndex;
    this.fetchOrders();
  }

  onCountryChange(countries: string[]): void {
    this.countryFilter = countries;
    this.resetPagination();
    this.fetchOrders();
  }

  onDescriptionFilterChange(value: string): void {
    this.descriptionFilter = value;
    this.resetPagination();
    this.fetchOrders();
  }
}
