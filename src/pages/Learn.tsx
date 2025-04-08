
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, AlertTriangle, Shield, Database, ArrowRight, Play, FileText, Terminal } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Learn = () => {
  const lessons = [
    {
      id: 'sql-injection-basics',
      title: 'SQL Injection Basics',
      description: 'Understand what SQL injection is, how it works, and its impact on web security.',
      icon: <BookOpen className="h-5 w-5" />,
      level: 'Beginner',
      duration: '20 min'
    },
    {
      id: 'attack-types',
      title: 'Types of SQL Injection Attacks',
      description: 'Learn about different categories of SQL injection vulnerabilities, from basic to advanced.',
      icon: <AlertTriangle className="h-5 w-5" />,
      level: 'Intermediate',
      duration: '30 min'
    },
    {
      id: 'defense-strategies',
      title: 'Preventing SQL Injection',
      description: 'Best practices for developers to protect their applications from SQL injection attacks.',
      icon: <Shield className="h-5 w-5" />,
      level: 'All Levels',
      duration: '25 min'
    },
    {
      id: 'database-specifics',
      title: 'Database-Specific Techniques',
      description: 'Explore how SQL injection varies across MySQL, PostgreSQL, MS SQL, and Oracle databases.',
      icon: <Database className="h-5 w-5" />,
      level: 'Advanced',
      duration: '40 min'
    }
  ];

  const practicalGuides = [
    {
      id: 'login-bypass-guide',
      title: 'Login Bypass Techniques',
      description: 'Step-by-step guide to bypass authentication systems using SQL injection.',
      relatedChallenge: 'login-bypass',
      level: 'Beginner',
      type: 'Tutorial'
    },
    {
      id: 'union-attacks-guide',
      title: 'Mastering UNION Attacks',
      description: 'Learn how to use UNION statements to extract data from different database tables.',
      relatedChallenge: 'union-attacks',
      level: 'Intermediate',
      type: 'Tutorial'
    },
    {
      id: 'blind-injection-guide',
      title: 'Blind SQL Injection Strategies',
      description: 'Techniques for extracting data when you can\'t see the query results directly.',
      relatedChallenge: 'blind-injection',
      level: 'Advanced',
      type: 'Tutorial'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container px-4 mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
            <p className="text-cyber-foreground/70 max-w-3xl">
              Understand SQL injection attacks, defense mechanisms, and security best practices with our comprehensive guides.
            </p>
          </div>
          
          <Tabs defaultValue="lessons" className="mb-12">
            <TabsList className="mb-6 bg-cyber-muted border border-cyber-border">
              <TabsTrigger value="lessons" className="data-[state=active]:bg-cyber-primary/20">Educational Lessons</TabsTrigger>
              <TabsTrigger value="guides" className="data-[state=active]:bg-cyber-primary/20">Practical Guides</TabsTrigger>
            </TabsList>
            
            <TabsContent value="lessons">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {lessons.map(lesson => (
                  <Card key={lesson.id} className="border-cyber-border bg-cyber-muted hover:border-cyber-primary/50 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="p-2 bg-cyber-primary/10 rounded-full">
                          {lesson.icon}
                        </div>
                        <Badge variant="outline" className="bg-cyber-primary/5 text-cyber-primary border-cyber-primary/20">
                          {lesson.level}
                        </Badge>
                      </div>
                      <CardTitle className="mt-3">{lesson.title}</CardTitle>
                      <CardDescription className="text-cyber-foreground/70">{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-cyber-foreground/70">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>Reading time: {lesson.duration}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/learn/${lesson.id}`} className="inline-flex items-center gap-1.5 text-cyber-primary hover:text-cyber-secondary">
                        Start Learning
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {practicalGuides.map(guide => (
                  <Card key={guide.id} className="border-cyber-border bg-cyber-muted hover:border-cyber-primary/50 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="bg-cyber-primary/5 text-cyber-primary border-cyber-primary/20">
                          {guide.level}
                        </Badge>
                        <Badge variant="outline" className="bg-cyber-muted border-cyber-border">
                          {guide.type}
                        </Badge>
                      </div>
                      <CardTitle className="mt-3">{guide.title}</CardTitle>
                      <CardDescription className="text-cyber-foreground/70">{guide.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Link to={`/learn/${guide.id}`} className="inline-flex items-center gap-1.5 text-cyber-primary hover:text-cyber-secondary">
                        Read Guide
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      
                      <Link to={`/challenge-env/${guide.relatedChallenge}`} className="inline-flex items-center gap-1.5 text-cyber-foreground/70 hover:text-cyber-primary">
                        Try Lab
                        <Terminal className="h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* SQL Injection Basics Preview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">SQL Injection Basics</h2>
            
            <div className="bg-cyber-background border border-cyber-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">What is SQL Injection?</h3>
              
              <p className="mb-4">
                SQL Injection (SQLi) is a type of security vulnerability that occurs when an attacker is able to insert or "inject" malicious SQL code into a query that an application sends to its database. This happens when user input is incorrectly filtered or sanitized before being used in SQL statements.
              </p>
              
              <div className="bg-cyber-terminal p-4 rounded-md mb-4 font-mono">
                <code className="text-sm whitespace-pre text-cyber-foreground/90">
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
              
              <div className="flex justify-between items-center">
                <Link to="/learn/sql-injection-basics" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm bg-cyber-primary text-cyber-background hover:bg-cyber-secondary transition-colors">
                  Continue Reading
                  <ArrowRight className="h-4 w-4" />
                </Link>
                
                <Link to="/challenge-env/login-bypass" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm bg-cyber-muted border border-cyber-border text-cyber-foreground hover:bg-cyber-muted/80 transition-colors">
                  Try Login Bypass Lab
                  <Play className="h-4 w-4" />
                </Link>
              </div>
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
