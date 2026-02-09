import { useState } from 'react';
import { accountApi } from '../api/client';
import type { CreateAccountRequest, UpdateAccountRequest, AddAccountBalanceRequest, ListAccountsRequest } from '../types';

function Accounts() {
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'view' | 'update'>('create');
  const [accountId, setAccountId] = useState('');
  const [accounts, setAccounts] = useState<any[]>([]);
  const [account, setAccount] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Create account form
  const [createForm, setCreateForm] = useState<CreateAccountRequest>({
    owner: '',
    currency: 'USD',
  });

  // List accounts form
  const [listForm, setListForm] = useState<ListAccountsRequest>({
    page: 1,
    limit: 6,
  });

  // Update balance form
  const [updateBalanceForm, setUpdateBalanceForm] = useState<UpdateAccountRequest>({
    id: 0,
    balance: 0,
  });

  // Add balance form
  const [addBalanceForm, setAddBalanceForm] = useState<AddAccountBalanceRequest>({
    id: 0,
    amount: 0,
  });

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const newAccount = await accountApi.create(createForm);
      setSuccess(`Account ${newAccount.id} created successfully!`);
      setCreateForm({ owner: '', currency: 'USD' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create account');
    }
  };

  const handleListAccounts = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const fetchedAccounts = await accountApi.list(listForm);
      setAccounts(fetchedAccounts);
      setSuccess(`Found ${fetchedAccounts.length} account(s)`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to list accounts');
      setAccounts([]);
    }
  };

  const handleGetAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const fetchedAccount = await accountApi.get(Number(accountId));
      setAccount(fetchedAccount);
      setSuccess('Account fetched successfully!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch account');
      setAccount(null);
    }
  };

  const handleUpdateBalance = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const updatedAccount = await accountApi.updateBalance(updateBalanceForm);
      setSuccess(`Account balance updated to ${updatedAccount.balance}`);
      setUpdateBalanceForm({ id: 0, balance: 0 });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update balance');
    }
  };

  const handleAddBalance = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const updatedAccount = await accountApi.addBalance(addBalanceForm);
      setSuccess(`Balance updated. New balance: ${updatedAccount.balance}`);
      setAddBalanceForm({ id: 0, amount: 0 });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add balance');
    }
  };

  const handleDeleteAccount = async () => {
    if (!accountId || !confirm(`Are you sure you want to delete account ${accountId}?`)) {
      return;
    }
    setError(null);
    setSuccess(null);
    try {
      await accountApi.delete(Number(accountId));
      setSuccess('Account deleted successfully!');
      setAccount(null);
      setAccountId('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete account');
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Account Management</h1>

      {error && (
        <div className="mb-4 bg-red-50 text-center border border-red-200 text-red-700 px-4 py-3 rounded">
          {error.toUpperCase()}
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('create')}
              className={`${
                activeTab === 'create'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Create Account
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`${
                activeTab === 'list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              List Accounts
            </button>
            <button
              onClick={() => setActiveTab('view')}
              className={`${
                activeTab === 'view'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              View Account
            </button>
            <button
              onClick={() => setActiveTab('update')}
              className={`${
                activeTab === 'update'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Update Balance
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'create' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Account</h2>
          <form onSubmit={handleCreateAccount} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Owner (Username)</label>
              <input
                type="text"
                required
                value={createForm.owner}
                onChange={(e) => setCreateForm({ ...createForm, owner: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Currency</label>
              <select
                value={createForm.currency}
                onChange={(e) => setCreateForm({ ...createForm, currency: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Account
            </button>
          </form>
        </div>
      )}

      {activeTab === 'list' && (
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">List Accounts</h2>
            <form onSubmit={handleListAccounts} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Page</label>
                <input
                  type="number"
                  min="1"
                  value={listForm.page || 1}
                  onChange={(e) => setListForm({ ...listForm, page: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Limit (3, 6, 9, or 12)</label>
                <select
                  value={listForm.limit}
                  onChange={(e) => setListForm({ ...listForm, limit: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                List Accounts
              </button>
            </form>
          </div>

          {accounts.length > 0 && (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Balance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Currency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accounts.map((acc) => (
                    <tr key={acc.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {acc.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {acc.owner}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {acc.balance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {acc.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(acc.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'view' && (
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Get Account</h2>
            <form onSubmit={handleGetAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Account ID</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Get Account
              </button>
            </form>
          </div>

          {account && (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Account Details</h2>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete Account
                </button>
              </div>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{account.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Owner</dt>
                  <dd className="mt-1 text-sm text-gray-900">{account.owner}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Balance</dt>
                  <dd className="mt-1 text-sm text-gray-900">{account.balance}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Currency</dt>
                  <dd className="mt-1 text-sm text-gray-900">{account.currency}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created At</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(account.created_at).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      )}

      {activeTab === 'update' && (
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Update Account Balance</h2>
            <form onSubmit={handleUpdateBalance} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Account ID</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={updateBalanceForm.id || ''}
                  onChange={(e) => setUpdateBalanceForm({ ...updateBalanceForm, id: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Balance</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={updateBalanceForm.balance || ''}
                  onChange={(e) => setUpdateBalanceForm({ ...updateBalanceForm, balance: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Balance
              </button>
            </form>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Add/Subtract Balance</h2>
            <form onSubmit={handleAddBalance} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Account ID</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={addBalanceForm.id || ''}
                  onChange={(e) => setAddBalanceForm({ ...addBalanceForm, id: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (positive to add, negative to subtract)</label>
                <input
                  type="number"
                  required
                  value={addBalanceForm.amount || ''}
                  onChange={(e) => setAddBalanceForm({ ...addBalanceForm, amount: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Balance
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accounts;

