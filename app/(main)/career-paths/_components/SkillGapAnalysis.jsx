// app/(main)/career-paths/_components/SkillGapAnalysis.jsx
'use client';

import { useState, useMemo, useCallback } from 'react';

const roleSkills = {
  'Software Engineer': ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Git', 'REST APIs', 'TypeScript', 'Testing'],
  'Senior Software Engineer': ['JavaScript', 'React', 'Node.js', 'System Design', 'Mentoring', 'Architecture', 'Testing', 'Performance Optimization', 'CI/CD'],
  'Tech Lead': ['Technical Leadership', 'System Architecture', 'Project Planning', 'Cross-functional Collaboration', 'Mentoring', 'Budget Management', 'Risk Assessment'],
  'Engineering Manager': ['People Management', 'Project Management', 'Hiring', 'Budgeting', 'Strategic Planning', 'Team Development', 'Stakeholder Management'],
  'Data Analyst': ['SQL', 'Excel', 'Data Visualization', 'Statistics', 'Python', 'R', 'Tableau', 'Power BI', 'Data Cleaning'],
  'Data Scientist': ['Python', 'Machine Learning', 'Statistics', 'Data Wrangling', 'Deep Learning', 'SQL', 'TensorFlow', 'PyTorch', 'Data Storytelling'],
  'Product Manager': ['Product Strategy', 'Market Research', 'User Stories', 'Prioritization', 'Stakeholder Management', 'Roadmapping', 'A/B Testing', 'Metrics Analysis'],
  'UX Designer': ['User Research', 'Wireframing', 'Prototyping', 'UI Design', 'Usability Testing', 'Figma', 'Design Systems', 'Accessibility'],
};

// Memoize the component to prevent unnecessary re-renders
export default function SkillGapAnalysis({ currentRole, targetRole, userSkills, onSkillsUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Memoize calculations to optimize performance
  const { currentSkills, targetSkills, missingSkills, skillsToImprove, filteredMissingSkills, filteredSkillsToImprove } = useMemo(() => {
    const currentSkills = roleSkills[currentRole] || [];
    const targetSkills = roleSkills[targetRole] || [];
    
    const missingSkills = targetSkills.filter(skill => !userSkills.includes(skill));
    const skillsToImprove = targetSkills.filter(skill => 
      userSkills.includes(skill) && currentSkills.includes(skill)
    );

    // Filter skills based on search term and category
    const filterSkills = (skills) => {
      return skills.filter(skill => {
        const matchesSearch = skill.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || 
          (filterCategory === 'technical' && !['Mentoring', 'Leadership', 'Management'].some(softSkill => skill.includes(softSkill))) ||
          (filterCategory === 'soft' && ['Mentoring', 'Leadership', 'Management'].some(softSkill => skill.includes(softSkill)));
        
        return matchesSearch && matchesCategory;
      });
    };

    return {
      currentSkills,
      targetSkills,
      missingSkills,
      skillsToImprove,
      filteredMissingSkills: filterSkills(missingSkills),
      filteredSkillsToImprove: filterSkills(skillsToImprove)
    };
  }, [currentRole, targetRole, userSkills, searchTerm, filterCategory]);

  // Memoize the toggle function to prevent unnecessary re-renders
  const toggleSkill = useCallback((skill) => {
    const updatedSkills = userSkills.includes(skill)
      ? userSkills.filter(s => s !== skill)
      : [...userSkills, skill];
    onSkillsUpdate(updatedSkills);
  }, [userSkills, onSkillsUpdate]);

  if (!currentRole || !targetRole) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Skill Gap Analysis</h2>
        <p className="text-gray-500 dark:text-gray-400">Select your current and target roles to see skill gaps.</p>
      </div>
    );
  }

  const progressPercentage = targetSkills.length > 0 
    ? Math.round(((targetSkills.length - missingSkills.length) / targetSkills.length) * 100)
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Skill Gap Analysis</h2>
        <div className="text-sm font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
          {progressPercentage}% Complete
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Your Skills</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userSkills.length} of {targetSkills.length} skills
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {userSkills.map(skill => (
            <span 
              key={skill} 
              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium flex items-center group"
            >
              {skill}
              <button 
                onClick={() => toggleSkill(skill)}
                className="ml-2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                aria-label={`Remove ${skill}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          ))}
          {userSkills.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No skills added yet. Select skills you have below.</p>
          )}
        </div>
      </div>

      <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            {expanded ? 'Hide' : 'Show'} required skills for {targetRole}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {expanded && (
            <div className="flex items-center space-x-2">
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <option value="all">All Skills</option>
                <option value="technical">Technical</option>
                <option value="soft">Soft Skills</option>
              </select>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-sm border border-gray-300 dark:border-gray-600 rounded-md pl-8 pr-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-32"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {expanded && (
          <div className="mt-4 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                  Skills to acquire ({filteredMissingSkills.length})
                </h4>
                {filteredMissingSkills.length > 0 && (
                  <button 
                    onClick={() => {
                      const allMissingSkills = [...new Set([...userSkills, ...filteredMissingSkills])];
                      onSkillsUpdate(allMissingSkills);
                    }}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    Add all
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredMissingSkills.map(skill => (
                  <div 
                    key={skill} 
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
                    onClick={() => toggleSkill(skill)}
                  >
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{skill}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Add
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                ))}
                {filteredMissingSkills.length === 0 && (
                  <div className="col-span-2 text-center py-4">
                    <div className="text-green-500 dark:text-green-400 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-green-600 dark:text-green-400 font-medium">You have all the required skills!</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Great job on mastering these skills!</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Skills to improve ({filteredSkillsToImprove.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSkillsToImprove.map(skill => (
                  <div 
                    key={skill} 
                    className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-lg"
                  >
                    <span className="text-yellow-800 dark:text-yellow-300 font-medium">{skill}</span>
                    <span className="ml-2 text-yellow-600 dark:text-yellow-400" title="Needs improvement">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                ))}
                {filteredSkillsToImprove.length === 0 && (
                  <div className="col-span-2 text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400">No skills need significant improvement.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}