import { Component, inject } from '@angular/core';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartTotalComponent } from './total/cart-total.component/cart-total.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CartTotalComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  decreaseQuantity(arg0: number) {
    throw new Error('Method not implemented.');
  }
  increaseQuantity(arg0: number) {
    throw new Error('Method not implemented.');
  }
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
}
