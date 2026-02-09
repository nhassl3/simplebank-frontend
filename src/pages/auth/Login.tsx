import React, { useState } from 'react';
import { authApi } from '../../api/client';
import type { LoginUserRequest } from '../../types';
import {cookieService} from "../../../utils/cookies.ts";

function Auth() {
    const [error, setError] = useState<string | null>(null);

    const [loginForm, setLoginForm] = useState<LoginUserRequest>({
        username: '',
        password: '',
    });

    const handleLoginUser = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null);
        if (cookieService.getAccessToken() !== undefined) {
            setError("You're already logged in");
            return;
        }
        try {
            const user = await authApi.login(loginForm);
            cookieService.setToken({
                accessToken: user.token,
                }
            );
            cookieService.setUsername(user.user.username);
            window.location.href = '/';
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to log in');
        }
    };

    return (
        <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Log in</h1>

            {error && (
                <div className="mb-4 bg-red-50 border text-center border-red-200 text-red-700 px-4 py-3 rounded">
                    {error.toUpperCase()}
                </div>
            )}

                    <div className="bg-white shadow rounded-lg p-6">
                        <form onSubmit={handleLoginUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    required
                                    value={loginForm.username}
                                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={loginForm.password}
                                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Log in
                            </button>
                        </form>
                    </div>
        </div>
    );
}

export default Auth;

