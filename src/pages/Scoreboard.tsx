
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trophy, Medal, BadgeCheck } from 'lucide-react';

const Scoreboard = () => {
  // Mock data for the scoreboard
  const topUsers = [
    { id: 1, username: "SQLMaster", points: 2850, completedChallenges: 6, rank: 1 },
    { id: 2, username: "InjectX", points: 2740, completedChallenges: 6, rank: 2 },
    { id: 3, username: "ByteBender", points: 2600, completedChallenges: 5, rank: 3 },
    { id: 4, username: "QueryBreaker", points: 2450, completedChallenges: 5, rank: 4 },
    { id: 5, username: "HackSavvy", points: 2300, completedChallenges: 5, rank: 5 },
    { id: 6, username: "CodeSlinger", points: 2150, completedChallenges: 4, rank: 6 },
    { id: 7, username: "NullByte", points: 2000, completedChallenges: 4, rank: 7 },
    { id: 8, username: "CyberNinja", points: 1850, completedChallenges: 4, rank: 8 },
    { id: 9, username: "DataPhantom", points: 1700, completedChallenges: 3, rank: 9 },
    { id: 10, username: "SecurityWizard", points: 1550, completedChallenges: 3, rank: 10 },
  ];
  
  const recentAchievements = [
    { id: 1, username: "InjectX", achievement: "Completed all blind SQL injection challenges", timestamp: "2 hours ago" },
    { id: 2, username: "ByteBender", achievement: "First to solve 'Advanced UNION Attacks'", timestamp: "5 hours ago" },
    { id: 3, username: "SQLMaster", achievement: "Solved all challenges in record time", timestamp: "1 day ago" },
    { id: 4, username: "CyberNinja", achievement: "Found an alternative solution to 'Error-Based Extraction'", timestamp: "2 days ago" },
    { id: 5, username: "DataPhantom", achievement: "Completed 'Time-Based Blind Injection' without using hints", timestamp: "3 days ago" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container px-4 mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
            <p className="text-cyber-foreground/70 max-w-3xl">
              See who's mastering SQL injection challenges and rising to the top of our community rankings.
            </p>
          </div>
          
          {/* Top Performers Podium */}
          <div className="mb-16 hidden md:flex items-end justify-center">
            {topUsers.slice(0, 3).map((user, index) => (
              <div 
                key={user.id} 
                className={`flex flex-col items-center ${
                  index === 0 ? 'order-2 mb-0 mx-4' : (index === 1 ? 'order-1 mb-12' : 'order-3 mb-16')
                }`}
              >
                <div className={`relative flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                  index === 0 ? 'bg-yellow-500/20 border-2 border-yellow-500' :
                  index === 1 ? 'bg-gray-300/20 border-2 border-gray-300' : 'bg-amber-600/20 border-2 border-amber-600'
                }`}>
                  <span className="text-2xl font-bold">
                    {index === 0 ? '1' : (index === 1 ? '2' : '3')}
                  </span>
                  {index === 0 && (
                    <div className="absolute -top-10">
                      <Trophy className="h-8 w-8 text-yellow-500" />
                    </div>
                  )}
                </div>
                
                <div className={`p-4 rounded-md text-center ${
                  index === 0 ? 'bg-yellow-500/10 border border-yellow-500/30' :
                  index === 1 ? 'bg-gray-300/10 border border-gray-300/30' : 'bg-amber-600/10 border border-amber-600/30'
                }`}>
                  <h3 className="font-bold text-lg">{user.username}</h3>
                  <p className="text-sm">{user.points} pts</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Leaderboard Table */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Top Performers</h2>
            
            <div className="bg-cyber-muted border border-cyber-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-cyber-background border-b border-cyber-border">
                      <th className="px-6 py-4 text-left text-sm font-medium">Rank</th>
                      <th className="px-6 py-4 text-left text-sm font-medium">Username</th>
                      <th className="px-6 py-4 text-left text-sm font-medium">Points</th>
                      <th className="px-6 py-4 text-left text-sm font-medium">Challenges</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyber-border">
                    {topUsers.map(user => (
                      <tr key={user.id} className="hover:bg-cyber-background/50 transition-colors">
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center">
                            {user.rank === 1 ? (
                              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                            ) : user.rank === 2 ? (
                              <Medal className="h-5 w-5 mr-2 text-gray-300" />
                            ) : user.rank === 3 ? (
                              <Medal className="h-5 w-5 mr-2 text-amber-600" />
                            ) : (
                              <span className="w-5 mr-2 inline-block text-center">{user.rank}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{user.username}</td>
                        <td className="px-6 py-4 text-sm">{user.points}</td>
                        <td className="px-6 py-4 text-sm">{user.completedChallenges}/6</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Recent Achievements */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Achievements</h2>
            
            <div className="bg-cyber-muted border border-cyber-border rounded-lg">
              <ul className="divide-y divide-cyber-border">
                {recentAchievements.map(item => (
                  <li key={item.id} className="p-6 hover:bg-cyber-background/50 transition-colors">
                    <div className="flex items-start">
                      <BadgeCheck className="h-5 w-5 text-cyber-primary mt-0.5 mr-3" />
                      <div>
                        <p className="text-cyber-foreground font-medium">
                          <span className="font-semibold">{item.username}</span> {item.achievement}
                        </p>
                        <p className="text-sm text-cyber-foreground/60 mt-1">{item.timestamp}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Scoreboard;
