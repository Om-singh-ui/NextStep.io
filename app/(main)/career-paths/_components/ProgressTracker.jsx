// app/(main)/career-paths/_components/ProgressTracker.jsx
'use client';

import { useMemo, useState } from 'react';
import { BarChart3, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GraphPopup from './GraphPopup';

// Memoize role skills data to prevent recreation on every render
const roleSkills = {
  'Software Engineer': ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Git', 'REST APIs', 'TypeScript', 'Testing', 'Debugging'],
  'Senior Software Engineer': ['JavaScript', 'React', 'Node.js', 'System Design', 'Mentoring', 'Architecture', 'Testing', 'Performance Optimization', 'CI/CD', 'Code Review'],
  'Tech Lead': ['Technical Leadership', 'System Architecture', 'Project Planning', 'Cross-functional Collaboration', 'Mentoring', 'Budget Management', 'Risk Assessment', 'Stakeholder Management'],
  'Engineering Manager': ['People Management', 'Project Management', 'Hiring', 'Budgeting', 'Strategic Planning', 'Team Development', 'Stakeholder Management', 'Performance Reviews'],
  'Data Analyst': ['SQL', 'Excel', 'Data Visualization', 'Statistics', 'Python', 'R', 'Tableau', 'Power BI', 'Data Cleaning', 'Reporting'],
  'Data Scientist': ['Python', 'Machine Learning', 'Statistics', 'Data Wrangling', 'Deep Learning', 'SQL', 'TensorFlow', 'PyTorch', 'Data Storytelling', 'Model Deployment'],
  'Product Manager': ['Product Strategy', 'Market Research', 'User Stories', 'Prioritization', 'Stakeholder Management', 'Roadmapping', 'A/B Testing', 'Metrics Analysis', 'Customer Discovery'],
  'UX Designer': ['User Research', 'Wireframing', 'Prototyping', 'UI Design', 'Usability Testing', 'Figma', 'Design Systems', 'Accessibility', 'User Flows'],
};

export default function ProgressTracker({ currentRole, targetRole, userSkills }) {
  const [expandedSkills, setExpandedSkills] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showGraphPopup, setShowGraphPopup] = useState(false);

  // Memoize calculations to optimize performance
  const { targetSkills, userSkillCount, progressPercentage, progressMessage, unlockedAchievements } = useMemo(() => {
    if (!currentRole || !targetRole) {
      return {
        targetSkills: [],
        userSkillCount: 0,
        progressPercentage: 0,
        progressMessage: "Select roles to track your progress",
        unlockedAchievements: []
      };
    }

    const targetSkills = roleSkills[targetRole] || [];
    const userSkillCount = userSkills.filter(skill => targetSkills.includes(skill)).length;
    const progressPercentage = targetSkills.length > 0 
      ? Math.min(100, Math.round((userSkillCount / targetSkills.length) * 100))
      : 0;

    const getProgressMessage = (percentage) => {
      if (percentage === 0) return "Let's get started!";
      if (percentage < 25) return "Just starting out";
      if (percentage < 50) return "Making solid progress";
      if (percentage < 75) return "Well on your way";
      if (percentage < 100) return "Almost there!";
      return "Ready for the next role!";
    };

    const progressMessage = getProgressMessage(progressPercentage);

    // Determine unlocked achievements
    const achievements = [];
    if (currentRole && targetRole) achievements.push('First Steps');
    if (progressPercentage >= 25) achievements.push('Quick Learner');
    if (progressPercentage >= 50) achievements.push('Halfway There');
    if (progressPercentage >= 75) achievements.push('Almost Expert');
    if (progressPercentage === 100) achievements.push('Master Achieved');

    // Show celebration animation when reaching 100%
    if (progressPercentage === 100 && !showCelebration) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    return {
      targetSkills,
      userSkillCount,
      progressPercentage,
      progressMessage,
      unlockedAchievements: achievements
    };
  }, [currentRole, targetRole, userSkills, showCelebration]);

  if (!currentRole || !targetRole) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Progress Tracker</h2>
        <p className="text-gray-500 dark:text-gray-400">Select roles to track your progress.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
        {/* Celebration confetti effect */}
        {showCelebration && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`
                }}
              />
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Progress Tracker</h2>
          <Button
            onClick={() => setShowGraphPopup(true)}
            variant="outline"
            size="sm"
            className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30"
          >
            <BarChart3 className="h-4 w-4" />
            View Analytics
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            {/* Animated circular progress */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
                className="dark:stroke-gray-700"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeDasharray={`${progressPercentage}, 100`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-white">{progressPercentage}%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">complete</span>
            </div>
          </div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{progressMessage}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            From {currentRole} to {targetRole}
          </p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Skills mastered</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {userSkillCount}/{targetSkills.length}
            </span>
          </div>
          
          {/* Interactive progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3 overflow-hidden">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Expandable skills grid */}
          <button
            onClick={() => setExpandedSkills(!expandedSkills)}
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mb-2"
          >
            {expandedSkills ? 'Hide' : 'Show'} skill details
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ml-1 transition-transform ${expandedSkills ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {expandedSkills && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {targetSkills.map((skill) => (
                <div
                  key={skill}
                  className={`p-2 rounded-lg text-sm font-medium ${
                    userSkills.includes(skill)
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                  title={skill}
                >
                  <div className="flex items-center">
                    {userSkills.includes(skill) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                    <span className="truncate">{skill}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Achievements</h3>
          <div className="space-y-3">
            {unlockedAchievements.map((achievement, index) => (
              <div key={achievement} className="flex items-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{achievement}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {achievement === 'First Steps' && 'Selected your career path'}
                    {achievement === 'Quick Learner' && 'Mastered 25% of required skills'}
                    {achievement === 'Halfway There' && 'Mastered 50% of required skills'}
                    {achievement === 'Almost Expert' && 'Mastered 75% of required skills'}
                    {achievement === 'Master Achieved' && 'Mastered all required skills!'}
                  </p>
                </div>
              </div>
            ))}
            
            {unlockedAchievements.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">Complete more skills to unlock achievements</p>
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          .animate-confetti {
            animation: confetti 3s ease-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}</style>
      </div>

      {/* Graph Popup */}
      <GraphPopup
        isOpen={showGraphPopup}
        onClose={() => setShowGraphPopup(false)}
        currentRole={currentRole}
        targetRole={targetRole}
        userSkills={userSkills}
        progressPercentage={progressPercentage}
      />
    </>
  );
}