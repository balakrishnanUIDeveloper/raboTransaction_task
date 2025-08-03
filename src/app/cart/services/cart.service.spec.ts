import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { TransactionInfo } from '../../core/models/transaction.model';

describe('CartService', () => {
  let service: CartService;

  const mockTransaction1: TransactionInfo = {
    id: 1,
    contractorName: 'John Doe',
    accountNumber: '123456789',
    amountPaid: 100.5,
  };

  const mockTransaction2: TransactionInfo = {
    id: 2,
    contractorName: 'Jane Smith',
    accountNumber: '987654321',
    amountPaid: 200.75,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    service.clearCart();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should start with empty cart', () => {
      expect(service.cart()).toEqual([]);
      expect(service.cartCount()).toBe(0);
      expect(service.cartTotal()).toBe(0);
    });
  });

  describe('Add to Cart', () => {
    it('should add new item to cart', () => {
      service.addToCart(mockTransaction1);

      expect(service.cart().length).toBe(1);
      expect(service.cartCount()).toBe(1);
      expect(service.cart()[0]).toEqual({ ...mockTransaction1, count: 1 });
      expect(service.cartTotal()).toBe(100.5);
    });

    it('should add multiple different items to cart', () => {
      service.addToCart(mockTransaction1);
      service.addToCart(mockTransaction2);

      expect(service.cart().length).toBe(2);
      expect(service.cartCount()).toBe(2);
      expect(service.cartTotal()).toBe(301.25);
    });

    it('should increase count and amount when adding same item', () => {
      service.addToCart(mockTransaction1);
      service.addToCart(mockTransaction1);

      expect(service.cart().length).toBe(1);
      expect(service.cartCount()).toBe(1);
      expect(service.cart()[0].count).toBe(2);
      expect(service.cart()[0].amountPaid).toBe(201.0);
      expect(service.cartTotal()).toBe(201.0);
    });
  });

  describe('Remove from Cart', () => {
    it('should remove item from cart', () => {
      service.addToCart(mockTransaction1);
      service.addToCart(mockTransaction2);

      service.removeFromCart(1);

      expect(service.cart().length).toBe(1);
      expect(service.cartCount()).toBe(1);
      expect(service.cart()[0].id).toBe(2);
      expect(service.cartTotal()).toBe(200.75);
    });

    it('should not affect cart when removing non-existent item', () => {
      service.addToCart(mockTransaction1);

      service.removeFromCart(999);

      expect(service.cart().length).toBe(1);
      expect(service.cartCount()).toBe(1);
    });
  });

  describe('Clear Cart', () => {
    it('should clear all items from cart', () => {
      service.addToCart(mockTransaction1);
      service.addToCart(mockTransaction2);

      service.clearCart();

      expect(service.cart()).toEqual([]);
      expect(service.cartCount()).toBe(0);
      expect(service.cartTotal()).toBe(0);
    });
  });

  describe('Increase Item Count', () => {
    it('should increase count and recalculate amount', () => {
      service.addToCart(mockTransaction1);

      service.increaseItemCount(1);

      expect(service.cart()[0].count).toBe(2);
      expect(service.cart()[0].amountPaid).toBe(201.0);
    });

    it('should not affect cart when increasing non-existent item', () => {
      service.addToCart(mockTransaction1);

      service.increaseItemCount(999);

      expect(service.cart()[0].count).toBe(1);
      expect(service.cart()[0].amountPaid).toBe(100.5);
    });
  });

  describe('Decrease Item Count', () => {
    it('should decrease count and recalculate amount', () => {
      service.addToCart(mockTransaction1);
      service.addToCart(mockTransaction1); // count = 2

      service.decreaseItemCount(1);

      expect(service.cart()[0].count).toBe(1);
      expect(service.cart()[0].amountPaid).toBe(100.5);
    });

    it('should remove item when count reaches 0', () => {
      service.addToCart(mockTransaction1);

      service.decreaseItemCount(1);

      expect(service.cart()).toEqual([]);
      expect(service.cartCount()).toBe(0);
    });

    it('should not affect cart when decreasing non-existent item', () => {
      service.addToCart(mockTransaction1);

      service.decreaseItemCount(999);

      expect(service.cart().length).toBe(1);
      expect(service.cart()[0].count).toBe(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle items without initial count property', () => {
      const transactionWithoutCount = { ...mockTransaction1 };
      delete transactionWithoutCount.count;

      service.addToCart(transactionWithoutCount);

      expect(service.cart()[0].count).toBe(1);
    });

    it('should handle floating point precision in calculations', () => {
      const transactionWithDecimals: TransactionInfo = {
        id: 3,
        contractorName: 'Test',
        accountNumber: '111',
        amountPaid: 10.33,
      };

      service.addToCart(transactionWithDecimals);
      service.increaseItemCount(3);

      expect(service.cart()[0].amountPaid).toBe(20.66);
    });
  });

  describe('Get Transaction Count By ID', () => {
    it('should return correct count for existing transaction', () => {
      service.addToCart(mockTransaction1);
      service.increaseItemCount(1); // Count should be 2

      expect(service.getCartTransactionCountByID(1)).toBe(2);
    });

    it('should return 0 for non-existing transaction', () => {
      service.addToCart(mockTransaction1);

      expect(service.getCartTransactionCountByID(999)).toBe(0);
    });

    it('should return 0 for empty cart', () => {
      expect(service.getCartTransactionCountByID(1)).toBe(0);
    });
  });
});
