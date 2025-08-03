import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartActions } from './cart-actions.component';
import { CartService } from '../services/cart.service';
import { TransactionInfo } from '../../core/models/transaction.model';

describe('CartActions', () => {
  let component: CartActions;
  let fixture: ComponentFixture<CartActions>;
  let mockCartService: jasmine.SpyObj<CartService>;

  const mockTransaction: TransactionInfo = {
    id: 1,
    contractorName: 'John Doe',
    accountNumber: '123456789',
    amountPaid: 100.5,
    count: 2,
  };

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', [
      'decreaseItemCount',
      'increaseItemCount',
      'getCartTransactionCountByID',
    ]);

    await TestBed.configureTestingModule({
      imports: [CartActions],
      providers: [{ provide: CartService, useValue: cartServiceSpy }],
    }).compileComponents();

    // Setup spy defaults
    cartServiceSpy.getCartTransactionCountByID.and.returnValue(2);

    fixture = TestBed.createComponent(CartActions);
    component = fixture.componentInstance;
    mockCartService = TestBed.inject(
      CartService,
    ) as jasmine.SpyObj<CartService>;

    // Set the required input
    component.tx = mockTransaction;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Validation', () => {
    it('should have required transaction input', () => {
      expect(component.tx).toEqual(mockTransaction);
    });
  });

  describe('Quantity Actions', () => {
    it('should delegate quantity operations to cart service', () => {
      const txId = mockTransaction.id;

      component.decreaseQuantity(txId);
      expect(mockCartService.decreaseItemCount).toHaveBeenCalledWith(txId);

      component.increaseQuantity(txId);
      expect(mockCartService.increaseItemCount).toHaveBeenCalledWith(txId);
    });

    it('should get transaction count by ID from cart service', () => {
      const txId = mockTransaction.id;
      
      const result = component.getTransactionCountByID(txId);
      
      expect(mockCartService.getCartTransactionCountByID).toHaveBeenCalledWith(txId);
      expect(result).toBe(2);
    });
  });
});
