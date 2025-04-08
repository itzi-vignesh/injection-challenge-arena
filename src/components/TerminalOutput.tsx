
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TerminalOutputProps {
  output: string[];
  className?: string;
  isSuccess?: boolean;
  isError?: boolean;
  isLoading?: boolean;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({
  output,
  className,
  isSuccess = false,
  isError = false,
  isLoading = false
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div 
      ref={terminalRef}
      className={cn(
        "terminal h-64 overflow-y-auto bg-cyber-terminal border border-cyber-border rounded-md p-4",
        className
      )}
    >
      <div className="flex flex-col space-y-1">
        {output.map((line, index) => (
          <div key={index} className="terminal-line">
            {index === output.length - 1 && isLoading ? (
              <div className="flex items-center">
                <span>{line}</span>
                <span className="animate-blink ml-1">|</span>
              </div>
            ) : (
              <span 
                className={cn(
                  "text-sm font-mono",
                  isSuccess && index === output.length - 1 && "text-cyber-success",
                  isError && index === output.length - 1 && "text-cyber-error"
                )}
              >
                {line}
              </span>
            )}
          </div>
        ))}
        {isLoading && output.length === 0 && (
          <div className="flex items-center">
            <span className="animate-blink">|</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalOutput;
