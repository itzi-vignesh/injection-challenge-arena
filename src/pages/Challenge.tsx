
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Lock, Info, Check, AlertTriangle, RefreshCw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TerminalOutput from '@/components/TerminalOutput';

// Mock challenges database
const challengesData = {
  'login-bypass': {
    title: 'Basic Login Bypass',
    difficulty: 'easy',
    description: 'In this challenge, you need to bypass a login form to access the admin area. The login form uses a simple SQL query to validate user credentials.',
    objective: 'Bypass the login without knowing the password.',
    hints: [
      'Try using simple string terminators',
      'What happens if you make the WHERE clause always true?',
      'Comment out the rest of the query with -- or #'
    ],
    initialCode: `SELECT * FROM users WHERE username='[INPUT_1]' AND password='[INPUT_2]'`,
    solution: "admin' --",
    successMessage: 'Congratulations! You successfully bypassed the login by injecting a comment that makes the password check ineffective.',
    explanation: 'The injected string closes the username parameter with a quote, then adds a comment (--) which makes the database ignore the password check entirely. This is a common vulnerability in poorly secured login forms.'
  },
  'union-attacks': {
    title: 'UNION Attacks',
    difficulty: 'medium',
    description: 'This challenge involves a product search feature that directly includes user input in a SQL query. Your goal is to extract data from a different table using UNION attacks.',
    objective: 'Extract user information from the users table while searching for products.',
    hints: [
      'First determine the number of columns in the current query',
      'Use UNION SELECT with the same number of columns',
      'Try to identify which columns are displayed in the results'
    ],
    initialCode: `SELECT name, description, price FROM products WHERE category='[INPUT]'`,
    solution: "' UNION SELECT username, password, email FROM users --",
    successMessage: 'Excellent work! You have successfully extracted sensitive user data using a UNION-based SQL injection attack.',
    explanation: 'The UNION operator combines the results of two SQL queries. By injecting a UNION SELECT statement targeting the users table, you were able to retrieve columns from a completely different table than the one originally queried.'
  },
  'blind-injection': {
    title: 'Blind SQL Injection',
    difficulty: 'hard',
    description: 'In this blind SQL injection challenge, the application does not display database results directly. Instead, it only shows whether a result exists or not.',
    objective: 'Extract the admin password one character at a time using boolean-based techniques.',
    hints: [
      'Focus on extracting data one character at a time',
      'Use conditional statements to determine each character',
      'ASCII and SUBSTRING functions can help compare character values'
    ],
    initialCode: `SELECT * FROM users WHERE id=[INPUT] AND username='admin'`,
    solution: "1 AND SUBSTRING((SELECT password FROM users WHERE username='admin'),1,1)='a'",
    successMessage: 'Impressive! You have successfully performed a blind SQL injection attack to extract data character by character.',
    explanation: 'Blind SQL injection requires inferring data by asking yes/no questions through SQL queries. By using SUBSTRING and comparing each character position to possible values, you can determine the content of the password one character at a time.'
  }
};

