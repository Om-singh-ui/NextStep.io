// app/(main)/career-paths/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import RoleExplorer from './_components/RoleExplorer';
import SkillGapAnalysis from './_components/SkillGapAnalysis';
import PersonalizedRoadmap from './_components/PersonalizedRoadmap';
import ProgressTracker from './_components/ProgressTracker';
import AICareerSuggestions from './_components/AICareerSuggestions';
import { getCareerPathData, updateUserSkills } from "@/actions/career-path-actions";

export default function CareerPathsPage() {
    const { user } = useUser();
    const [currentRole, setCurrentRole] = useState('');
    const [targetRole, setTargetRole] = useState('');
    const [userSkills, setUserSkills] = useState([]);
    const [careerPathData, setCareerPathData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const data = await getCareerPathData(user.id);
                    setCurrentRole(data.currentRole || '');
                    setTargetRole(data.targetRole || '');
                    setUserSkills(data.skills || []);
                    setCareerPathData(data.careerPath || null);
                } catch (error) {
                    console.error('Error fetching career path data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [user]);

    const handleRoleChange = (newCurrentRole, newTargetRole) => {
        setCurrentRole(newCurrentRole);
        setTargetRole(newTargetRole);
        // In a real implementation, you would save this to the database
    };

    const handleSkillsUpdate = async (updatedSkills) => {
        setUserSkills(updatedSkills);
        if (user) {
            await updateUserSkills(user.id, updatedSkills);
        }
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
            <div className="mb-10 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight 
    bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
    bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 
    animate-gradient">
                    Career Path Explorer
                </h1>
                <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Plan your journey from{" "}
                    <span className="font-semibold text-primary">
                        {currentRole || "your current role"}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold      ">
                        {targetRole || "your dream role"}
                    </span>
                </p>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    <RoleExplorer
                        currentRole={currentRole}
                        targetRole={targetRole}
                        onRoleChange={handleRoleChange}
                    />

                    <SkillGapAnalysis
                        currentRole={currentRole}
                        targetRole={targetRole}
                        userSkills={userSkills}
                        onSkillsUpdate={handleSkillsUpdate}
                    />

                    <PersonalizedRoadmap
                        currentRole={currentRole}
                        targetRole={targetRole}
                        userSkills={userSkills}
                    />
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    <ProgressTracker
                        currentRole={currentRole}
                        targetRole={targetRole}
                        userSkills={userSkills}
                    />

                    <AICareerSuggestions
                        currentRole={currentRole}
                        userSkills={userSkills}
                    />
                </div>
            </div>
        </div>
    );
}