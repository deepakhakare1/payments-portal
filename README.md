# Payments Portal – Angular Material Frontend

This is the Angular 20 + Angular Material frontend for the Payments Portal application.
It consumes a backend built with .NET Core and exposes features to:

✔ View payments

✔ Add new payments

✔ Edit existing payments

✔ Delete payments

✔ Prevent duplicate transactions via clientRequestId

✔ Display payment reference numbers (e.g., PAY-20250110-0001)


# 🚀 Tech Stack
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

# 📦 Features
Payments List Page

    Material Data Table showing:
    
    Reference
    
    Amount
    
    Currency
    
    CreatedAt
    
    Material buttons for Edit & Delete
    
    "Add Payment" button opens dialog

Add / Edit Payment

    Opens a Material Dialog
    
    Fields:
    
    Amount
    
    Currency (USD, EUR, INR, GBP)
    
    Client-side UUID generated as clientRequestId
    
    On Save → Calls backend
    
    On Edit → Pre-fills values

# Validation

    amount > 0
    
    allowed currencies
    
    duplicate requests prevented by backend

# 📁 Project Structure
  <img width="235" height="488" alt="image" src="https://github.com/user-attachments/assets/e23859cf-26a4-4a42-8be1-cb3dffa485f7" />


# 🛠 Installation

1. Install dependencies
     npm install
   
2. Install Angular Material
     ng add @angular/material
   
3. Run the project
   ng serve -o

# 🧪 Sample API Flow

User adds USD 100
  → frontend sends request with GUID
  → backend generates reference:PAY-20250110-0001

User submits same clientRequestId
  → backend returns same record

User edits USD 100 → USD 150
  → backend updates record

User deletes payment
  → backend removes record

#📸 Screenshots
1. Payments list page
  <img width="942" height="305" alt="image" src="https://github.com/user-attachments/assets/6f836637-2b14-4934-b2df-3035ee791237" />

2. Add/Edit dialog
<img width="949" height="310" alt="image" src="https://github.com/user-attachments/assets/585a3176-9d22-476a-8f42-08b4e120673c" />

<img width="938" height="332" alt="image" src="https://github.com/user-attachments/assets/7f5d9b40-14b7-43c4-b6a4-6c26c0f2b0a5" />

<img width="951" height="323" alt="image" src="https://github.com/user-attachments/assets/b05b35f5-4005-419b-8771-4ad7ae61c4f6" />

<img width="947" height="406" alt="image" src="https://github.com/user-attachments/assets/f474effd-3f97-4fa4-afcb-3a7e18178903" />


3. Delete
<img width="941" height="359" alt="image" src="https://github.com/user-attachments/assets/35da8951-4039-45e8-b267-fdf7af09652a" />

<img width="942" height="314" alt="image" src="https://github.com/user-attachments/assets/4628405a-c525-41f8-8af2-41b591a6c917" />



