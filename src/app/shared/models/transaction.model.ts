export interface TransactionInfo {
  id: number;
  contractorName: string;
  accountNumber: string;
  amountPaid: number;
  count?: number;
}

export interface TransactionResponse {
  transactions: TransactionInfo[];
}
