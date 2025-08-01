export interface TransactionInfo {
  id: number;
  contractorName: string;
  accountNumber: string;
  amountPaid: number;
}

export interface TransactionResponse {
  transactions: TransactionInfo[];
}
