import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './order-table.component.html',
})
export class OrderTableComponent {
  @Input() orders: any[] = [];
  @Input() total: number = 0;
  @Input() limit: number = 25;
  @Output() pageChange = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
} 