export type Currency = 'USD' | 'EUR' | 'INR' | 'GBP';

// Model for displaying payments received from the API
export interface Payment {
  id: number;
  reference: string;
  amount: number;
  currency: Currency;
  createdAt: string; // ISO date string
  clientRequestId: string;
}

// Model for the payload sent during POST/PUT operations
export interface PaymentRequest {
  amount: number;
  currency: Currency;
  clientRequestId: string;
}