import { useState } from 'react';
import { transferApi } from '../api/client';
import type { TransferRequest } from '../types';

function Transfers() {
  const [transferForm, setTransferForm] = useState<TransferRequest>({
    from_account_id: 0,
    to_account_id: 0,
    amount: 0,
    currency: 'USD',
  });
  const [transfer, setTransfer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreateTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const newTransfer = await transferApi.create(transferForm);
      setTransfer(newTransfer);
      setSuccess(`Transfer ${newTransfer.transfer.id} created successfully!`);
      setTransferForm({
        from_account_id: 0,
        to_account_id: 0,
        amount: 0,
        currency: 'USD',
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create transfer');
      setTransfer(null);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Money Transfers</h1>

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

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Create Transfer</h2>
        <form onSubmit={handleCreateTransfer} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From Account ID</label>
            <input
              type="number"
              required
              min="1"
              value={transferForm.from_account_id || ''}
              onChange={(e) =>
                setTransferForm({ ...transferForm, from_account_id: Number(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">To Account ID</label>
            <input
              type="number"
              required
              min="1"
              value={transferForm.to_account_id || ''}
              onChange={(e) =>
                setTransferForm({ ...transferForm, to_account_id: Number(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              required
              min="1"
              value={transferForm.amount || ''}
              onChange={(e) =>
                setTransferForm({ ...transferForm, amount: Number(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              value={transferForm.currency}
              onChange={(e) => setTransferForm({ ...transferForm, currency: e.target.value })}
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
            Create Transfer
          </button>
        </form>
      </div>

      {transfer && (
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Transfer Details</h2>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Transfer ID</dt>
              <dd className="mt-1 text-sm text-gray-900">{transfer.transfer.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Sender</dt>
              <dd className="mt-1 text-sm text-gray-900">{transfer.from_account.owner} (Personal account #{transfer.transfer.from_account_id})</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Receiver</dt>
              <dd className="mt-1 text-sm text-gray-900">{transfer.to_account.owner} (Personal account #{transfer.transfer.to_account_id})</dd>
            </div>
            <div>
                <dt className="text-sm font-medium text-gray-500">Amount</dt>
                <dd className="mt-1 text-sm text-gray-900">{transfer.transfer.amount}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(transfer.transfer.created_at).toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}

export default Transfers;

