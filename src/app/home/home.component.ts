import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TransactionService } from '../core/services/transaction.service';
import { CartService } from '../cart/services/cart.service';
import { TransactionInfo } from '../shared/models/transaction.model';
import { Router } from '@angular/router';
import { CartTotalComponent } from '../cart/total/cart-total.component/cart-total.component';

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
  constructor() {
    this.loadTransactions();
  }
  loadTransactions() {
    this.txService.getTransactions().subscribe(
      (data) => {
        this.transactions = data.transactions || [];
      },
      (error) => {
        console.error('Error loading transactions:', error);
      },
    );
  }
  goToCart() {
    this.router.navigate(['/cart']);
  }

  cartCount() {
    return this.cartService.cartCount();
  }

  addToCart(tx: TransactionInfo) {
    this.cartService.addToCart(tx);
    console.log('Transaction added to cart:', this.cartService.cart());
    console.log('transaction:', this.transactions);
  }
}
