
import React, { useState } from 'react';
import { Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { login } from '@/lib/sqlService';

const LoginBypassLab = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [queryLog, setQueryLog] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsAdmin(false);
    
    try {
      // Log the SQL query that would be executed (for educational purposes)
      const loggedQuery = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
      setQueryLog(loggedQuery);
      
      // Attempt login
      const user = login(username, password);
      
      if (user) {
        setSuccess(true);
        // Check if admin access was achieved
        if (user.role === 'admin') {
          setIsAdmin(true);
        }
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
      {/* Header */}
      <header className="bg-[#1a1a1c] text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-semibold">SwiftBank Admin Portal</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Login Card */}
          <Card className="p-6 bg-white shadow-md">
            <div className="text-center mb-6">
              <Lock className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
              <p className="text-gray-500 text-sm">Enter your credentials to access the admin dashboard</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter username"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter password"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Login
                </Button>
              </div>
            </form>
            
            {/* Error message */}
            {error && (
              <div className="mt-4 bg-red-100 text-red-800 p-3 rounded-md flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            {/* Success message */}
            {success && !isAdmin && (
              <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-md flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">Login successful! However, you don't have admin privileges.</span>
              </div>
            )}
            
            {/* Admin access achieved */}
            {isAdmin && (
              <div className="mt-4 bg-green-100 text-green-800 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Admin access achieved!</span>
                </div>
                <p className="text-sm mb-2">You've successfully bypassed the login and gained admin privileges.</p>
                <div className="p-2 bg-gray-800 text-green-400 rounded font-mono text-xs overflow-x-auto">
                  FLAG{'{SQLi_AdminBypass_Completed}'}
                </div>
              </div>
            )}
          </Card>
          
          {/* SQL Query Log (only shown after login attempt) */}
          {queryLog && (
            <div className="mt-6 p-4 bg-gray-900 text-gray-200 rounded-md">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">SQL Query Executed:</h3>
              <pre className="font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                {queryLog}
              </pre>
            </div>
          )}
          
          {/* Hints Card */}
          <Card className="p-4 mt-6 bg-yellow-50 border border-yellow-200">
            <h3 className="font-medium text-yellow-800 mb-2 text-sm">Lab Hint</h3>
            <p className="text-yellow-800 text-xs">
              This login form is vulnerable to SQL injection. Try manipulating the SQL query to bypass the 
              authentication check and gain admin access.
            </p>
          </Card>
        </div>
      </main>
      
      <footer className="bg-gray-100 text-center p-4 text-sm text-gray-500">
        <p>SQLi Training Lab - For Educational Purposes Only</p>
      </footer>
    </div>
  );
};

export default LoginBypassLab;
