
import React from 'react';
import { Shield, AlertTriangle, Home, BookOpen, Trophy, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

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
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-1.5 text-sm font-medium text-cyber-foreground hover:text-cyber-primary transition-colors bg-transparent">
                  <Terminal className="h-4 w-4" />
                  Challenges
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    <div className="px-4 py-2">
                      <h4 className="text-sm font-medium leading-none mb-2 text-cyber-primary">Containerized Labs</h4>
                      <p className="text-sm text-cyber-foreground/70 mb-2">Real-world SQL injection environments in isolated Docker containers</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Link to="/challenge-env/login-bypass" className="group rounded-md p-2 hover:bg-cyber-muted">
                          <div className="text-sm font-medium mb-1 group-hover:text-cyber-primary">Login Bypass</div>
                          <p className="text-xs text-cyber-foreground/70">Bypass authentication with SQL injection</p>
                        </Link>
                        <Link to="/challenge-env/union-attacks" className="group rounded-md p-2 hover:bg-cyber-muted">
                          <div className="text-sm font-medium mb-1 group-hover:text-cyber-primary">UNION Attacks</div>
                          <p className="text-xs text-cyber-foreground/70">Extract data from other database tables</p>
                        </Link>
                        <Link to="/challenge-env/blind-injection" className="group rounded-md p-2 hover:bg-cyber-muted">
                          <div className="text-sm font-medium mb-1 group-hover:text-cyber-primary">Blind Injection</div>
                          <p className="text-xs text-cyber-foreground/70">Extract data with no direct output</p>
                        </Link>
                      </div>
                    </div>
                    <div className="border-t border-cyber-border px-4 pt-4 pb-2">
                      <Link to="/challenges" className="text-sm text-cyber-primary hover:underline">
                        View all challenges →
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
