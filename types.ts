export enum Page {
  DASHBOARD = 'DASHBOARD',
  HISTORY = 'HISTORY',
  PAY = 'PAY',
  SETTINGS = 'SETTINGS',
  CARDS = 'CARDS',
}

export type TransactionType = 'SENT' | 'RECEIVED' | 'TOPUP';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  party: string;
  date: string;
  description: string;
}

export interface User {
  name: string;
  username: string;
  avatarUrl: string;
}