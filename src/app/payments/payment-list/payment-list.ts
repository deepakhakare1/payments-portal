import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Payment } from '../../models/payment.model';
import { PaymentService } from '../payment.service';
import { CommonModule } from '@angular/common';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="list-container">
      <mat-card class="mat-elevation-z4">
        <mat-card-header class="header-row">
          <mat-card-title>Payments List</mat-card-title>
          <button mat-flat-button color="primary" routerLink="/payments/create">
            <mat-icon>add</mat-icon> Add Payment
          </button>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="payments" class="full-width-table">

            <ng-container matColumnDef="reference">
              <th mat-header-cell *matHeaderCellDef> Reference </th>
              <td mat-cell *matCellDef="let element"> {{element.reference}} </td>
            </ng-container>

            <ng-container matColumnDef="amount">
              <th mat-header-cell *matHeaderCellDef> Amount </th>
              <td mat-cell *matCellDef="let element"> {{element.amount | currency:element.currency}} </td>
            </ng-container>

            <ng-container matColumnDef="currency">
              <th mat-header-cell *matHeaderCellDef> Currency </th>
              <td mat-cell *matCellDef="let element"> {{element.currency}} </td>
            </ng-container>

            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef> Created At </th>
              <td mat-cell *matCellDef="let element"> {{element.createdAt | date:'short'}} </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let element">
                <button mat-icon-button color="accent" [routerLink]="['/payments/edit', element.id]" title="Edit">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deletePayment(element.id)" title="Delete">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell" colspan="5">No payments found. Click "Add Payment" to create one.</td>
            </tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .list-container { padding: 20px; }
    .header-row { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      padding-bottom: 10px;
    }
    mat-card-title { margin-right: auto; }
    .full-width-table { width: 100%; }
  `]
})
export class PaymentListComponent implements OnInit {
  private paymentService = inject(PaymentService);
  payments: Payment[] = [];
  displayedColumns: string[] = ['reference', 'amount', 'currency', 'createdAt', 'actions'];

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getPayments().subscribe({
      next: (data) => this.payments = data,
      error: (err) => console.error('Failed to load payments:', err)
    });
  }

  deletePayment(id: number): void {
    if (confirm('Confirm deletion? This action cannot be undone.')) {
      this.paymentService.deletePayment(id).subscribe({
        next: () => {
          console.log(`Payment ${id} deleted.`);
          this.loadPayments(); // Reload the list
        },
        error: (err) => console.error('Failed to delete payment:', err)
      });
    }
  }
}