"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ChevronDown, Check, Sparkles, ArrowRight, Building2, Briefcase, Star, Award, User, Plus, X, Heart, Target, Calendar, BookOpen, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [animateProgress, setAnimateProgress] = useState(false);
  const formRef = useRef(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const watchIndustry = watch("industry");
  const watchExperience = watch("experience");
  const watchBio = watch("bio");

  // Pre-popular skills suggestions by industry
  const skillSuggestions = {
    "tech": ["JavaScript", "Python", "React", "Node.js", "AWS", "SQL", "TypeScript", "Git", "Docker"],
    "healthcare": ["Patient Care", "EMR", "Medical Terminology", "CPR", "Phlebotomy", "HIPAA", "Clinical Skills"],
    "finance": ["Financial Analysis", "Excel", "Accounting", "Risk Management", "Bloomberg Terminal", "CFA", "Investment Strategies"],
    "marketing": ["SEO", "Google Analytics", "Content Strategy", "Social Media", "PPC", "Copywriting", "Brand Management"],
    "education": ["Curriculum Development", "Classroom Management", "Lesson Planning", "Student Assessment", "Differentiated Instruction"]
  };

  const getIndustrySkillSuggestions = () => {
    if (!watchIndustry) return [];
    const industryKey = watchIndustry.toLowerCase();
    for (const key in skillSuggestions) {
      if (industryKey.includes(key)) {
        return skillSuggestions[key];
      }
    }
    return ["Communication", "Problem Solving", "Teamwork", "Leadership", "Time Management"];
  };

  const handleAddSkill = (skill) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !selectedSkills.includes(trimmedSkill)) {
      const newSkills = [...selectedSkills, trimmedSkill];
      setSelectedSkills(newSkills);
      setValue("skills", newSkills.join(", "));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const newSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    setSelectedSkills(newSkills);
    setValue("skills", newSkills.join(", "));
  };

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  const nextStep = async () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = await trigger(["industry", "subIndustry"]);
    } else if (currentStep === 2) {
      isValid = await trigger(["experience"]);
    } else if (currentStep === 3) {
      isValid = selectedSkills.length > 0;
    } else if (currentStep === 4) {
      isValid = true;
    }
    
    if (isValid) {
      setAnimateProgress(true);
      // Scroll to top of form
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setAnimateProgress(false);
      }, 500);
    }
  };

  const prevStep = () => {
    setAnimateProgress(true);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setAnimateProgress(false);
    }, 500);
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const progressValue = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-3">
            Welcome to Your Career Journey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's create your personalized professional profile to help you reach your career goals
          </p>
        </div>
        
        <Card className="w-full shadow-2xl border-0 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500" />
          
          <div className="flex flex-col md:flex-row">
            {/* Sidebar with progress */}
            <div className="md:w-1/3 bg-gradient-to-b from-muted/50 to-indigo-50 p-6 flex flex-col dark:from-muted/20 dark:to-muted/30">
              <div className="mb-8">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-background shadow-lg flex items-center justify-center border-4 border-muted">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-2 shadow-md">
                      <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-center font-semibold text-lg text-foreground">Your Profile Progress</h3>
                <div className="mt-6 space-y-6">
                  <div className={`flex items-center gap-3 ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary/10 border border-primary/20' : 'bg-muted'}`}>
                      {currentStep > 1 ? <Check className="h-5 w-5" /> : <span>1</span>}
                    </div>
                    <span>Industry</span>
                  </div>
                  
                  <div className={`flex items-center gap-3 ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary/10 border border-primary/20' : 'bg-muted'}`}>
                      {currentStep > 2 ? <Check className="h-5 w-5" /> : <span>2</span>}
                    </div>
                    <span>Experience</span>
                  </div>
                  
                  <div className={`flex items-center gap-3 ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary/10 border border-primary/20' : 'bg-muted'}`}>
                      {currentStep > 3 ? <Check className="h-5 w-5" /> : <span>3</span>}
                    </div>
                    <span>Skills</span>
                  </div>
                  
                  <div className={`flex items-center gap-3 ${currentStep >= 4 ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-primary/10 border border-primary/20' : 'bg-muted'}`}>
                      <span>4</span>
                    </div>
                    <span>Bio</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto bg-card p-4 rounded-lg border border-muted shadow-sm">
                <h4 className="font-medium text-card-foreground mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Pro Tip
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentStep === 1 && "Selecting the right industry helps us personalize your experience."}
                  {currentStep === 2 && "Your experience level helps match you with appropriate opportunities."}
                  {currentStep === 3 && "Adding relevant skills increases your visibility to recruiters by 40%."}
                  {currentStep === 4 && "A complete bio makes your profile 5x more likely to be viewed."}
                </p>
              </div>
            </div>
            
            {/* Form content */}
            <div className="md:w-2/3 p-6 md:p-8" ref={formRef}>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-primary">Step {currentStep} of 4</span>
                  <span className="text-sm font-medium text-muted-foreground">{Math.round(progressValue)}% complete</span>
                </div>
                <Progress value={animateProgress ? progressValue : progressValue} className="h-2 bg-muted" />
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-center mb-2">
                      <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                        <Building2 className="h-6 w-6 text-primary" />
                        What's your industry?
                      </h2>
                      <p className="text-muted-foreground">Select the field you work in or are interested in</p>
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="industry" className="text-base font-medium">
                        Industry
                      </Label>
                      <Select
                        onValueChange={(value) => {
                          setValue("industry", value);
                          setSelectedIndustry(
                            industries.find((ind) => ind.id === value)
                          );
                          setValue("subIndustry", "");
                        }}
                      >
                        <SelectTrigger id="industry" className="h-12 text-md">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Industries</SelectLabel>
                            {industries.map((ind) => (
                              <SelectItem key={ind.id} value={ind.id} className="py-3">
                                <div className="flex items-center gap-2">
                                  <Briefcase className="h-4 w-4 text-primary" />
                                  {ind.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.industry && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <span>⚠</span> {errors.industry.message}
                        </p>
                      )}
                    </div>

                    {watchIndustry && (
                      <div className="space-y-4">
                        <Label htmlFor="subIndustry" className="text-base font-medium">
                          Specialization
                        </Label>
                        <Select
                          onValueChange={(value) => setValue("subIndustry", value)}
                        >
                          <SelectTrigger id="subIndustry" className="h-12 text-md">
                            <SelectValue placeholder="Select your specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Specializations</SelectLabel>
                              {selectedIndustry?.subIndustries.map((sub) => (
                                <SelectItem key={sub} value={sub} className="py-3">
                                  {sub}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors.subIndustry && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <span>⚠</span> {errors.subIndustry.message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-center mb-2">
                      <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                        <Calendar className="h-6 w-6 text-primary" />
                        Your Experience Level
                      </h2>
                      <p className="text-muted-foreground">How many years have you been working professionally?</p>
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="experience" className="text-base font-medium">
                        Years of Experience
                      </Label>
                      <div className="relative">
                        <Input
                          id="experience"
                          type="number"
                          min="0"
                          max="50"
                          placeholder="0"
                          className="h-14 text-center text-xl font-medium border-muted-foreground/20 focus:border-primary"
                          {...register("experience")}
                        />
                        <div className="absolute right-4 top-0 h-full flex items-center text-muted-foreground">
                          years
                        </div>
                      </div>
                      {errors.experience && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <span>⚠</span> {errors.experience.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg border border-muted-foreground/20">
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Experience level guidance:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 0-2 years: Entry Level</li>
                        <li>• 3-5 years: Mid Level</li>
                        <li>• 6-10 years: Senior Level</li>
                        <li>• 10+ years: Leadership/Executive</li>
                      </ul>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-center mb-2">
                      <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                        <Star className="h-6 w-6 text-primary" />
                        Your Skills & Expertise
                      </h2>
                      <p className="text-muted-foreground">What are you good at? Add your top skills</p>
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="skills" className="text-base font-medium">
                        Add your skills
                      </Label>
                      
                      <div className="flex gap-2">
                        <Input
                          id="skills"
                          placeholder="Type a skill and press Enter..."
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddSkill(skillInput);
                            }
                          }}
                          className="flex-1"
                        />
                        <Button 
                          type="button" 
                          onClick={() => handleAddSkill(skillInput)}
                          variant="secondary"
                          className="gap-1"
                        >
                          <Plus className="h-4 w-4" /> Add
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 min-h-12 p-2 bg-muted rounded-md border border-muted-foreground/20">
                        {selectedSkills.map(skill => (
                          <Badge 
                            key={skill} 
                            variant="secondary" 
                            className="px-3 py-1.5 bg-primary/10 text-primary-foreground hover:bg-primary/20 cursor-pointer flex items-center gap-1"
                            onClick={() => removeSkill(skill)}
                          >
                            {skill} <X className="h-3 w-3" />
                          </Badge>
                        ))}
                        {selectedSkills.length === 0 && (
                          <p className="text-sm text-muted-foreground italic p-2">No skills added yet</p>
                        )}
                      </div>
                      
                      {errors.skills && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <span>⚠</span> {errors.skills.message}
                        </p>
                      )}
                    </div>
                    
                    {getIndustrySkillSuggestions().length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Suggestions for your industry:</p>
                        <div className="flex flex-wrap gap-2">
                          {getIndustrySkillSuggestions().map(skill => (
                            <Badge 
                              key={skill} 
                              variant="outline" 
                              className="px-2 py-1 cursor-pointer hover:bg-primary/10 transition-colors"
                              onClick={() => handleAddSkill(skill)}
                            >
                              + {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-center mb-2">
                      <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                        <Heart className="h-6 w-6 text-primary" />
                        Your Professional Story
                      </h2>
                      <p className="text-muted-foreground">Introduce yourself to the community</p>
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="bio" className="text-base font-medium">
                        Professional Bio
                      </Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about your professional background, achievements, and aspirations..."
                        className="h-32 text-md p-4 resize-none"
                        {...register("bio")}
                      />
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          This will be visible on your profile. Aim for 2-3 sentences that highlight your expertise.
                        </p>
                        <span className={`text-xs ${watchBio?.length > 250 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {watchBio?.length || 0}/250
                        </span>
                      </div>
                      {errors.bio && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <span>⚠</span> {errors.bio.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg border border-muted-foreground/20">
                      <h4 className="font-medium mb-2 text-foreground">Preview:</h4>
                      <div className="text-sm text-muted-foreground italic p-3 bg-background rounded border">
                        {watchBio || "Your bio will appear here..."}
                      </div>
                    </div>
                  </div>
                )}
              </form>
              
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                    className="gap-1"
                  >
                    <ChevronDown className="h-4 w-4 rotate-90" /> Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 4 ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    className="gap-1"
                  >
                    Next <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    onClick={handleSubmit(onSubmit)}
                    disabled={updateLoading}
                    className="gap-1"
                  >
                    {updateLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Complete Profile <Check className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
        
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Your information is secure and will never be shared without your permission</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;