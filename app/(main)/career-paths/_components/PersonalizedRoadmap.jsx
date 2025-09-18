// app/(main)/career-paths/_components/PersonalizedRoadmap.jsx
'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaBook, 
  FaCode, 
  FaCertificate, 
  FaUsers, 
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaSync,
  FaPlus,
  FaArrowRight,
  FaRobot,
  FaChartLine
} from 'react-icons/fa';

// Memoize roadmap templates to prevent recreation on every render
const roadmapTemplates = {
  'Software Engineer_to_Senior Software Engineer': [
    { 
      type: 'course', 
      title: 'Advanced JavaScript Concepts', 
      duration: '4 weeks',
      description: 'Master advanced JS patterns, async programming, and modern ES6+ features',
      resources: ['MDN Web Docs', 'JavaScript.info', 'Frontend Masters'],
      status: 'not-started'
    },
    { 
      type: 'project', 
      title: 'Lead a small feature development', 
      duration: '2 months',
      description: 'Take ownership of a feature from conception to deployment',
      resources: ['Agile methodology', 'Code review practices', 'CI/CD pipeline'],
      status: 'not-started'
    },
    { 
      type: 'certification', 
      title: 'AWS Certified Developer', 
      duration: '6 weeks',
      description: 'Learn cloud development and deployment best practices',
      resources: ['AWS Training', 'Practice exams', 'Hands-on labs'],
      status: 'not-started'
    },
    { 
      type: 'soft-skill', 
      title: 'Improve mentoring abilities', 
      duration: 'Ongoing',
      description: 'Develop skills to guide and support junior team members',
      resources: ['Mentorship programs', 'Communication workshops', 'Feedback techniques'],
      status: 'not-started'
    },
  ],
  'Software Engineer_to_Tech Lead': [
    { 
      type: 'course', 
      title: 'System Design Fundamentals', 
      duration: '6 weeks',
      description: 'Learn to design scalable and maintainable systems',
      resources: ['System Design Primer', 'Architecture patterns', 'Case studies'],
      status: 'not-started'
    },
    { 
      type: 'project', 
      title: 'Architect a medium-scale application', 
      duration: '3 months',
      description: 'Design and lead the implementation of a complete application',
      resources: ['Architecture diagrams', 'Technology selection', 'Team coordination'],
      status: 'not-started'
    },
    { 
      type: 'certification', 
      title: 'Cloud Architecture Certification', 
      duration: '8 weeks',
      description: 'Master cloud infrastructure and architecture patterns',
      resources: ['Cloud provider docs', 'Best practices', 'Design patterns'],
      status: 'not-started'
    },
    { 
      type: 'soft-skill', 
      title: 'Develop leadership skills', 
      duration: 'Ongoing',
      description: 'Build leadership capabilities for technical guidance',
      resources: ['Leadership books', 'Management courses', 'Peer feedback'],
      status: 'not-started'
    },
  ],
  'Data Analyst_to_Data Scientist': [
    { 
      type: 'course', 
      title: 'Machine Learning Fundamentals', 
      duration: '8 weeks',
      description: 'Learn core ML algorithms and statistical foundations',
      resources: ['Coursera ML course', 'Python libraries', 'Math refresher'],
      status: 'not-started'
    },
    { 
      type: 'project', 
      title: 'Build a predictive model', 
      duration: '2 months',
      description: 'Create and deploy a machine learning model from scratch',
      resources: ['Kaggle datasets', 'Model evaluation', 'Deployment tools'],
      status: 'not-started'
    },
    { 
      type: 'certification', 
      title: 'TensorFlow Developer Certificate', 
      duration: '6 weeks',
      description: 'Validate your deep learning and TensorFlow skills',
      resources: ['TensorFlow docs', 'Practice projects', 'Exam preparation'],
      status: 'not-started'
    },
    { 
      type: 'soft-skill', 
      title: 'Improve statistical analysis skills', 
      duration: 'Ongoing',
      description: 'Enhance your statistical reasoning and analysis capabilities',
      resources: ['Statistics courses', 'Research papers', 'Practical applications'],
      status: 'not-started'
    },
  ],
};

// Status icons component to prevent recreation on each render
const StatusIcons = {
  completed: <FaCheck className="h-4 w-4 text-green-500" />,
  'in-progress': <FaSync className="h-4 w-4 text-blue-500 animate-spin" />,
  'not-started': <FaPlus className="h-4 w-4 text-gray-400" />
};

// Icon components for roadmap items
const IconComponents = {
  course: (
    <div className="h-8 w-8 p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
      <FaBook className="h-5 w-5" />
    </div>
  ),
  project: (
    <div className="h-8 w-8 p-1.5 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center">
      <FaCode className="h-5 w-5" />
    </div>
  ),
  certification: (
    <div className="h-8 w-8 p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
      <FaCertificate className="h-5 w-5" />
    </div>
  ),
  'soft-skill': (
    <div className="h-8 w-8 p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
      <FaUsers className="h-5 w-5" />
    </div>
  )
};