const Challenge = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const challengeData = challengesData[challengeId as keyof typeof challengesData];
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  
  // Redirect if challenge doesn't exist
  if (!challengeData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <AlertTriangle className="h-12 w-12 text-cyber-error mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Challenge Not Found</h2>
            <p className="text-cyber-foreground/70 mb-6">The challenge you're looking for doesn't exist or may have been removed.</p>
            <Link to="/challenges" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyber-muted text-cyber-foreground border border-cyber-border hover:bg-cyber-muted/80 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Challenges
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const checkSolution = () => {
    setIsLoading(true);
    setOutput(prev => [...prev, `> ${input}`]);
    
    // Simulate processing time
    setTimeout(() => {
      const processedInput = input.trim().toLowerCase();
      const processedSolution = challengeData.solution.trim().toLowerCase();
      
      if (processedInput.includes(processedSolution) || processedInput === processedSolution) {
        setOutput(prev => [
          ...prev, 
          'Executing query...',
          'Query successful.',
          'Result: Access granted!',
          'FLAG{SQLi_M4st3r_' + challengeId + '}'
        ]);
        setIsSuccess(true);
      } else if (processedInput.includes("'") || processedInput.includes('"') || processedInput.includes('--') || processedInput.includes('#') || processedInput.includes('union') || processedInput.includes('select')) {
        // Detected potential SQL injection attempt but not correct
        setOutput(prev => [
          ...prev, 
          'Executing query...',
          'Query executed, but didn\'t achieve the objective.',
          'Keep trying! You\'re on the right track.'
        ]);
      } else {
        // Regular input
        setOutput(prev => [
          ...prev, 
          'Executing query...',
          'Query executed without SQL injection.',
          'No vulnerabilities exploited.'
        ]);
      }
      setIsLoading(false);
    }, 1500);
  };
  
  const resetChallenge = () => {
    setInput('');
    setOutput([]);
    setIsSuccess(false);
    setShowSolution(false);
    setShowHint(false);
    setCurrentHint(0);
  };
  
  const showNextHint = () => {
    if (currentHint < challengeData.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      checkSolution();
    }
  };
  
  const difficultyColors = {
    easy: 'bg-green-900/20 text-green-500 border-green-800/30',
    medium: 'bg-yellow-900/20 text-yellow-500 border-yellow-800/30',
    hard: 'bg-orange-900/20 text-orange-500 border-orange-800/30',
    extreme: 'bg-red-900/20 text-red-500 border-red-800/30'
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container px-4 mx-auto">
          <div className="mb-6">
            <Link to="/challenges" className="inline-flex items-center gap-2 text-cyber-foreground/70 hover:text-cyber-primary mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Challenges
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h1 className="text-2xl md:text-3xl font-bold">{challengeData.title}</h1>
              
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs rounded-full border ${difficultyColors[challengeData.difficulty as 'easy' | 'medium' | 'hard' | 'extreme']}`}>
                  {challengeData.difficulty.charAt(0).toUpperCase() + challengeData.difficulty.slice(1)}
                </span>
                
                <button 
                  onClick={resetChallenge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-cyber-muted border border-cyber-border hover:bg-cyber-muted/80 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>
            </div>
          </div>
          
          {/* Challenge Description */}
          <div className="bg-cyber-muted border border-cyber-border rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-cyber-foreground/80 mb-4">{challengeData.description}</p>
            
            <h3 className="text-lg font-semibold mb-2">Objective</h3>
            <p className="text-cyber-foreground/80">{challengeData.objective}</p>
          </div>
          
          {/* Challenge Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">SQL Query</h3>
              <div className="terminal p-4 mb-4 overflow-x-auto">
                <code className="text-sm whitespace-pre-wrap">
                  {challengeData.initialCode}
                </code>
              </div>
              
              <div className="mb-4">
                <label htmlFor="sql-input" className="block text-sm font-medium mb-2">
                  Enter your injection payload:
                </label>
                <div className="flex">
                  <input
                    id="sql-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className="flex-grow px-4 py-2.5 bg-cyber-terminal border border-cyber-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-cyber-primary font-mono text-sm"
                    placeholder="Enter your SQL injection payload..."
                  />
                  <button
                    onClick={checkSolution}
                    disabled={isLoading || !input.trim()}
                    className="px-4 py-2 rounded-r-md bg-cyber-primary text-cyber-background font-medium hover:bg-cyber-secondary disabled:opacity-50 disabled:hover:bg-cyber-primary transition-colors"
                  >
                    Execute
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-cyber-muted border border-cyber-border hover:bg-cyber-muted/80 transition-colors"
                >
                  <Info className="h-3.5 w-3.5" />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
                
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-cyber-muted border border-cyber-border hover:bg-cyber-muted/80 transition-colors"
                >
                  <Lock className="h-3.5 w-3.5" />
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
              </div>
              
              {showHint && (
                <div className="bg-cyber-primary/10 border border-cyber-primary/30 rounded-md p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-cyber-primary">Hint {currentHint + 1}/{challengeData.hints.length}</h4>
                    
                    {currentHint < challengeData.hints.length - 1 && (
                      <button
                        onClick={showNextHint}
                        className="text-xs text-cyber-primary hover:underline"
                      >
                        Show Next Hint
                      </button>
                    )}
                  </div>
                  <p className="text-sm">{challengeData.hints[currentHint]}</p>
                </div>
              )}
              
              {showSolution && (
                <div className="bg-cyber-error/10 border border-cyber-error/30 rounded-md p-4">
                  <h4 className="font-medium text-cyber-error mb-2">Solution</h4>
                  <code className="block p-2 bg-cyber-terminal rounded text-sm mb-2">
                    {challengeData.solution}
                  </code>
                  <p className="text-sm">{challengeData.explanation}</p>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Terminal Output</h3>
              <TerminalOutput 
                output={output} 
                isLoading={isLoading}
                isSuccess={isSuccess}
              />
              
              {isSuccess && (
                <div className="mt-4 bg-cyber-success/10 border border-cyber-success/30 rounded-md p-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-success mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-cyber-success mb-2">Challenge Completed!</h4>
                      <p className="text-sm mb-3">{challengeData.successMessage}</p>
                      <Link
                        to="/challenges"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-cyber-success/20 border border-cyber-success/30 text-cyber-success hover:bg-cyber-success/30 transition-colors"
                      >
                        Continue to Next Challenge
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenge;
