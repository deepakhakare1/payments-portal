import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'; // GUID generator
import { PaymentService } from '../payment.service';
import { Currency, Payment, PaymentRequest } from '../../models/payment.model';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, 
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ isEditMode ? 'Edit Payment' : 'Create Payment' }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="paymentForm" (ngSubmit)="onSubmit()">
          
          <input type="hidden" formControlName="clientRequestId">

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Amount</mat-label>
            <input matInput type="number" formControlName="amount" step="0.01">
            <mat-error *ngIf="paymentForm.get('amount')?.hasError('required')">Amount is required</mat-error>
            <mat-error *ngIf="paymentForm.get('amount')?.hasError('min')">Amount must be greater than 0</mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Currency</mat-label>
            <mat-select formControlName="currency">
              <mat-option *ngFor="let c of currencies" [value]="c">
                {{ c }}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="paymentForm.get('currency')?.hasError('required')">Currency is required</mat-error>
          </mat-form-field>

          <div class="buttons">
            <button mat-flat-button type="button" (click)="router.navigate(['/'])">Cancel</button>
            <button mat-flat-button color="primary" type="submit" [disabled]="paymentForm.invalid">
              {{ isEditMode ? 'Update' : 'Save' }} Payment
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card { max-width: 600px; margin: 20px auto; }
    .full-width { width: 100%; }
    .buttons { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
  `]
})
export class PaymentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private paymentService = inject(PaymentService);
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private snackBar = inject(MatSnackBar);

  paymentForm!: FormGroup;
  isEditMode: boolean = false;
  paymentId: number | null = null;
  currencies: Currency[] = ['USD', 'EUR', 'INR', 'GBP'];
  ngOnInit(): void {
    this.paymentId = this.route.snapshot.params['id'] ?? null;;
    this.isEditMode = !!this.paymentId;
    this.paymentForm = this.fb.group({
      id: [this.paymentId], 
      amount: [null, [Validators.required, Validators.min(0.01)]],
      currency: ['USD' as Currency, Validators.required],
      // CRITICAL: Generate a NEW GUID for clientRequestId only if creating a new payment.
      clientRequestId: [this.isEditMode ? null : uuidv4()],
    });

    if (this.isEditMode && this.paymentId) {
      this.loadPaymentData(this.paymentId);
    }
  }

  loadPaymentData(id: number): void {
    this.paymentService.getPaymentById(id).subscribe({
      next: (payment: Payment) => {
        // Patch the form with received data for editing
        this.paymentForm.patchValue({
          amount: payment.amount,
          currency: payment.currency,
          // Use the existing clientRequestId for PUT, though it's typically read-only on edit
          clientRequestId: payment.clientRequestId 
        });
      },
      error: () => {
        this.snackBar.open('Error loading payment data.', 'Close');
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) return;

    const { id, amount, currency, clientRequestId } = this.paymentForm.value;
    const payload: PaymentRequest = { amount, currency, clientRequestId };

    if (this.isEditMode && id) {
      // **PUT (Update) Logic**
      this.paymentService.updatePayment(id, payload).subscribe({
        next: () => {
          this.snackBar.open('Payment updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => this.snackBar.open(`Update failed: ${err.error.title || 'Server Error'}`, 'Close')
      });
    } else {
      // **POST (Create) Logic**
      this.paymentService.addPayment(payload).subscribe({
        next: () => {
          this.snackBar.open('Payment saved successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          // Check for a specific status code (e.g., 400 Bad Request, or 409 Conflict if implemented explicitly)
          if (err.status === 400 && err.error && typeof err.error === 'string' && err.error.includes('duplicate')) {
             // Backend returned an error indicating duplicate (customize this check based on your API's error response)
            this.snackBar.open('Duplicate transaction prevented. Payment already processed.', 'Close', { duration: 5000 });
          } else {
            this.snackBar.open(`Save failed: ${err.error.title || 'Server Error'}`, 'Close');
          }
          this.router.navigate(['/']); // Redirect to list view after save attempt
        }
      });
    }
  }
}