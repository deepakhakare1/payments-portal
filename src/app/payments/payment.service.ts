import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment, PaymentRequest } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  // NOTE: Update this URL to match your running .NET Core backend
  private apiUrl = 'https://localhost:5001/api/Payments'; 

  // GET /api/payments
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  // GET /api/payments/{id}
  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  // POST /api/payments - Sends clientRequestId for deduplication
  addPayment(request: PaymentRequest): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, request);
  }

  // PUT /api/payments/{id} - Update payment fields
  updatePayment(id: number, request: Partial<PaymentRequest>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, { id, ...request });
  }

  // DELETE /api/payments/{id}
  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}