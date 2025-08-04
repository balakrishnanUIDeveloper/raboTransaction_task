import { Component, inject } from '@angular/core';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartTotalComponent } from './total/cart-total.component';
import { CartActions } from './cart-actions/cart-actions.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CartTotalComponent, CartActions],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  goHome(): void {
    this.router.navigate(['/']);
  }

  remove(id: number): void {
    this.cartService.removeFromCart(id);
  }

  cartCount(): number {
    return this.cartService.cartCount();
  }

  getCart() {
    return this.cartService.cart();
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
