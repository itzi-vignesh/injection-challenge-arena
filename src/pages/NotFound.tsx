
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-error/10 mb-6">
            <AlertTriangle className="h-8 w-8 text-cyber-error" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
          
          <p className="text-cyber-foreground/70 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-cyber-muted border border-cyber-border hover:bg-cyber-muted/80 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
