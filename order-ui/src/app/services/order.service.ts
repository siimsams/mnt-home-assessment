import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environment';

interface OrderResponse {
  data: Order[];
  totalPages: number;
  page: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly baseUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getOrders(
    page: number,
    limit: number,
    countryCodes?: string[],
    description?: string
  ): Observable<OrderResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (countryCodes && countryCodes.length > 0) {
      countryCodes.forEach(countryCode => {
        params = params.append('countryCodes', countryCode);
      });
    }
    if (description) params = params.set('paymentDescription', description);

    return this.http.get<OrderResponse>(this.baseUrl, { params });
  }
}
