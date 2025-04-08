
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChallengeCard from '@/components/ChallengeCard';
import { Link } from 'react-router-dom';
import { Terminal, Server, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Challenges = () => {
  const challenges = [
    {
      id: 'login-bypass',
      title: 'Basic Login Bypass',
      difficulty: 'easy',
      description: 'Learn how to bypass a simple login form using basic SQL injection techniques.',
      isCompleted: false,
      isLocked: false
    },
    {
      id: 'union-attacks',
      title: 'UNION Attacks',
      difficulty: 'medium',
      description: 'Use UNION operators to extract data from different database tables.',
      isCompleted: false,
      isLocked: false
    },
    {
      id: 'blind-injection',
      title: 'Blind SQL Injection',
      difficulty: 'hard',
      description: 'Learn to extract data when no direct output is visible using boolean-based techniques.',
      isCompleted: false,
      isLocked: false
    },
    {
      id: 'time-based',
      title: 'Time-Based Blind Injection',
      difficulty: 'hard',
      description: 'Use time delays to extract information when no visible feedback is available.',
      isCompleted: false,
      isLocked: true
    },
    {
      id: 'error-based',
      title: 'Error-Based Extraction',
      difficulty: 'medium',
      description: 'Exploit database error messages to extract hidden data.',
      isCompleted: false,
      isLocked: true
    },
    {
      id: 'advanced-union',
      title: 'Advanced UNION Attacks',
      difficulty: 'extreme',
      description: 'Navigate complex filtering and character restrictions in UNION-based attacks.',
      isCompleted: false,
      isLocked: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container px-4 mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">SQL Injection Challenges</h1>
            <p className="text-cyber-foreground/70 max-w-3xl mb-6">
              Test your skills with our progressive SQL injection challenges. Each challenge simulates a real-world vulnerability with increasing difficulty.
            </p>
            
            <Card className="p-5 bg-cyber-primary/10 border border-cyber-primary/30 mb-8">
              <div className="flex items-start">
                <Info className="h-6 w-6 text-cyber-primary mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold text-cyber-primary mb-2">New! Containerized Lab Environments</h3>
                  <p className="text-sm mb-4">
                    We've upgraded our labs to run in isolated Docker containers! Each challenge now launches its own dedicated environment with a realistic vulnerable application.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/challenge-env/login-bypass">
                      <Button variant="outline" size="sm" className="border-cyber-border">
                        <Terminal className="h-4 w-4 mr-2" />
                        Try Login Bypass Lab
                      </Button>
                    </Link>
                    <Link to="/challenge-env/union-attacks">
                      <Button variant="outline" size="sm" className="border-cyber-border">
                        <Terminal className="h-4 w-4 mr-2" />
                        Try UNION Attacks Lab
                      </Button>
                    </Link>
                    <Link to="/challenge-env/blind-injection">
                      <Button variant="outline" size="sm" className="border-cyber-border">
                        <Terminal className="h-4 w-4 mr-2" />
                        Try Blind Injection Lab
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Challenge Modules</h2>
              <div className="flex items-center gap-2 text-sm">
                <Server className="h-4 w-4 text-cyber-primary" />
                <span className="text-cyber-foreground/70">Powered by Docker containers</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map(challenge => (
              <ChallengeCard
                key={challenge.id}
                id={challenge.id}
                title={challenge.title}
                difficulty={challenge.difficulty as 'easy' | 'medium' | 'hard' | 'extreme'}
                description={challenge.description}
                isCompleted={challenge.isCompleted}
                isLocked={challenge.isLocked}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;
