// app/(main)/career-paths/generate-roadmap/_components/RoadmapGenerator.jsx
'use client';

import { useState } from 'react';
import { generateAIRoadmap } from '@/actions/career-path-actions';

// Mock data for fallback
const mockRoadmapData = {
  steps: [
    {
      title: "Master Core Technical Skills",
      description: "Deepen your expertise in programming languages, frameworks, and tools relevant to your target role",
      duration: "3-6 months",
      dependencies: [],
      priority: "High"
    },
    {
      title: "Develop Soft Skills",
      description: "Improve communication, leadership, and collaboration skills essential for career advancement",
      duration: "Ongoing",
      dependencies: [],
      priority: "Medium"
    },
    {
      title: "Gain Practical Experience",
      description: "Work on real-world projects, contribute to open source, or take on additional responsibilities",
      duration: "6-12 months",
      dependencies: ["Master Core Technical Skills"],
      priority: "High"
    },
    {
      title: "Build Professional Network",
      description: "Attend industry events, connect with professionals, and seek mentorship opportunities",
      duration: "3-9 months",
      dependencies: ["Develop Soft Skills"],
      priority: "Medium"
    },
    {
      title: "Prepare for Target Role",
      description: "Study role-specific requirements, practice interviews, and tailor your resume",
      duration: "1-3 months",
      dependencies: ["Gain Practical Experience", "Build Professional Network"],
      priority: "High"
    }
  ],
  skillsToLearn: [
    "Advanced Programming",
    "System Design",
    "Project Management",
    "Technical Leadership",
    "Stakeholder Communication"
  ],
  milestones: [
    "Complete relevant certifications",
    "Lead a significant project",
    "Mentor junior team members",
    "Deliver a major presentation",
    "Receive positive performance reviews"
  ],
  timeline: "12-18 months",
  estimatedSuccessRate: "85%"
};

export default function RoadmapGenerator({ currentRole, targetRole, userSkills }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [error, setError] = useState(null);
  const [showMockData, setShowMockData] = useState(false);

  const generateRoadmap = async () => {
    if (!currentRole || !targetRole) {
      setError('Please select both current and target roles');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setShowMockData(false);

    try {
      console.log('Generating roadmap with:', { currentRole, targetRole, userSkills });
      
      // Call the server action directly
      const data = await generateAIRoadmap(currentRole, targetRole, userSkills || []);
      console.log('Roadmap generated:', data);
      
      setRoadmapData(data);
    } catch (err) {
      console.error('Error generating roadmap:', err);
      setError(`Failed to generate roadmap: ${err.message}. Showing sample roadmap.`);
      setRoadmapData(mockRoadmapData);
      setShowMockData(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const renderFlowchart = () => {
    if (!roadmapData) return null;

    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Your Career Roadmap: {currentRole} → {targetRole}
            </h3>
            {showMockData && (
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                Showing sample data (AI service temporarily unavailable)
              </p>
            )}
          </div>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm rounded-full">
            {roadmapData.estimatedSuccessRate || 'High Success Probability'}
          </span>
        </div>
        
        <div className="flowchart-container space-y-4">
          {roadmapData.steps?.map((step, index) => (
            <div key={index} className="flowchart-step p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg relative">
              <div className="absolute -left-3 top-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </div>
              
              <div className="flex items-start justify-between">
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">{step.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{step.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="inline-block px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded text-gray-700 dark:text-gray-300">
                      ⏱️ {step.duration}
                    </span>
                    {step.priority && (
                      <span className={`inline-block px-2 py-1 text-xs rounded ${getPriorityColor(step.priority)}`}>
                        {step.priority} Priority
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {step.dependencies && step.dependencies.length > 0 && (
                <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <span className="mr-1">🔗</span>
                    Depends on: {step.dependencies.join(', ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {roadmapData.skillsToLearn && roadmapData.skillsToLearn.length > 0 && (
          <div className="mt-8">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
              <span className="mr-2">📚</span>
              Skills to Acquire
            </h4>
            <div className="flex flex-wrap gap-2">
              {roadmapData.skillsToLearn.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full flex items-center">
                  <span className="mr-1">✅</span>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {roadmapData.milestones && roadmapData.milestones.length > 0 && (
          <div className="mt-8">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
              <span className="mr-2">🎯</span>
              Key Milestones
            </h4>
            <div className="space-y-3">
              {roadmapData.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-xs font-bold text-gray-800">{(index + 1)}</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{milestone}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                📅 Estimated timeline: <span className="text-blue-600 dark:text-blue-400">{roadmapData.timeline}</span>
              </p>
              {roadmapData.estimatedSuccessRate && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  🎯 Success probability: {roadmapData.estimatedSuccessRate}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <span className="mr-2">🧭</span>
          Generate AI-Powered Roadmap
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Create a detailed flowchart roadmap from {currentRole || 'your current role'} to {targetRole || 'your target role'}
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <span className="font-semibold">Note:</span> {currentRole && targetRole 
              ? `This will generate a personalized roadmap from ${currentRole} to ${targetRole}`
              : 'Select both current and target roles to generate a roadmap'}
          </p>
        </div>

        <button
          onClick={generateRoadmap}
          disabled={isGenerating || !currentRole || !targetRole}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Roadmap...
            </>
          ) : (
            <>
              <span className="mr-2">🚀</span>
              Generate Roadmap
            </>
          )}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-300 text-sm flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </p>
          </div>
        )}
      </div>

      {roadmapData && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Generated Roadmap</h3>
          {renderFlowchart()}
        </div>
      )}
    </div>
  );
}