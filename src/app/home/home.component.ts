import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TransactionService } from '../core/services/transaction.service';
import { CartService } from '../cart/services/cart.service';
import { TransactionInfo } from '../core/models/transaction.model';
import { Router } from '@angular/router';
import { CartTotalComponent } from '../cart/total/cart-total.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CartTotalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly txService = inject(TransactionService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  transactions: TransactionInfo[] = [];
  transactionError = false;
  loading = true;
  constructor() {
    this.loadTransactions();
  }
  loadTransactions() {
    this.txService.getTransactions().subscribe({
      next: (data) => {
        this.transactionError = false;
        this.transactions = data.transactions || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        this.transactionError = true;
        this.transactions = [];
        this.loading = false;
      },
    });
  }
  goToCart() {
    this.router.navigate(['/cart']);
  }

  cartCount() {
    return this.cartService.cartCount();
  }

  addToCart(tx: TransactionInfo) {
    this.cartService.addToCart(tx);
  }
  isInCart(txId: number): boolean {
    return this.cartService.cart().some((item) => item.id === txId);
  }
  getTransactionCountByID(txId: number): number {
    return this.cartService.cart().find((item) => item.id === txId)?.count || 0;
  }
}
