import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Users from './pages/Users';
import Accounts from './pages/Accounts';
import Transfers from './pages/Transfers';
import Home from './pages/Home';
import AuthLogin from './pages/auth/Login';
import AuthSignup from './pages/auth/Signup';
import {useState} from "react";
import {cookieService} from "../utils/cookies.ts";

function App() {
    const [username, setUsername] = useState<string | null>(cookieService.getUsername() ?? "");

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-2xl font-bold text-blue-600"><NavLink to="/">SimpleBank</NavLink></h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`
                    }
                  >
                    Users
                  </NavLink>
                  <NavLink
                    to="/accounts"
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`
                    }
                  >
                    Accounts
                  </NavLink>
                  <NavLink
                    to="/transfers"
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`
                    }
                  >
                    Transfers
                  </NavLink>
                </div>
              </div>
                <div className="flex">
                    {username == "" && (
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <NavLink
                                to="/auth/login"
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                        isActive
                                            ? 'border-blue-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/auth/signup"
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                        isActive
                                            ? 'border-blue-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`
                                }
                            >
                                Sign up
                            </NavLink>
                        </div>
                     )
                    }
                    {
                        username != "" && (
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <NavLink
                                    to="/"
                                    onClick={() => {
                                        cookieService.clearKeys();
                                        setUsername("");
                                    }}
                                    className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Logout ( {username} )
                                </NavLink>
                            </div>
                        )
                    }
                </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/auth/login" element={<AuthLogin />} />
            <Route path="/auth/signup" element={<AuthSignup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

