
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, AlertTriangle, Shield, Database, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Learn = () => {
  const lessons = [
    {
      id: 'sql-injection-basics',
      title: 'SQL Injection Basics',
      description: 'Understand what SQL injection is, how it works, and its impact on web security.',
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: 'attack-types',
      title: 'Types of SQL Injection Attacks',
      description: 'Learn about different categories of SQL injection vulnerabilities, from basic to advanced.',
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      id: 'defense-strategies',
      title: 'Preventing SQL Injection',
      description: 'Best practices for developers to protect their applications from SQL injection attacks.',
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: 'database-specifics',
      title: 'Database-Specific Techniques',
      description: 'Explore how SQL injection varies across MySQL, PostgreSQL, MS SQL, and Oracle databases.',
      icon: <Database className="h-5 w-5" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container px-4 mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
            <p className="text-cyber-foreground/70 max-w-3xl">
              Understand SQL injection attacks, defense mechanisms, and security best practices with our comprehensive guides.
            </p>
          </div>
          
          {/* Lesson Cards */}
          <div className="grid gap-6 mb-12">
            {lessons.map(lesson => (
              <div key={lesson.id} className="border border-cyber-border rounded-lg bg-cyber-muted overflow-hidden hover:border-cyber-primary/50 transition-all">
                <Link to={`/learn/${lesson.id}`} className="block p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="p-3 bg-cyber-primary/10 rounded-full w-fit">
                      {lesson.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{lesson.title}</h3>
                      <p className="text-cyber-foreground/70">{lesson.description}</p>
                    </div>
                    
                    <ArrowRight className="hidden md:block h-6 w-6 text-cyber-primary/70" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          {/* SQL Injection Basics Preview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">SQL Injection Basics</h2>
            
            <div className="bg-cyber-background border border-cyber-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">What is SQL Injection?</h3>
              
              <p className="mb-4">
                SQL Injection (SQLi) is a type of security vulnerability that occurs when an attacker is able to insert or "inject" malicious SQL code into a query that an application sends to its database. This happens when user input is incorrectly filtered or sanitized before being used in SQL statements.
              </p>
              
              <div className="terminal p-4 mb-4">
                <code className="text-sm whitespace-pre">
                  {`// Vulnerable code example
const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
                  
// What happens when username = admin' --
// Query becomes:
SELECT * FROM users WHERE username = 'admin' -- ' AND password = 'anything'`}
                </code>
              </div>
              
              <p className="mb-6">
                In the example above, the double dash (--) is a comment indicator in SQL. Everything after it is treated as a comment and ignored by the database. This effectively removes the password check from the query.
              </p>
              
              <Link to="/learn/sql-injection-basics" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm bg-cyber-primary text-cyber-background hover:bg-cyber-secondary transition-colors">
                Continue Reading
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Additional Resources */}
          <div>
            <h2 className="text-2xl font-bold mb-4">External Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="https://portswigger.net/web-security/sql-injection" target="_blank" rel="noopener noreferrer" className="block p-6 border border-cyber-border rounded-lg bg-cyber-muted hover:border-cyber-primary/50 transition-all">
                <h3 className="text-lg font-semibold mb-2">PortSwigger SQL Injection Guide</h3>
                <p className="text-cyber-foreground/70">Comprehensive guide to SQL injection vulnerabilities and how to exploit them.</p>
              </a>
              
              <a href="https://owasp.org/www-community/attacks/SQL_Injection" target="_blank" rel="noopener noreferrer" className="block p-6 border border-cyber-border rounded-lg bg-cyber-muted hover:border-cyber-primary/50 transition-all">
                <h3 className="text-lg font-semibold mb-2">OWASP SQL Injection</h3>
                <p className="text-cyber-foreground/70">The Open Web Application Security Project's guide to SQL injection.</p>
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learn;
