
import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { getUserById } from '@/lib/sqlService';

const BlindInjectionLab = () => {
  const [userId, setUserId] = useState('');
  const [queryLog, setQueryLog] = useState<string | null>(null);
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [successfulExploit, setSuccessfulExploit] = useState(false);
  const [queryHistory, setQueryHistory] = useState<string[]>([]);

  // Check if user exists function
  const checkUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log the SQL query that would be executed (for educational purposes)
    const loggedQuery = `SELECT * FROM users WHERE id=${userId}`;
    setQueryLog(loggedQuery);
    
    // Add query to history
    setQueryHistory(prev => [loggedQuery, ...prev].slice(0, 10));
    
    // Attempt to get user
    const user = getUserById(userId);
    
    // Set whether user exists
    setUserExists(!!user);
    
    // Check if this is a successful blind injection attempt
    if (userId.includes("AND SUBSTRING") || 
        userId.includes("AND ASCII") || 
        userId.includes("AND (SELECT") || 
        userId.includes("CASE WHEN")) {
      
      // If the query contains 'admin' and 'password', we'll consider it a successful exploit
      if (loggedQuery.includes("admin") && loggedQuery.includes("password")) {
        setSuccessfulExploit(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
      {/* Header */}
      <header className="bg-[#1a1a1c] text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-semibold">User Verification System</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 bg-white shadow-md mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">User Lookup</h2>
            <p className="text-gray-600 text-sm mb-4">
              Enter a user ID to check if the user exists in our system.
              This system will only tell you if a user exists, not any details about them.
            </p>
            
            <form onSubmit={checkUser} className="mb-4">
              <div className="flex items-start gap-3">
                <div className="flex-grow">
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                    User ID
                  </label>
                  <Input
                    id="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter user ID"
                  />
                </div>
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Search className="h-4 w-4 mr-1" />
                    Check
                  </Button>
                </div>
              </div>
            </form>
          </Card>
          
          {/* SQL Query Log (only shown after search) */}
          {queryLog && (
            <div className="p-4 bg-gray-900 text-gray-200 rounded-md mb-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">SQL Query Executed:</h3>
              <pre className="font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                {queryLog}
              </pre>
            </div>
          )}
          
          {/* Results */}
          {userExists !== null && (
            <Card className={`p-4 mb-6 ${userExists ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center">
                {userExists ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <UserX className="h-5 w-5 text-red-600 mr-2" />
                )}
                <span className={`${userExists ? 'text-green-800' : 'text-red-800'}`}>
                  {userExists ? 'User exists in the system.' : 'User not found.'}
                </span>
              </div>
            </Card>
          )}
          
          {/* Query History */}
          {queryHistory.length > 0 && (
            <Card className="p-4 bg-gray-50 border border-gray-200 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Query History:</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {queryHistory.map((query, index) => (
                  <div key={index} className="p-2 bg-gray-100 text-xs font-mono rounded">
                    {query}
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Success message if blind injection is successful */}
          {successfulExploit && (
            <Card className="p-4 bg-green-100 border border-green-300 mb-6">
              <div className="flex items-start">
                <div className="bg-green-500 text-white p-2 rounded-full mr-3">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">Success! Blind SQL Injection Achieved</h3>
                  <p className="text-sm text-green-700 mb-2">
                    You've successfully performed a blind SQL injection attack to extract information character by character!
                  </p>
                  <div className="p-2 bg-gray-800 text-green-400 rounded font-mono text-xs overflow-x-auto">
                    FLAG{'{SQLi_Blind_Injection_Completed}'}
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {/* Hints Card */}
          <Card className="p-4 bg-yellow-50 border border-yellow-200">
            <h3 className="font-medium text-yellow-800 mb-2 text-sm">Lab Hint</h3>
            <p className="text-yellow-800 text-xs mb-2">
              This user verification system is vulnerable to blind SQL injection. The application only tells you 
              whether a user exists or not, but doesn't display any database results directly.
            </p>
            <p className="text-yellow-800 text-xs">
              Try to extract the admin's password one character at a time using boolean-based techniques 
              like the SUBSTRING function. Your goal is to guess each character in the admin's password.
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

export default BlindInjectionLab;
