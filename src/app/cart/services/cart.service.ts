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
      const updatedItem = {
        ...currentCartData[existingItemIndex],
        amountPaid:
          currentCartData[existingItemIndex].amountPaid + txItem.amountPaid,
        count: (currentCartData[existingItemIndex].count || 1) + 1,
        // Increment the count if it exists, otherwise set it to 1
      };
      this.cartData.update((c) =>
        c.map((item, idx) => (idx === existingItemIndex ? updatedItem : item)),
      );
    } else {
      const addedItem = {
        ...txItem,
        count: 1, // Initialize count to 1 for new items
      };
      // If the item does not exist, add it to the cart
      this.cartData.update((c) => [...c, addedItem]);
    }
  }

  removeFromCart(txID: number): void {
    this.cartData.update((cart) => cart.filter((item) => item.id !== txID));
  }
  clearCart(): void {
    this.cartData.set([]);
  }
}
