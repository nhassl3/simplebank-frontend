import axios from 'axios';
import {
    User,
    Account,
    CreateUserRequest,
    CreateAccountRequest,
    TransferRequest,
    UpdateAccountRequest,
    AddAccountBalanceRequest,
    UpdateUserPasswordRequest,
    UpdateUserFullNameRequest,
    ListAccountsRequest, LoginUserRequest, LoggedUser, TransferTxResponse,
} from '../types';
import { cookieService } from '../../utils/cookies.ts';

const API_BASE_URL = '/api/v1';
const API_BASE_AUTH_URL = '/api/auth'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Подставляем актуальный access token из cookies перед каждым запросом.
// Это решает проблему, когда в axios \"залипает\" старый (например, админский) токен,
// даже после выхода из аккаунта и повторного входа обычным пользователем.
api.interceptors.request.use((config) => {
  const token = cookieService.getAccessToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${token}`;
  } else if (config.headers && 'Authorization' in config.headers) {
    delete (config.headers as any)['Authorization'];
  }

  return config;
});

const auth_api = axios.create({
    baseURL: API_BASE_AUTH_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth endpoints
export const authApi = {
    create: async (data: CreateUserRequest): Promise<LoggedUser> => {
        const response = await auth_api.post<LoggedUser>('/signup', data);
        return response.data;
    },

    login: async (data: LoginUserRequest): Promise<LoggedUser> => {
        const response = await auth_api.post<LoggedUser>('/login', data)
        return response.data;
    }
}

// User endpoints
export const userApi = {
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
  create: async (data: TransferRequest): Promise<TransferTxResponse> => {
    const response = await api.post<TransferTxResponse>('/transfers/', data);
    return response.data;
  },
};
