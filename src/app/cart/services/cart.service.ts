import { computed, Injectable, signal } from '@angular/core';
import { TransactionInfo } from '../../shared/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartData = signal<TransactionInfo[]>([]);
  cart = computed(() => this.cartData());
  cartCount = computed(() => this.cartData().length);
  cartTotal = computed(() => {
    return this.cartData().reduce((sum, txitem) => sum + txitem.amountPaid, 0);
  });
  addToCart(txItem: TransactionInfo): void {
    const currentCartData = this.cartData();
    const existingItemIndex = currentCartData.findIndex(
      (item) => item.id === txItem.id,
    );
    if (existingItemIndex > -1) {
      // If the item already exists, update its amountPaid
      currentCartData[existingItemIndex].amountPaid += txItem.amountPaid;
    } else {
      // If the item does not exist, add it to the cart
      this.cartData.update((c) => [...c, txItem]);
    }
  }

  removeFromCart(txItem: TransactionInfo): void {
    this.cartData.update((cart) =>
      cart.filter((item) => item.id !== txItem.id),
    );
  }
  clearCart(): void {
    this.cartData.set([]);
  }
}
