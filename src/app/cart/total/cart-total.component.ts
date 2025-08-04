import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-total',
  imports: [CommonModule],
  templateUrl: './cart-total.component.html',
})
export class CartTotalComponent {
  private readonly cartService = inject(CartService);
  total(): number {
    return this.cartService.cartTotal();
  }
}
