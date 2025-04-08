
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronRight, BookOpen, AlertTriangle, Terminal, Database } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-cyber-background to-cyber-background/95">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/20">
                  <span className="animate-pulse mr-2">•</span>
                  Educational Platform
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Master SQL Injection <br />
                  <span className="text-cyber-primary">in a Safe Environment</span>
                </h1>
                
                <p className="text-lg text-cyber-foreground/80 max-w-xl">
                  Learn how to identify, exploit, and prevent SQL injection vulnerabilities with our interactive challenges, inspired by PortSwigger Web Security Academy.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/challenges" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-cyber-primary text-cyber-background font-medium hover:bg-cyber-secondary transition-colors">
                    Start Challenges
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  
                  <Link to="/learn" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-cyber-border bg-cyber-muted text-cyber-foreground font-medium hover:bg-cyber-muted/80 transition-colors">
                    Learn First
                    <BookOpen className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="terminal p-6 max-w-md">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="flex-1 text-center text-xs text-cyber-foreground/70">sql-injection-terminal</div>
                    </div>
                    <div className="text-sm text-cyber-foreground/90 font-mono">
                      <p className="pb-1"><span className="text-cyber-primary">$</span> SELECT * FROM users WHERE id = '1';</p>
                      <div className="border-b border-cyber-border my-2"></div>
                      <p className="pb-1"><span className="text-cyber-primary">$</span> SELECT * FROM users WHERE id = <span className="text-cyber-error">'1' OR '1'='1'</span>;</p>
                      <p className="py-2 text-cyber-error">[!] SQL Injection vulnerability detected!</p>
                      <p className="py-1 text-cyber-success">Found 42 user records. Authentication bypassed!</p>
                      <p className="flex items-center pt-2">
                        <span className="text-cyber-primary">$</span> <span className="ml-2 cursor">_</span>
                      </p>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full rounded-md bg-cyber-primary/20 blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-cyber-muted">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Learn Real-World SQL Injection Skills</h2>
              <p className="text-cyber-foreground/70 max-w-2xl mx-auto">
                Our platform offers practical challenges modeled after real-world vulnerabilities,
                providing hands-on experience in a controlled environment.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-cyber-background p-6 rounded-lg border border-cyber-border">
                <div className="mb-4 p-3 bg-cyber-primary/10 rounded-full w-fit">
                  <AlertTriangle className="h-6 w-6 text-cyber-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progressive Challenges</h3>
                <p className="text-cyber-foreground/70">
                  From basic to advanced SQL injection techniques, with incrementally difficult scenarios.
                </p>
              </div>
              
              <div className="bg-cyber-background p-6 rounded-lg border border-cyber-border">
                <div className="mb-4 p-3 bg-cyber-primary/10 rounded-full w-fit">
                  <Terminal className="h-6 w-6 text-cyber-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Console</h3>
                <p className="text-cyber-foreground/70">
                  Practice with a realistic terminal interface that provides immediate feedback.
                </p>
              </div>
              
              <div className="bg-cyber-background p-6 rounded-lg border border-cyber-border">
                <div className="mb-4 p-3 bg-cyber-primary/10 rounded-full w-fit">
                  <Database className="h-6 w-6 text-cyber-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Simulated Databases</h3>
                <p className="text-cyber-foreground/70">
                  Experience different database types and security configurations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="bg-gradient-to-r from-cyber-primary/20 to-cyber-accent/20 rounded-lg border border-cyber-primary/30 p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start hacking?</h2>
              <p className="text-cyber-foreground/80 max-w-2xl mx-auto mb-8">
                Put your SQL injection skills to the test with our challenges inspired by real-world vulnerabilities.
              </p>
              <Link to="/challenges" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyber-primary text-cyber-background font-medium hover:bg-cyber-secondary transition-colors">
                Begin Your Journey
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
