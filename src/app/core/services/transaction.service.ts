import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionResponse } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly dataUrl = '/assets/transaction-cart-data.json';

  private readonly http = inject(HttpClient);

  getTransactions(): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(this.dataUrl);
  }
}
