import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  // Import all standalone modules used in the template
  imports: [
    RouterOutlet, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button routerLink="/">
        <mat-icon>account_balance_wallet</mat-icon>
      </button>
      <span routerLink="/" style="cursor: pointer; font-size: 1.25em; font-weight: 500;">
        Payments Portal
      </span>
      <span class="spacer"></span>
      
      <button mat-button routerLink="/">Payments List</button>
      <button mat-button routerLink="/payments/create">Add New</button>
    </mat-toolbar>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    /* CSS to push the navigation links to the right */
    .spacer { flex: 1 1 auto; }
    /* Basic padding for the main content area */
    main { padding: 0 16px; }
  `]
})
export class AppComponent {
  title = 'payments-portal-fe';
}