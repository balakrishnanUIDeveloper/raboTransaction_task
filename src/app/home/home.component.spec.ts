import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { TransactionService } from '../core/services/transaction.service';
import { CartService } from '../cart/services/cart.service';
import {
  TransactionInfo,
  TransactionResponse,
} from '../core/models/transaction.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockTransactionService: jasmine.SpyObj<TransactionService>;
  let mockCartService: jasmine.SpyObj<CartService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockTransactions: TransactionInfo[] = [
    {
      id: 1,
      contractorName: 'John Doe',
      accountNumber: '123456789',
      amountPaid: 100.5,
    },
    {
      id: 2,
      contractorName: 'Jane Smith',
      accountNumber: '987654321',
      amountPaid: 250.75,
    },
  ];

  const mockTransactionResponse: TransactionResponse = {
    transactions: mockTransactions,
  };

  beforeEach(async () => {
    const transactionServiceSpy = jasmine.createSpyObj('TransactionService', [
      'getTransactions',
    ]);
    const cartServiceSpy = jasmine.createSpyObj('CartService', [
      'addToCart',
      'cartCount',
      'cart',
      'cartTotal',
      'getCartTransactionCountByID',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Setup default spy responses BEFORE creating the TestBed
    transactionServiceSpy.getTransactions.and.returnValue(
      of(mockTransactionResponse),
    );
    cartServiceSpy.cartCount.and.returnValue(2);
    cartServiceSpy.cart.and.returnValue([]);
    cartServiceSpy.cartTotal.and.returnValue(0);
    cartServiceSpy.getCartTransactionCountByID.and.returnValue(0);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TransactionService, useValue: transactionServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockTransactionService = TestBed.inject(
      TransactionService,
    ) as jasmine.SpyObj<TransactionService>;
    mockCartService = TestBed.inject(
      CartService,
    ) as jasmine.SpyObj<CartService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should load transactions on init', () => {
      fixture.detectChanges(); // This triggers ngOnInit/constructor

      expect(mockTransactionService.getTransactions).toHaveBeenCalled();
      expect(component.transactions).toEqual(mockTransactions);
      expect(component.loading).toBeFalse();
      expect(component.transactionError).toBeFalse();
    });
  });

  describe('Load Transactions', () => {
    it('should handle successful transaction loading', () => {
      component.loadTransactions();

      expect(component.transactions).toEqual(mockTransactions);
      expect(component.loading).toBeFalse();
      expect(component.transactionError).toBeFalse();
    });

    it('should handle service error', () => {
      const errorMessage = 'Service error';
      mockTransactionService.getTransactions.and.returnValue(
        throwError(() => new Error(errorMessage)),
      );
      spyOn(console, 'error');

      component.loadTransactions();

      expect(component.transactions).toEqual([]);
      expect(component.loading).toBeFalse();
      expect(component.transactionError).toBeTrue();
      expect(console.error).toHaveBeenCalledWith(
        'Error loading transactions:',
        jasmine.any(Error),
      );
    });
  });

  describe('Navigation', () => {
    it('should navigate to cart page', () => {
      component.goToCart();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/cart']);
    });
  });

  describe('Cart Integration', () => {
    it('should add to cart when transaction count is below limit', () => {
      const transaction = mockTransactions[0];
      mockCartService.getCartTransactionCountByID.and.returnValue(5); // Below limit

      component.addToCart(transaction);

      expect(mockCartService.addToCart).toHaveBeenCalledWith(transaction);
    });

    it('should not add to cart when transaction count exceeds limit', () => {
      const transaction = mockTransactions[0];
      mockCartService.getCartTransactionCountByID.and.returnValue(11); // Above limit

      component.addToCart(transaction);

      expect(mockCartService.addToCart).not.toHaveBeenCalled();
    });

    it('should check cart status for transactions', () => {
      const mockCartItems = [
        {
          id: 1,
          contractorName: 'Test',
          accountNumber: '123',
          amountPaid: 100,
          count: 3,
        },
      ];
      mockCartService.cart.and.returnValue(mockCartItems);
      mockCartService.getCartTransactionCountByID.and.returnValue(3);

      expect(component.isInCart(1)).toBeTrue();
      expect(component.isInCart(999)).toBeFalse();
      expect(component.getTransactionCountByID(1)).toBe(3);
    });
  });

  describe('Component State Management', () => {
    it('should update state after successful transaction load', () => {
      fixture.detectChanges();

      expect(component.transactions.length).toBe(2);
      expect(component.transactionError).toBeFalse();
      expect(component.loading).toBeFalse();
    });
  });
});
