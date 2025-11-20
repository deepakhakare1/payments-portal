# Payments Portal – Angular Material Frontend

This is the Angular 20 + Angular Material frontend for the Payments Portal application.
It consumes a backend built with .NET Core and exposes features to:

✔ View payments

✔ Add new payments

✔ Edit existing payments

✔ Delete payments

✔ Prevent duplicate transactions via clientRequestId

✔ Display payment reference numbers (e.g., PAY-20250110-0001)


🚀 Tech Stack
Frontend

Angular 20

Angular Material UI

TypeScript

RxJS

REST API communication via HttpClient

Backend (Consumed API)

.NET Core Web API

SQLLite Database

Endpoints:

GET /api/payments

POST /api/payments

PUT /api/payments/{id}

DELETE /api/payments/{id}

GET /api/payments/{id}
