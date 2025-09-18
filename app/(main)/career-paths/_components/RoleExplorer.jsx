// app/(main)/career-paths/_components/RoleExplorer.jsx
'use client';

import { useState, useMemo, useCallback } from 'react';

// Expanded career paths with additional metadata
const careerPathsData = {
  'Software Engineer': {
    nextSteps: ['Senior Software Engineer', 'Tech Lead', 'Engineering Manager', 'Principal Engineer'],
    description: 'Develops software applications and systems',
    icon: '💻',
    avgPromotionTime: '2-3 years',
    skills: ['Programming', 'Algorithms', 'Data Structures', 'Problem Solving'],
    demand: 'High'
  },
  'Senior Software Engineer': {
    nextSteps: ['Tech Lead', 'Engineering Manager', 'Principal Engineer', 'Architect'],
    description: 'Leads technical implementation and mentors junior engineers',
    icon: '👨‍💻',
    avgPromotionTime: '3-4 years',
    skills: ['Technical Leadership', 'Code Review', 'System Design', 'Mentoring'],
    demand: 'Very High'
  },
  'Tech Lead': {
    nextSteps: ['Engineering Manager', 'Principal Engineer', 'Architect', 'Director of Engineering'],
    description: 'Oversees technical direction and team coordination',
    icon: '🔧',
    avgPromotionTime: '2-3 years',
    skills: ['Project Management', 'Technical Strategy', 'Team Coordination', 'Architecture'],
    demand: 'High'
  },
  'Engineering Manager': {
    nextSteps: ['Senior Engineering Manager', 'Director of Engineering', 'VP of Engineering'],
    description: 'Manages engineering teams and projects',
    icon: '📊',
    avgPromotionTime: '4-5 years',
    skills: ['People Management', 'Budgeting', 'Strategic Planning', 'Hiring'],
    demand: 'High'
  },
  'Data Analyst': {
    nextSteps: ['Senior Data Analyst', 'Data Scientist', 'Data Engineer', 'Analytics Manager'],
    description: 'Analyzes data to provide business insights',
    icon: '📈',
    avgPromotionTime: '2-3 years',
    skills: ['SQL', 'Data Visualization', 'Statistical Analysis', 'Excel'],
    demand: 'High'
  },
  'Data Scientist': {
    nextSteps: ['Senior Data Scientist', 'Lead Data Scientist', 'ML Engineer', 'Data Science Manager'],
    description: 'Builds predictive models and machine learning solutions',
    icon: '🤖',
    avgPromotionTime: '3-4 years',
    skills: ['Machine Learning', 'Python', 'Statistical Modeling', 'Data Wrangling'],
    demand: 'Very High'
  },
  'Product Manager': {
    nextSteps: ['Senior Product Manager', 'Group Product Manager', 'Director of Product', 'VP of Product'],
    description: 'Defines product strategy and roadmap',
    icon: '📱',
    avgPromotionTime: '3-4 years',
    skills: ['Product Strategy', 'Market Research', 'Stakeholder Management', 'Prioritization'],
    demand: 'High'
  },
  'UX Designer': {
    nextSteps: ['Senior UX Designer', 'Lead Designer', 'Design Manager', 'Head of Design'],
    description: 'Designs user experiences and interfaces',
    icon: '🎨',
    avgPromotionTime: '2-3 years',
    skills: ['UI Design', 'User Research', 'Prototyping', 'Wireframing'],
    demand: 'High'
  },
  'DevOps Engineer': {
    nextSteps: ['Senior DevOps Engineer', 'Site Reliability Engineer', 'Infrastructure Architect', 'DevOps Manager'],
    description: 'Automates deployment and infrastructure processes',
    icon: '🔄',
    avgPromotionTime: '2-3 years',
    skills: ['CI/CD', 'Cloud Infrastructure', 'Automation', 'Containerization'],
    demand: 'Very High'
  },
  'QA Engineer': {
    nextSteps: ['Senior QA Engineer', 'Test Automation Engineer', 'QA Lead', 'QA Manager'],
    description: 'Ensures software quality through testing',
    icon: '✅',
    avgPromotionTime: '2-3 years',
    skills: ['Test Planning', 'Automation', 'Bug Tracking', 'Quality Assurance'],
    demand: 'Medium'
  }
};

