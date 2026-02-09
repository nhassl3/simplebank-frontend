import React, { useState } from 'react';
import { authApi } from '../../api/client';
import type { CreateUserRequest } from '../../types';
import {cookieService} from "../../../utils/cookies.ts";

function Auth() {
    const [error, setError] = useState<string | null>(null);

    // Create user form
    const [createForm, setCreateForm] = useState<CreateUserRequest>({
        username: '',
        password: '',
        full_name: '',
        email: '',
    });

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (cookieService.getAccessToken() !== undefined) {
            setError("You're already logged in");
            return;
        }
        try {
            const newUser = await authApi.create(createForm);
            cookieService.setToken({
                accessToken: newUser.token,
            });
            cookieService.setUsername(newUser.user.username);
            window.location.href = '/';
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to create user');
        }
    };

    return (
        <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Sign up</h1>

            {error && (
                <div className="mb-4 bg-red-50 border text-center border-red-200 text-red-700 px-4 py-3 rounded">
                    {error.toUpperCase()}
                </div>
            )}

                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleCreateUser} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                required
                                value={createForm.username}
                                onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password (12-38 chars, alphanumeric)</label>
                            <input
                                type="password"
                                required
                                value={createForm.password}
                                onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                required
                                value={createForm.full_name}
                                onChange={(e) => setCreateForm({ ...createForm, full_name: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                required
                                value={createForm.email}
                                onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Create User
                        </button>
                    </form>
                </div>
        </div>
    );
}

export default Auth;

