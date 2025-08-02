import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TransactionService } from './transaction.service';
import {
  TransactionResponse,
  TransactionInfo,
} from '../models/transaction.model';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch transactions with proper data structure', () => {
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

    const mockResponse: TransactionResponse = {
      transactions: mockTransactions,
    };

    service.getTransactions().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(response.transactions.length).toBe(2);
      expect(response.transactions[0].contractorName).toBe('John Doe');
      expect(response.transactions[1].amountPaid).toBe(250.75);
    });

    const req = httpMock.expectOne('/assets/transaction-cart-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP error gracefully', () => {
    service.getTransactions().subscribe({
      next: () => fail('Expected an error, not transactions'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      },
    });

    const req = httpMock.expectOne('/assets/transaction-cart-data.json');
    req.flush('File not found', { status: 404, statusText: 'Not Found' });
  });

  it('should handle empty transactions array', () => {
    const mockResponse: TransactionResponse = {
      transactions: [],
    };

    service.getTransactions().subscribe((response) => {
      expect(response.transactions).toEqual([]);
      expect(response.transactions.length).toBe(0);
    });

    const req = httpMock.expectOne('/assets/transaction-cart-data.json');
    req.flush(mockResponse);
  });
});
