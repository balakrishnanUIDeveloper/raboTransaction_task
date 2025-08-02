import { Component, inject, Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { TransactionInfo } from '../../core/models/transaction.model';

@Component({
  selector: 'app-cart-actions',
  imports: [],
  templateUrl: './cart-actions.component.html',
  styleUrl: './cart-actions.component.scss',
})
export class CartActions {
  private readonly cartService = inject(CartService);
  @Input()
  tx!: TransactionInfo;

  decreaseQuantity(txId: number) {
    this.cartService.decreaseItemCount(txId);
  }

  increaseQuantity(txId: number) {
    this.cartService.increaseItemCount(txId);
  }
}
