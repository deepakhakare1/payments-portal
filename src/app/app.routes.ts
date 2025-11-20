// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { PaymentListComponent } from './payments/payment-list/payment-list';
import { PaymentFormComponent } from './payments/payment-form/payment-form';
import { PaymentService } from './payments/payment.service'; 
import { inject } from '@angular/core';
import { lastValueFrom } from 'rxjs'; // ⭐ Import lastValueFrom

// Function to fetch all payment IDs for prerendering
// Must return a Promise<Array<{ [key: string]: string }>>
const getPaymentParams = async () => {
    // ⭐ Get the service instance via injection function
    const paymentService = inject(PaymentService); 

    // ⭐ CORRECTED: Use lastValueFrom to convert the Observable to a Promise
    const payments = await lastValueFrom(paymentService.getPayments());

    // Map the array of Payment objects to the required array of route parameter objects
    return payments ? payments.map(p => ({ id: p.id.toString() })) : [];
};

export const routes: Routes = [
    { path: '', component: PaymentListComponent, title: 'Payments List' }, 
    { path: 'payments/create', component: PaymentFormComponent, title: 'Create Payment' }, 
    
    // Route configured for Prerendering
    { 
      path: 'payments/edit/:id', 
      component: PaymentFormComponent, 
      title: 'Edit Payment',
      // Pass the function reference to the router config (cast to any to allow custom property)
      getPrerenderParams: getPaymentParams
    } as any,
    
    { path: '**', redirectTo: '', pathMatch: 'full' }
];