export default function PersonalizedRoadmap({ currentRole, targetRole, userSkills }) {
  const [expandedItem, setExpandedItem] = useState(null);
  const [roadmapProgress, setRoadmapProgress] = useState({});
  const [showResources, setShowResources] = useState(false);
  const router = useRouter();

  // Memoize roadmap calculation
  const { roadmap, timelineEstimate } = useMemo(() => {
    if (!currentRole || !targetRole) {
      return { roadmap: [], timelineEstimate: 'Varies' };
    }

    const roadmapKey = `${currentRole}_to_${targetRole}`;
    const roadmap = roadmapTemplates[roadmapKey] || [
      { 
        type: 'course', 
        title: 'Develop relevant skills for your target role', 
        duration: 'Varies',
        description: 'Focus on acquiring the necessary technical and soft skills',
        resources: ['Online courses', 'Practice projects', 'Mentorship'],
        status: 'not-started'
      },
      { 
        type: 'project', 
        title: 'Work on projects that demonstrate your capabilities', 
        duration: 'Varies',
        description: 'Build portfolio projects that showcase your skills',
        resources: ['GitHub repositories', 'Documentation', 'Demo videos'],
        status: 'not-started'
      },
      { 
        type: 'soft-skill', 
        title: 'Develop the soft skills needed for your target role', 
        duration: 'Ongoing',
        description: 'Improve communication, leadership, and collaboration skills',
        resources: ['Workshops', 'Books', 'Practice sessions'],
        status: 'not-started'
      },
    ];

    // Calculate timeline estimate based on roadmap items
    const timelineMap = {
      'weeks': 1,
      'months': 4,
      'Ongoing': 0
    };

    const totalWeeks = roadmap.reduce((total, item) => {
      const [value, unit] = item.duration.split(' ');
      return total + (value * (timelineMap[unit] || 0));
    }, 0);

    const timelineEstimate = totalWeeks > 0 
      ? totalWeeks >= 12 
        ? `${Math.ceil(totalWeeks / 4)} months` 
        : `${totalWeeks} weeks`
      : 'Varies';

    return { roadmap, timelineEstimate };
  }, [currentRole, targetRole]);

  const toggleItem = useCallback((index) => {
    setExpandedItem(prev => prev === index ? null : index);
  }, []);

  const updateProgress = useCallback((index, status) => {
    setRoadmapProgress(prev => ({
      ...prev,
      [index]: status
    }));
  }, []);

  const handleGenerateRoadmap = useCallback(() => {
    router.push('/career-paths/generate-roadmap');
  }, [router]);

  const getStatusIcon = useCallback((status) => {
    return StatusIcons[status] || StatusIcons['not-started'];
  }, []);

  const getIcon = useCallback((type) => {
    return IconComponents[type] || null;
  }, []);

  const completedItems = useMemo(() => 
    Object.values(roadmapProgress).filter(status => status === 'completed').length,
    [roadmapProgress]
  );

  const progressPercentage = useMemo(() => 
    roadmap.length > 0 ? Math.round((completedItems / roadmap.length) * 100) : 0,
    [completedItems, roadmap.length]
  );

  if (!currentRole || !targetRole) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personalized Roadmap</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Your customized career progression plan
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <FaChartLine className="h-5 w-5 text-blue-500" />
          </div>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <FaArrowRight className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Select Career Path</h3>
          <p className="text-gray-500 dark:text-gray-400">Choose your current and target roles to generate a personalized roadmap</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Roadmap to {targetRole}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Your personalized career progression plan
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <FaChartLine className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      {/* Progress Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800 dark:text-white">Your Progress</h3>
          <span className="text-sm font-medium bg-white dark:bg-gray-800 px-2 py-1 rounded-md text-blue-600 dark:text-blue-400">
            {progressPercentage}% Complete
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{completedItems} of {roadmap.length} milestones completed</span>
          <span className="flex items-center">
            <FaCalendarAlt className="h-3 w-3 mr-1" />
            Est: {timelineEstimate}
          </span>
        </div>
      </div>

      {/* Resources Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Path</h3>
        <button
          onClick={() => setShowResources(!showResources)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center"
          aria-expanded={showResources}
        >
          {showResources ? 'Hide' : 'Show'} Resources
          {showResources ? (
            <FaChevronUp className="h-3 w-3 ml-1" />
          ) : (
            <FaChevronDown className="h-3 w-3 ml-1" />
          )}
        </button>
      </div>

      <div className="space-y-3">
        {roadmap.map((item, index) => {
          const status = roadmapProgress[index] || 'not-started';
          const statusColors = {
            'completed': 'border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-900/20',
            'in-progress': 'border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20',
            'not-started': 'border-gray-200 dark:border-gray-700'
          };
          
          return (
            <div 
              key={index} 
              className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${statusColors[status]} ${expandedItem === index ? 'ring-2 ring-blue-500/20' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getIcon(item.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center">
                        <FaCalendarAlt className="h-3 w-3 mr-1" />
                        {item.duration}
                      </span>
                    </div>
                    <h3 
                      className="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={() => toggleItem(index)}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                    
                    {expandedItem === index && (
                      <div className="mt-3 space-y-3">
                        {showResources && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommended Resources:</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                              {item.resources.map((resource, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                  <span>{resource}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 pt-2">
                          <button
                            onClick={() => updateProgress(index, 'not-started')}
                            className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                              status === 'not-started'
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            Not Started
                          </button>
                          <button
                            onClick={() => updateProgress(index, 'in-progress')}
                            className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                              status === 'in-progress'
                                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/40'
                            }`}
                          >
                            In Progress
                          </button>
                          <button
                            onClick={() => updateProgress(index, 'completed')}
                            className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                              status === 'completed'
                                ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900/40'
                            }`}
                          >
                            Completed
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 pl-2">
                  {getStatusIcon(status)}
                  <button
                    onClick={() => toggleItem(index)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
                    aria-label={expandedItem === index ? "Collapse item" : "Expand item"}
                  >
                    {expandedItem === index ? (
                      <FaChevronUp className="h-4 w-4" />
                    ) : (
                      <FaChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generate Roadmap Button */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleGenerateRoadmap}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex flex-col items-center justify-center"
        >
          <div className="flex items-center">
            <FaRobot className="h-5 w-5 mr-2" />
            Generate Advanced Roadmap
          </div>
          <p className="text-xs opacity-90 mt-1">
            AI-powered flowchart with real-time recommendations
          </p>
        </button>
      </div>
    </div>
  );
}