import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartService } from './services/cart.service';
import { TransactionInfo } from '../core/models/transaction.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockCartItems: TransactionInfo[] = [
    {
      id: 1,
      contractorName: 'John Doe',
      accountNumber: '123456789',
      amountPaid: 100.5,
      count: 2,
    },
    {
      id: 2,
      contractorName: 'Jane Smith',
      accountNumber: '987654321',
      amountPaid: 250.75,
      count: 1,
    },
  ];

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', [
      'removeFromCart',
      'cartCount',
      'cart',
      'clearCart',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    mockCartService = TestBed.inject(
      CartService,
    ) as jasmine.SpyObj<CartService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Default spy setup
    mockCartService.cart.and.returnValue(mockCartItems);
    mockCartService.cartCount.and.returnValue(mockCartItems.length);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Navigation', () => {
    it('should navigate to home page', () => {
      component.goHome();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('Cart Operations', () => {
    it('should delegate cart operations to service', () => {
      component.remove(1);
      expect(mockCartService.removeFromCart).toHaveBeenCalledWith(1);

      component.clearCart();
      expect(mockCartService.clearCart).toHaveBeenCalled();

      component.cartCount();
      expect(mockCartService.cartCount).toHaveBeenCalled();

      component.getCart();
      expect(mockCartService.cart).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty cart state', () => {
      mockCartService.cart.and.returnValue([]);
      mockCartService.cartCount.and.returnValue(0);

      expect(component.getCart()).toEqual([]);
      expect(component.cartCount()).toBe(0);
    });
  });
});
