// app/(main)/career-paths/_components/AICareerSuggestions.jsx
'use client';

import { useState, useEffect } from 'react';
import { getAICareerSuggestions } from "@/actions/career-path-actions";
import { Button } from "@/components/ui/button"; // ✅ shadcn/ui button
import { Loader2, ArrowRight, Save, ChevronUp, ChevronDown, Search } from "lucide-react";

export default function AICareerSuggestions({ currentRole, userSkills }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  // Gradients
  const cardGradients = [
    'bg-gradient-to-r from-blue-500 to-blue-700',
    'bg-gradient-to-r from-purple-500 to-purple-700',
    'bg-gradient-to-r from-teal-500 to-teal-700',
    'bg-gradient-to-r from-amber-500 to-amber-700',
    'bg-gradient-to-r from-rose-500 to-rose-700',
    'bg-gradient-to-r from-indigo-500 to-indigo-700'
  ];
  const getGradient = (index) => cardGradients[index % cardGradients.length];

  const fetchSuggestions = async () => {
    if (!currentRole) return;
    setLoading(true);
    setError(null);
    setExpandedCard(null);

    try {
      const aiSuggestions = await getAICareerSuggestions(currentRole, userSkills);
      const enhanced = aiSuggestions.map((s, i) => ({
        ...s,
        id: i + 1,
        growth: `${15 + i * 3}% projected growth`,
        salary: `$${100000 + i * 15000} median salary`,
        skillsMatch: `${75 + i * 5}% match`,
        requirements: [
          "Strong problem-solving skills",
          "Experience with cross-functional teams",
          "Technical background preferred",
          "Excellent communication abilities"
        ],
        nextSteps: [
          "Complete relevant certifications",
          "Gain experience in related projects",
          "Network with professionals in the field",
          "Develop specific technical skills"
        ]
      }));
      setSuggestions(enhanced);
    } catch (err) {
      console.error('Error fetching AI suggestions:', err);
      setError('Failed to generate AI suggestions. Showing fallback career paths.');
      setSuggestions([
        {
          id: 1,
          role: 'Product Manager',
          reason: 'Your technical skills would be valuable in product management',
          growth: '15% projected growth',
          salary: '$110,000 median salary',
          skillsMatch: '85% match',
          requirements: ["Strong problem-solving skills", "Cross-functional experience", "Technical background", "Communication abilities"],
          nextSteps: ["Product mgmt certification", "Agile experience", "Network with PMs", "Stakeholder management skills"]
        },
        {
          id: 2,
          role: 'DevOps Engineer',
          reason: 'Your development experience could transition well to DevOps',
          growth: '22% projected growth',
          salary: '$125,000 median salary',
          skillsMatch: '78% match',
          requirements: ["CI/CD pipelines", "Cloud platforms", "Scripting/automation", "Infra as code"],
          nextSteps: ["Learn Docker/Kubernetes", "AWS/Azure/GCP certification", "Infra automation", "Join DevOps communities"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpandCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  useEffect(() => {
    if (currentRole && userSkills?.length > 0) {
      fetchSuggestions();
    }
  }, [currentRole, userSkills]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-800 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI Career Path Suggestions</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Discover your next career move powered by AI analysis
          </p>
        </div>
        <div className="bg-blue-500 p-3 rounded-xl shadow-md">
          <Search className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* If no role selected */}
      {!currentRole ? (
        <div className="text-center py-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl inline-block mb-4">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300">Select your current role</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose your current position to get personalized career suggestions
          </p>
        </div>
      ) : (
        <>
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current role analysis</span>
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">{currentRole}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: loading ? '30%' : '100%' }}
              ></div>
            </div>
          </div>

          {/* Action button */}
          <Button
            onClick={fetchSuggestions}
            disabled={loading}
            className="w-full mb-4"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing your skills...
              </>
            ) : (
              <>
                <ArrowRight className="mr-2 h-4 w-4" />
                Generate Career Suggestions
              </>
            )}
          </Button>

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-700 dark:text-amber-400">
              {error}
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center mb-6">
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">Career Paths For You</h3>
                <span className="ml-2 bg-green-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {suggestions.length} suggestions
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {suggestions.map((s, i) => (
                  <div
                    key={s.id}
                    className={`p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-lg ${expandedCard === s.id ? 'col-span-1 md:col-span-2' : ''}`}
                  >
                    {/* Header */}
                    <div className={`${getGradient(i)} text-white p-5 rounded-lg -mt-5 -mx-5 mb-4`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-xl">{s.role}</h4>
                          <p className="text-blue-100 mt-1">{s.reason}</p>
                        </div>
                        <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                          {s.skillsMatch}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Growth</div>
                        <div className="font-semibold text-gray-800 dark:text-white">{s.growth}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Salary</div>
                        <div className="font-semibold text-gray-800 dark:text-white">{s.salary}</div>
                      </div>
                    </div>

                    {/* Expanded */}
                    {expandedCard === s.id ? (
                      <div className="animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-semibold mb-2">Requirements</h5>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                              {s.requirements.map((req, idx) => <li key={idx}>• {req}</li>)}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-2">Next Steps</h5>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                              {s.nextSteps.map((step, idx) => <li key={idx}>• {step}</li>)}
                            </ul>
                          </div>
                        </div>

                        <div className="flex justify-between mt-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpandCard(s.id)}
                          >
                            Show less <ChevronUp className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-center text-blue-500 hover:text-blue-700"
                        onClick={() => toggleExpandCard(s.id)}
                      >
                        View details <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
