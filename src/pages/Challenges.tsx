
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChallengeCard from '@/components/ChallengeCard';

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
            <p className="text-cyber-foreground/70 max-w-3xl">
              Test your skills with our progressive SQL injection challenges. Each challenge simulates a real-world vulnerability with increasing difficulty.
            </p>
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
