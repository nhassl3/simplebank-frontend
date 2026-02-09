import React, {useState} from 'react';
import { userApi } from '../api/client';
import type { UpdateUserPasswordRequest, UpdateUserFullNameRequest } from '../types';
import {cookieService} from "../../utils/cookies.ts";
import {NavLink} from "react-router-dom";

function Users() {
  const [activeTab, setActiveTab] = useState<'view' | 'update'>('view');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Update password form
  const [updatePasswordForm, setUpdatePasswordForm] = useState<UpdateUserPasswordRequest>({
    username: '',
    password: '',
  });

  // Update full name form
  const [updateFullNameForm, setUpdateFullNameForm] = useState<UpdateUserFullNameRequest>({
    username: '',
    full_name: '',
  });

  const handleGetUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const fetchedUser = await userApi.get(username);
      setUser(fetchedUser);
      setSuccess('User fetched successfully!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch user');
      setUser(null);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await userApi.updatePassword(updatePasswordForm);
      setSuccess('Password updated successfully!');
      setUpdatePasswordForm({ username: '', password: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update password');
    }
  };

  const handleUpdateFullName = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await userApi.updateFullName(updateFullNameForm);
      setSuccess('Full name updated successfully!');
      setUpdateFullNameForm({ username: '', full_name: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update full name');
    }
  };

  const handleDeleteUser = async () => {
    if (!username || !confirm(`Are you sure you want to delete user ${username}?`)) {
      return;
    }
    setError(null);
    setSuccess(null);
    try {
      await userApi.delete(username);
      setSuccess('User deleted successfully!');
      setUser(null);
      setUsername('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete user');
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Management</h1>

      {cookieService.getUsername() == '' &&  (
          <div className="flex">
                Go to <NavLink to="/auth/login">log in</NavLink>
          </div>
      )}

      {error && (
        <div className="mb-4 bg-red-50 border text-center border-red-200 text-red-700 px-4 py-3 rounded">
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
              onClick={() => setActiveTab('view')}
              className={`${
                activeTab === 'view'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              View User
            </button>
            <button
              onClick={() => setActiveTab('update')}
              className={`${
                activeTab === 'update'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Update User
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'view' && (
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Get User</h2>
            <form onSubmit={handleGetUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Get User
              </button>
            </form>
          </div>

          {user && (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">User Details</h2>
                <button
                  onClick={handleDeleteUser}
                  className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete User
                </button>
              </div>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Username</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.username}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.full_name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created At</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(user.created_at).toLocaleString()}
                  </dd>
                </div>
                  {new Date(user.password_changed_at).getFullYear() != 1 &&
                      <div>
                          <dt className="text-sm font-medium text-gray-500">Password Updated At</dt>
                          <dd className="mt-1 text-sm text-gray-900">{new Date(user.password_changed_at).toLocaleString()}</dd>
                      </div>
                  }
              </dl>
            </div>
          )}
        </div>
      )}

      {activeTab === 'update' && (
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Update Password</h2>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  required
                  value={updatePasswordForm.username}
                  onChange={(e) => setUpdatePasswordForm({ ...updatePasswordForm, username: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  required
                  value={updatePasswordForm.password}
                  onChange={(e) => setUpdatePasswordForm({ ...updatePasswordForm, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Password
              </button>
            </form>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Update Full Name</h2>
            <form onSubmit={handleUpdateFullName} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  required
                  value={updateFullNameForm.username}
                  onChange={(e) => setUpdateFullNameForm({ ...updateFullNameForm, username: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Full Name</label>
                <input
                  type="text"
                  required
                  value={updateFullNameForm.full_name}
                  onChange={(e) => setUpdateFullNameForm({ ...updateFullNameForm, full_name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Full Name
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;

