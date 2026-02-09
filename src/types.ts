export interface User {
  username: string;
  full_name: string;
  email: string;
  created_at: string;
}

export interface LoggedUser {
    token: string;
    user: User;
}

export interface Account {
  id: number;
  owner: string;
  balance: number;
  currency: string;
  created_at: string;
}

interface Transfer {
  id: number;
  from_account_id: number;
  to_account_id: number;
  amount: number;
  created_at: string;
}

interface Entry {
  id: number;
  account_id: number;
  amount: number;
  created_at: string;
}

export interface TransferTxResponse {
  transfer: Transfer;
  from_account: Account;
  to_account:   Account;
  from_entry:   Entry;
  to_entry:    Entry;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  full_name: string;
  email: string;
}

export interface LoginUserRequest {
    username: string;
    password: string;
}

export interface CreateAccountRequest {
  owner: string;
  currency: string;
}

export interface TransferRequest {
  from_account_id: number;
  to_account_id: number;
  amount: number;
  currency: string;
}

export interface UpdateAccountRequest {
  id: number;
  balance: number;
}

export interface AddAccountBalanceRequest {
  id: number;
  amount: number;
}

export interface UpdateUserPasswordRequest {
  username: string;
  password: string;
}

export interface UpdateUserFullNameRequest {
  username: string;
  full_name: string;
}

export interface ListAccountsRequest {
  page?: number;
  limit: number;
}

