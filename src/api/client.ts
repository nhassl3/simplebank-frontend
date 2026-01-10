import axios from 'axios';
import type {
  User,
  Account,
  Transfer,
  CreateUserRequest,
  CreateAccountRequest,
  TransferRequest,
  UpdateAccountRequest,
  AddAccountBalanceRequest,
  UpdateUserPasswordRequest,
  UpdateUserFullNameRequest,
  ListAccountsRequest,
} from '../types';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User endpoints
export const userApi = {
  create: async (data: CreateUserRequest): Promise<User> => {
    const response = await api.post<User>('/users/', data);
    return response.data;
  },

  get: async (username: string): Promise<User> => {
    const response = await api.get<User>(`/users/${username}`);
    return response.data;
  },

  updatePassword: async (data: UpdateUserPasswordRequest): Promise<User> => {
    const response = await api.put<User>('/users/update/password', data);
    return response.data;
  },

  updateFullName: async (data: UpdateUserFullNameRequest): Promise<User> => {
    const response = await api.put<User>('/users/update/fullname', data);
    return response.data;
  },

  delete: async (username: string): Promise<void> => {
    await api.delete(`/users/${username}`);
  },
};

// Account endpoints
export const accountApi = {
  create: async (data: CreateAccountRequest): Promise<Account> => {
    const response = await api.post<Account>('/accounts/', data);
    return response.data;
  },

  get: async (id: number): Promise<Account> => {
    const response = await api.get<Account>(`/accounts/${id}`);
    return response.data;
  },

  list: async (params: ListAccountsRequest): Promise<Account[]> => {
    const response = await api.get<Account[]>('/accounts/', { params });
    return response.data;
  },

  updateBalance: async (data: UpdateAccountRequest): Promise<Account> => {
    const response = await api.put<Account>('/accounts/', data);
    return response.data;
  },

  addBalance: async (data: AddAccountBalanceRequest): Promise<Account> => {
    const response = await api.put<Account>('/accounts/addBalance', data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/accounts/${id}`);
  },
};

// Transfer endpoints
export const transferApi = {
  create: async (data: TransferRequest): Promise<Transfer> => {
    const response = await api.post<Transfer>('/transfers/', data);
    return response.data;
  },
};

export default api;

