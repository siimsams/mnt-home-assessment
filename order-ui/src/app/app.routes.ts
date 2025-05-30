import { Routes } from '@angular/router';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderCreateComponent } from './pages/order-create/order-create.component';

export const routes: Routes = [
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/new', component: OrderCreateComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' }
]; 