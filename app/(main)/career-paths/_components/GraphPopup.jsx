// app/(main)/career-paths/_components/GraphPopup.jsx
'use client';

import { useEffect, useState } from 'react';
import { X, TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area
} from 'recharts';

// Theme-aware custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white/90 dark:bg-gray-900/90 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-md">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{`📅 ${label}`}</p>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          Progress: <span className="font-bold">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function GraphPopup({
  isOpen,
  onClose,
  currentRole,
  targetRole,
  userSkills,
  progressPercentage,
}) {
  const [progressData, setProgressData] = useState([]);
  const [targetSkills, setTargetSkills] = useState([]);
  const [userSkillCount, setUserSkillCount] = useState(0);

  // Role skills data
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

  useEffect(() => {
    if (isOpen && currentRole && targetRole) {
      const skills = roleSkills[targetRole] || [];
      const count = userSkills.filter(skill => skills.includes(skill)).length;

      setTargetSkills(skills);
      setUserSkillCount(count);

      // Generate simulated progress data
      const today = new Date();
      const data = [];
      for (let i = 5; i >= 0; i--) {
        const weekProgress = Math.min(progressPercentage, Math.round((progressPercentage / 6) * (6 - i)));
        data.push({
          date: `Week ${6 - i}`,
          progress: weekProgress,
        });
      }
      setProgressData(data);
    }
  }, [isOpen, currentRole, targetRole, userSkills, progressPercentage]);

  if (!currentRole || !targetRole) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl transition-all">
        
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between mb-6 sticky top-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl z-10 pb-4 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Progress Analytics: {currentRole} → {targetRole}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            {
              value: `${progressPercentage}%`,
              label: 'Current Progress',
              color: 'blue',
            },
            {
              value: `${userSkillCount}/${targetSkills.length}`,
              label: 'Skills Mastered',
              color: 'green',
            },
            {
              value: progressPercentage < 50 ? '3-6 months' : '1-3 months',
              label: 'Estimated Timeline',
              color: 'purple',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`bg-${stat.color}-50 dark:bg-${stat.color}-900/20 p-4 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>
                {stat.value}
              </div>
              <p className={`text-sm text-${stat.color}-700 dark:text-${stat.color}-300 mt-1`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Progress Timeline Chart */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Progress Timeline
          </h3>
          <div className="h-80 w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="date" stroke="currentColor" opacity={0.6} fontSize={12} />
                <YAxis stroke="currentColor" opacity={0.6} fontSize={12} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="progressGradientLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="progressGradientDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="progress"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#progressGradientLight)"
                  className="dark:fill-[url(#progressGradientDark)]"
                />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#3b82f6' }}
                  activeDot={{ r: 6, fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Distribution */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
            Skill Distribution
          </h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl max-h-64 overflow-y-auto">
            {targetSkills.map(skill => {
              const isMastered = userSkills.includes(skill);
              return (
                <div
                  key={skill}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white flex-1">
                    {skill}
                  </span>
                  <div className="flex items-center gap-3 min-w-[120px]">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${isMastered ? 'bg-green-500' : 'bg-gray-400'}`}
                        style={{ width: isMastered ? '100%' : '0%' }}
                      />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full transition-all ${
                      isMastered
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {isMastered ? 'Mastered' : 'Pending'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
            <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { threshold: 0, title: 'First Steps', description: 'Selected your career path' },
              { threshold: 25, title: 'Quick Learner', description: 'Mastered 25% of required skills' },
              { threshold: 50, title: 'Halfway There', description: 'Mastered 50% of required skills' },
              { threshold: 75, title: 'Almost Expert', description: 'Mastered 75% of required skills' },
              { threshold: 100, title: 'Master Achieved', description: 'Mastered all required skills!' },
            ].map((a) => {
              const unlocked = progressPercentage >= a.threshold;
              return (
                <div
                  key={a.title}
                  className={`p-4 rounded-xl border shadow-sm hover:shadow-md transform transition-all ${
                    unlocked
                      ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700 hover:-translate-y-1'
                      : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                        unlocked
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-300'
                          : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                      }`}
                    >
                      {unlocked ? '✓' : '−'}
                    </div>
                    <span
                      className={`font-medium ${
                        unlocked
                          ? 'text-yellow-700 dark:text-yellow-300'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {a.title}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 ml-9">{a.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
