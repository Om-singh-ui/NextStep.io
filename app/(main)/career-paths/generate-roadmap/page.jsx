// app/(main)/career-paths/generate-roadmap/page.jsx
'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import RoadmapGenerator from './_components/RoadmapGenerator';
import { getCareerPathData } from '@/actions/career-path-actions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Brain, Rocket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function GenerateRoadmapPage() {
  const { user } = useUser();
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const data = await getCareerPathData(user.id);
          setCurrentRole(data.currentRole || '');
          setTargetRole(data.targetRole || '');
          setUserSkills(data.skills || []);
        } catch (error) {
          console.error('Error fetching career path data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  const handleBackToCareerPaths = () => {
    router.push('/career-paths');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Enhanced Header with shadcn/ui */}
      <div className="flex flex-col gap-6 mb-8">
        {/* Navigation Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToDashboard}
              className="gap-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToCareerPaths}
              className="gap-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Career Paths
            </Button>
          </div>
          
          <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            <Brain className="h-3 w-3" />
            AI Powered
          </Badge>
        </div>

        {/* Main Header */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Rocket className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Generate Career Roadmap
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              AI-powered roadmap from 
              <span className="font-semibold text-blue-600 dark:text-blue-400 mx-1">
                {currentRole || 'your current role'}
              </span>
              to
              <span className="font-semibold text-purple-600 dark:text-purple-400 mx-1">
                {targetRole || 'your target role'}
              </span>
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 border border-blue-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Ready to generate your personalized roadmap
              </span>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
              Active
            </Badge>
          </div>
        </div>
      </div>

      <RoadmapGenerator 
        currentRole={currentRole}
        targetRole={targetRole}
        userSkills={userSkills}
      />
    </div>
  );
}