// Custom Select Component
const Select = ({ value, onChange, options, placeholder, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {selectedOption ? (
            <>
              <span className="text-xl mr-3">{selectedOption.icon}</span>
              <span className="text-gray-900 dark:text-white">{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
          )}
        </div>
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white flex items-center transition-colors duration-150"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span className="text-xl mr-3">{option.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{option.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Role Card Component
const RoleCard = ({ role, data, isSelected, isCurrent, onClick, onToggleDetails, isExpanded }) => {
  const getDemandColor = (demand) => {
    switch(demand) {
      case 'Very High': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'High': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div 
      className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-400 shadow-sm' 
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{data.icon}</span>
            <h4 className="font-semibold text-gray-900 dark:text-white">{role}</h4>
            {isCurrent && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                Current
              </span>
            )}
            {isSelected && !isCurrent && (
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{data.description}</p>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {data.avgPromotionTime}
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${getDemandColor(data.demand)}`}>
              {data.demand} Demand
            </span>
          </div>
          
          <button 
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              onToggleDetails(role);
            }}
          >
            {isExpanded ? 'Hide details' : 'Show details'}
            <svg className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {isExpanded && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Key Skills:</h5>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function RoleExplorer({ currentRole, targetRole, onRoleChange }) {
  const [expandedRole, setExpandedRole] = useState(null);

  // Prepare options for select component
  const roleOptions = useMemo(() => 
    Object.entries(careerPathsData).map(([role, data]) => ({
      value: role,
      label: role,
      description: data.description,
      icon: data.icon
    })), []
  );

  // Memoize target role selection handler
  const handleTargetRoleSelect = useCallback((role) => {
    onRoleChange(currentRole, role);
    setExpandedRole(null);
  }, [onRoleChange, currentRole]);

  // Toggle role details expansion
  const toggleRoleDetails = useCallback((role) => {
    setExpandedRole(expandedRole === role ? null : role);
  }, [expandedRole]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Role Explorer</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Explore career paths and progression opportunities
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Current Role Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          What is your current role?
        </label>
        
        <Select
          value={currentRole}
          onChange={(role) => onRoleChange(role, targetRole)}
          options={roleOptions}
          placeholder="Select your current role..."
        />
        
        {/* Selected current role display */}
        {currentRole && (
          <div className="mt-4 flex items-center bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
            <span className="text-2xl mr-3">{careerPathsData[currentRole].icon}</span>
            <div>
              <h3 className="font-medium text-blue-800 dark:text-blue-300">{currentRole}</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">{careerPathsData[currentRole].description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Career Path Visualization */}
      {currentRole && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Career progression path
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Avg. promotion: {careerPathsData[currentRole].avgPromotionTime}
            </div>
          </div>
          
          {/* Current role card */}
          <div className="mb-6 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <div className="flex items-center">
              <span className="text-2xl mr-4">{careerPathsData[currentRole].icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">{currentRole}</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">{careerPathsData[currentRole].description}</p>
              </div>
              <div className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full">
                Current Role
              </div>
            </div>
          </div>
          
          {/* Next steps */}
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Next career steps
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerPathsData[currentRole].nextSteps.map((role) => (
              <RoleCard
                key={role}
                role={role}
                data={careerPathsData[role] || { 
                  icon: '💼', 
                  description: 'Next career step',
                  avgPromotionTime: '3-4 years',
                  skills: ['Technical skills', 'Leadership', 'Communication'],
                  demand: 'High'
                }}
                isSelected={targetRole === role}
                onClick={() => handleTargetRoleSelect(role)}
                onToggleDetails={toggleRoleDetails}
                isExpanded={expandedRole === role}
              />
            ))}
          </div>
          
          {/* Career path visualization */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Career Path Visualization</h4>
            <div className="flex overflow-x-auto pb-4">
              <div className="flex space-x-6 min-w-max px-2">
                {/* Current role */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl">
                    {careerPathsData[currentRole].icon}
                  </div>
                  <div className="mt-3 text-sm font-medium text-center text-blue-700 dark:text-blue-400 max-w-[100px]">
                    {currentRole}
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                {/* Next steps */}
                {careerPathsData[currentRole].nextSteps.slice(0, 3).map((role, index) => (
                  <div key={role} className="flex flex-col items-center">
                    <div 
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                        targetRole === role 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {careerPathsData[role]?.icon || '💼'}
                    </div>
                    <div className="mt-3 text-sm font-medium text-center text-gray-700 dark:text-gray-300 max-w-[100px]">
                      {role}
                    </div>
                  </div>
                ))}
                
                {/* More steps indicator if there are more than 3 */}
                {careerPathsData[currentRole].nextSteps.length > 3 && (
                  <>
                    <div className="flex items-center">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        +{careerPathsData[currentRole].nextSteps.length - 3}
                      </div>
                      <div className="mt-3 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        More Roles
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}