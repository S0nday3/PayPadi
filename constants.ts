
import { Transaction, User } from './types';

export const MOCK_USER: User = {
  name: 'Bola Ahmed',
  username: '@bola',
  avatarUrl: 'https://picsum.photos/seed/bola/100/100',
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn_1',
    type: 'RECEIVED',
    amount: 5000.0,
    currency: 'NGN',
    party: 'Jane Doe',
    date: '2023-10-27T10:00:00Z',
    description: 'Payment for services',
  },
  {
    id: 'txn_2',
    type: 'SENT',
    amount: 1200.5,
    currency: 'NGN',
    party: 'John Smith',
    date: '2023-10-26T15:30:00Z',
    description: 'Lunch with John',
  },
  {
    id: 'txn_3',
    type: 'TOPUP',
    amount: 10000.0,
    currency: 'NGN',
    party: 'Card Deposit',
    date: '2023-10-25T09:15:00Z',
    description: 'Added funds from card **** 1234',
  },
  {
    id: 'txn_4',
    type: 'SENT',
    amount: 350.0,
    currency: 'NGN',
    party: 'Airtime Purchase',
    date: '2023-10-24T18:45:00Z',
    description: 'MTN Airtime',
  },
  {
    id: 'txn_5',
    type: 'RECEIVED',
    amount: 2500.0,
    currency: 'NGN',
    party: 'Adebayo Adekunle',
    date: '2023-10-23T12:00:00Z',
    description: 'Refund for item',
  },
  {
    id: 'txn_6',
    type: 'SENT',
    amount: 800.0,
    currency: 'NGN',
    party: 'Local Shop',
    date: '2023-10-22T11:20:00Z',
    description: 'Groceries',
  },
];
