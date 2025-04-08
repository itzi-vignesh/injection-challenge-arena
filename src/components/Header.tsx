
import React from 'react';
import { Shield, AlertTriangle, Home, BookOpen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-cyber-border bg-cyber-background py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-cyber-primary" />
          <h1 className="text-xl font-bold text-cyber-primary">
            SQL<span className="text-white">Injection</span>Arena
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-cyber-foreground hover:text-cyber-primary transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link to="/challenges" className="flex items-center gap-1.5 text-sm font-medium text-cyber-foreground hover:text-cyber-primary transition-colors">
            <AlertTriangle className="h-4 w-4" />
            Challenges
          </Link>
          <Link to="/learn" className="flex items-center gap-1.5 text-sm font-medium text-cyber-foreground hover:text-cyber-primary transition-colors">
            <BookOpen className="h-4 w-4" />
            Learn
          </Link>
          <Link to="/scoreboard" className="flex items-center gap-1.5 text-sm font-medium text-cyber-foreground hover:text-cyber-primary transition-colors">
            <Trophy className="h-4 w-4" />
            Scoreboard
          </Link>
        </nav>
        
        <div className="md:hidden">
          {/* Mobile menu button would go here */}
          <button className="text-cyber-foreground hover:text-cyber-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
