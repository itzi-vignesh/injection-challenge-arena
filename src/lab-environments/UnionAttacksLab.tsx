
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Database, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { searchProducts } from '@/lib/sqlService';

interface SearchResult {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

const UnionAttacksLab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [queryLog, setQueryLog] = useState<string | null>(null);
  const [hasSensitiveData, setHasSensitiveData] = useState(false);
  const [categoriesList] = useState(['electronics', 'furniture', 'clothing', 'books']);

  // Search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log the SQL query that would be executed (for educational purposes)
    const loggedQuery = `SELECT id, name, description, price FROM products WHERE category='${searchTerm}'`;
    setQueryLog(loggedQuery);
    
    // Perform search
    const searchResults = searchProducts(searchTerm);
    setResults(searchResults);
    
    // Check if sensitive data was extracted (password field is exposed)
    const hasSensitiveInfo = searchResults.some(item => 
      item.description && typeof item.description === 'string' && 
      (item.description.includes('password') || item.name === 'admin')
    );
    
    setHasSensitiveData(hasSensitiveInfo);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
      {/* Header */}
      <header className="bg-[#1a1a1c] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">TechMart Store</h1>
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5" />
            <span className="ml-2">Cart (0)</span>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 bg-white shadow-md mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Product Search</h2>
            
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex items-start gap-3">
                <div className="flex-grow">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Search by Category
                  </label>
                  <Input
                    id="category"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter category (e.g., electronics, furniture)"
                  />
                </div>
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Search className="h-4 w-4 mr-1" />
                    Search
                  </Button>
                </div>
              </div>
            </form>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-gray-600 mr-1">Popular categories:</span>
              {categoriesList.map(category => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSearchTerm(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
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
          {results.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Search Results</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {results.map((result, index) => (
                  <Card key={index} className="p-4 border border-gray-200">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-800">{result.name}</h4>
                      {typeof result.price === 'number' ? (
                        <span className="font-medium text-green-600">${result.price.toFixed(2)}</span>
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      Category: {result.category}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {results.length === 0 && queryLog && (
            <div className="text-center p-8 bg-gray-100 rounded-md mb-6">
              <Database className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No products found for the specified category.</p>
            </div>
          )}
          
          {/* Success message if sensitive data is found */}
          {hasSensitiveData && (
            <Card className="p-4 bg-green-100 border border-green-300 mb-6">
              <div className="flex items-start">
                <div className="bg-green-500 text-white p-2 rounded-full mr-3">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">Success! Sensitive Data Extracted</h3>
                  <p className="text-sm text-green-700 mb-2">
                    You've successfully performed a UNION-based SQL injection attack and extracted sensitive user data!
                  </p>
                  <div className="p-2 bg-gray-800 text-green-400 rounded font-mono text-xs overflow-x-auto">
                    FLAG{'{SQLi_UNION_Attack_Completed}'}
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {/* Hints Card */}
          <Card className="p-4 bg-yellow-50 border border-yellow-200">
            <h3 className="font-medium text-yellow-800 mb-2 text-sm">Lab Hint</h3>
            <p className="text-yellow-800 text-xs">
              This product search is vulnerable to UNION-based SQL injection. Try to craft a query that 
              returns data from another table in the database, such as the users table. First, 
              determine how many columns are in the current query result.
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

export default UnionAttacksLab;
