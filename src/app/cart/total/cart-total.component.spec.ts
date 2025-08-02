import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartTotalComponent } from './cart-total.component';
import { CartService } from '../services/cart.service';

describe('CartTotalComponent', () => {
  let component: CartTotalComponent;
  let fixture: ComponentFixture<CartTotalComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['cartTotal']);

    await TestBed.configureTestingModule({
      imports: [CartTotalComponent],
      providers: [{ provide: CartService, useValue: cartServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartTotalComponent);
    component = fixture.componentInstance;
    mockCartService = TestBed.inject(
      CartService,
    ) as jasmine.SpyObj<CartService>;

    // Default spy setup
    mockCartService.cartTotal.and.returnValue(150.75);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Total Calculation', () => {
    it('should delegate total calculation to cart service', () => {
      const total = component.total();

      expect(mockCartService.cartTotal).toHaveBeenCalled();
      expect(total).toBe(150.75);
    });

    it('should handle different total values', () => {
      mockCartService.cartTotal.and.returnValue(0);
      expect(component.total()).toBe(0);

      mockCartService.cartTotal.and.returnValue(999999.99);
      expect(component.total()).toBe(999999.99);
    });
  });
});
