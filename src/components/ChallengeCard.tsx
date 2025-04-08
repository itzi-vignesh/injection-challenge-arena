
import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle, AlertCircle, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChallengeCardProps {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  description: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  customAction?: React.ReactNode;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  id,
  title,
  difficulty,
  description,
  isCompleted = false,
  isLocked = false,
  customAction
}) => {
  const difficultyColors = {
    easy: 'bg-green-900/20 text-green-500 border-green-800/30',
    medium: 'bg-yellow-900/20 text-yellow-500 border-yellow-800/30',
    hard: 'bg-orange-900/20 text-orange-500 border-orange-800/30',
    extreme: 'bg-red-900/20 text-red-500 border-red-800/30'
  };

  return (
    <div className={cn(
      "border border-cyber-border rounded-md overflow-hidden bg-cyber-muted transition-all duration-200",
      isCompleted ? "border-cyber-success/50" : "",
      isLocked ? "opacity-75" : "hover:border-cyber-primary/50"
    )}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={cn(
            "px-2 py-0.5 text-xs rounded-full border",
            difficultyColors[difficulty]
          )}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          
          {isCompleted && (
            <CheckCircle className="h-5 w-5 text-cyber-success" />
          )}
          
          {isLocked && (
            <Lock className="h-5 w-5 text-cyber-foreground/50" />
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-cyber-foreground mb-2">{title}</h3>
        
        <p className="text-sm text-cyber-foreground/70 mb-4 line-clamp-2">
          {description}
        </p>
        
        {isLocked ? (
          <div className="flex items-center justify-center py-2 bg-cyber-background/50 rounded border border-cyber-border text-sm text-cyber-foreground/50">
            <Lock className="h-4 w-4 mr-2" />
            Complete previous challenges to unlock
          </div>
        ) : customAction ? (
          customAction
        ) : (
          <div className="flex gap-2">
            <Link
              to={`/challenges/${id}`}
              className="flex-1 flex items-center justify-center py-2 bg-cyber-primary/10 hover:bg-cyber-primary/20 rounded border border-cyber-primary/30 text-sm text-cyber-primary transition-colors"
            >
              {isCompleted ? "Practice Again" : "Start Challenge"}
            </Link>
            
            <Link
              to={`/challenge-env/${id}`}
              className="flex items-center justify-center px-3 py-2 bg-cyber-muted hover:bg-cyber-background/70 rounded border border-cyber-border text-sm transition-colors"
              title="Launch in container"
            >
              <Terminal className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;
