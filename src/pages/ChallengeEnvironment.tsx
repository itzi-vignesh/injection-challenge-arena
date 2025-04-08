
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Terminal, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TerminalOutput from '@/components/TerminalOutput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Challenge environment configuration
const challengeEnvironments = {
  'login-bypass': {
    name: 'Basic Login Bypass',
    port: 3001,
    containerName: 'sql-injection-login-bypass',
    image: 'sql-injection-login-bypass:latest',
    startupTime: 5, // seconds
    description: 'This environment contains a vulnerable login form that is susceptible to basic SQL injection techniques.'
  },
  'union-attacks': {
    name: 'UNION Attacks',
    port: 3002,
    containerName: 'sql-injection-union-attacks',
    image: 'sql-injection-union-attacks:latest',
    startupTime: 6, // seconds
    description: 'This environment contains a product catalog with search functionality vulnerable to UNION-based SQL injection attacks.'
  },
  'blind-injection': {
    name: 'Blind SQL Injection',
    port: 3003,
    containerName: 'sql-injection-blind-injection',
    image: 'sql-injection-blind-injection:latest',
    startupTime: 7, // seconds
    description: 'This environment contains an application that processes data in the background without displaying database results directly.'
  }
};

const ChallengeEnvironment = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [containerStatus, setContainerStatus] = useState<'stopped' | 'starting' | 'running' | 'error'>('stopped');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const environment = challengeId ? challengeEnvironments[challengeId as keyof typeof challengeEnvironments] : null;
  
  // Redirect if environment doesn't exist
  useEffect(() => {
    if (!environment) {
      navigate('/challenges');
      toast({
        title: "Challenge not found",
        description: "The requested challenge environment does not exist.",
        variant: "destructive"
      });
    }
  }, [environment, navigate, toast]);
  
  // Mock function to start the Docker container
  const startContainer = () => {
    if (!environment) return;
    
    setContainerStatus('starting');
    setTerminalOutput(['> Starting container ' + environment.containerName + '...']);
    
    // Reset timer
    setElapsedTime(0);
    
    // Simulate Docker container startup with progress updates
    const startInterval = setInterval(() => {
      setTerminalOutput(prev => {
        const messages = [...prev];
        const progress = Math.floor(Math.random() * 20); // Random progress message
        
        switch (progress) {
          case 0:
            messages.push('> Pulling image ' + environment.image + '...');
            break;
          case 1:
            messages.push('> Creating network bridge...');
            break;
          case 2:
            messages.push('> Configuring virtual network interface...');
            break;
          case 3:
            messages.push('> Setting up environment variables...');
            break;
          case 4:
            messages.push('> Initializing MariaDB database...');
            break;
          case 5:
            messages.push('> Setting up vulnerable application...');
            break;
          default:
            // Don't add a message every time
            break;
        }
        return messages;
      });
      
      // Update elapsed time
      setElapsedTime(prev => prev + 1);
      
    }, 1000);
    
    // Simulate container start completion
    setTimeout(() => {
      clearInterval(startInterval);
      setTerminalOutput(prev => [
        ...prev, 
        '> Container started successfully!',
        '> Environment is running on port ' + environment.port,
        '> You can access the vulnerable application in the iframe below'
      ]);
      setContainerStatus('running');
      
      toast({
        title: "Environment Ready",
        description: `The ${environment.name} environment is now running and ready to use.`,
      });
    }, environment.startupTime * 1000);
  };
  
  // Mock function to stop the Docker container
  const stopContainer = () => {
    if (!environment || containerStatus !== 'running') return;
    
    setTerminalOutput(prev => [...prev, '> Stopping container ' + environment.containerName + '...']);
    
    // Simulate container stop
    setTimeout(() => {
      setTerminalOutput(prev => [...prev, '> Container stopped successfully!']);
      setContainerStatus('stopped');
      
      toast({
        title: "Environment Stopped",
        description: `The ${environment.name} environment has been stopped.`,
      });
    }, 2000);
  };
  
  // Mock function to reset the Docker container
  const resetContainer = () => {
    if (!environment) return;
    
    if (containerStatus === 'running') {
      stopContainer();
      
      // Wait a bit and then restart
      setTimeout(() => {
        startContainer();
      }, 3000);
    } else {
      startContainer();
    }
  };
  
  if (!environment) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container px-4 mx-auto">
          <div className="mb-6">
            <Link to="/challenges" className="inline-flex items-center gap-2 text-cyber-foreground/70 hover:text-cyber-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Challenges
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mt-4">
              <h1 className="text-2xl md:text-3xl font-bold">{environment.name} Lab Environment</h1>
              
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-sm rounded-full ${
                  containerStatus === 'stopped' ? 'bg-red-900/20 text-red-500 border border-red-800/30' :
                  containerStatus === 'starting' ? 'bg-yellow-900/20 text-yellow-500 border border-yellow-800/30' :
                  containerStatus === 'running' ? 'bg-green-900/20 text-green-500 border border-green-800/30' :
                  'bg-red-900/20 text-red-500 border border-red-800/30'
                }`}>
                  {containerStatus.charAt(0).toUpperCase() + containerStatus.slice(1)}
                </span>
                
                {containerStatus === 'running' && (
                  <span className="text-sm text-cyber-foreground/70">
                    Port: {environment.port}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Environment description */}
          <div className="bg-cyber-muted border border-cyber-border rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-2">Lab Description</h3>
            <p className="text-cyber-foreground/80 mb-4">{environment.description}</p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {containerStatus === 'stopped' && (
                <Button 
                  onClick={startContainer}
                  className="bg-cyber-primary hover:bg-cyber-secondary text-cyber-background"
                >
                  <Terminal className="mr-2 h-4 w-4" />
                  Start Lab Environment
                </Button>
              )}
              
              {containerStatus === 'running' && (
                <>
                  <Button 
                    onClick={stopContainer}
                    variant="outline"
                    className="border-cyber-border"
                  >
                    Stop Environment
                  </Button>
                  
                  <Button 
                    onClick={resetContainer}
                    variant="outline"
                    className="border-cyber-border"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset Environment
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Lab interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Terminal</h3>
                
                {elapsedTime > 0 && containerStatus === 'starting' && (
                  <span className="text-sm text-cyber-foreground/70">
                    Starting... {elapsedTime}s
                  </span>
                )}
              </div>
              
              <TerminalOutput 
                output={terminalOutput} 
                isLoading={containerStatus === 'starting'}
                className="mb-6"
              />
              
              <div className="bg-cyber-muted border border-cyber-border rounded-lg p-5">
                <h4 className="text-md font-semibold mb-3">Instructions</h4>
                
                {containerStatus === 'stopped' && (
                  <p className="text-sm text-cyber-foreground/80">
                    Click "Start Lab Environment" to launch the Docker container with the vulnerable application.
                  </p>
                )}
                
                {containerStatus === 'starting' && (
                  <p className="text-sm text-cyber-foreground/80">
                    Please wait while the Docker container starts up. This may take a few moments.
                  </p>
                )}
                
                {containerStatus === 'running' && (
                  <div className="text-sm text-cyber-foreground/80 space-y-3">
                    <p>
                      The vulnerable application is now running in the iframe on the right. Use SQL injection techniques 
                      appropriate for this lab to exploit the vulnerability.
                    </p>
                    <p>
                      If you need to reset the lab environment at any point, click the "Reset Environment" button.
                    </p>
                    <p className="text-cyber-primary">
                      Your goal is to identify and exploit the SQL injection vulnerability to access unauthorized data.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Lab Application</h3>
              
              {containerStatus !== 'running' ? (
                <div className="h-[400px] bg-cyber-terminal border border-cyber-border rounded-md flex items-center justify-center">
                  <div className="text-center p-6">
                    <Terminal className="h-12 w-12 text-cyber-foreground/30 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold mb-2">Environment Not Running</h4>
                    <p className="text-cyber-foreground/70 mb-4">
                      Start the lab environment to access the vulnerable application.
                    </p>
                    
                    {containerStatus === 'stopped' && (
                      <Button 
                        onClick={startContainer}
                        size="sm"
                        className="bg-cyber-primary hover:bg-cyber-secondary text-cyber-background"
                      >
                        Start Lab Environment
                      </Button>
                    )}
                    
                    {containerStatus === 'starting' && (
                      <p className="text-cyber-foreground/50 animate-pulse">
                        Starting environment...
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="border border-cyber-border rounded-md overflow-hidden bg-white h-[400px]">
                  <div className="bg-cyber-terminal p-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-cyber-foreground/70">
                      localhost:{environment.port}
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <iframe 
                    src={`/lab-environments/${challengeId}`} 
                    className="w-full h-[calc(400px-32px)]"
                    title={`${environment.name} Lab Environment`}
                  />
                </div>
              )}
              
              {containerStatus === 'running' && (
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs border-cyber-border"
                    onClick={resetContainer}
                  >
                    <RefreshCw className="mr-1.5 h-3 w-3" />
                    Reset Environment
                  </Button>
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

export default ChallengeEnvironment;
