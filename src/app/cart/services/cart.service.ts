import { computed, Injectable, signal } from '@angular/core';
import { TransactionInfo } from '../../core/models/transaction.model';

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

  increaseItemCount(txID: number): void {
    this.cartData.update((cart) =>
      cart.map((item) => {
        if (item.id !== txID) return item;

        const unitPrice = item.amountPaid / (item.count || 1);
        const newCount = (item.count || 1) + 1;
        const newAmountPaid = parseFloat((unitPrice * newCount).toFixed(2));

        return {
          ...item,
          count: newCount,
          amountPaid: newAmountPaid,
        };
      }),
    );
  }

  decreaseItemCount(txID: number): void {
    this.cartData.update((cart) =>
      cart.flatMap((item) => {
        if (item.id !== txID) return [item];

        const currentCount = item.count || 1;

        // Remove item if count goes to 0
        if (currentCount <= 1) return [];

        const unitPrice = item.amountPaid / currentCount;
        const newCount = currentCount - 1;
        const newAmountPaid = Number(unitPrice) * Number(newCount);

        return [
          {
            ...item,
            count: newCount,
            amountPaid: newAmountPaid,
          },
        ];
      }),
    );
  }
}
