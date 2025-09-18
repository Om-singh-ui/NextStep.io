/*
  Warnings:

  - You are about to drop the `ai_career_suggestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `assessments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `career_path_selections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `career_paths` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cover_letters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `industry_insights` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `milestones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resumes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_skills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ai_career_suggestions" DROP CONSTRAINT "ai_career_suggestions_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."assessments" DROP CONSTRAINT "assessments_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."career_path_selections" DROP CONSTRAINT "career_path_selections_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."career_paths" DROP CONSTRAINT "career_paths_currentRoleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."career_paths" DROP CONSTRAINT "career_paths_targetRoleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."career_paths" DROP CONSTRAINT "career_paths_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."cover_letters" DROP CONSTRAINT "cover_letters_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."milestones" DROP CONSTRAINT "milestones_careerPathId_fkey";

-- DropForeignKey
ALTER TABLE "public"."resumes" DROP CONSTRAINT "resumes_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_skills" DROP CONSTRAINT "user_skills_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_industry_fkey";

-- DropTable
DROP TABLE "public"."ai_career_suggestions";

-- DropTable
DROP TABLE "public"."assessments";

-- DropTable
DROP TABLE "public"."career_path_selections";

-- DropTable
DROP TABLE "public"."career_paths";

-- DropTable
DROP TABLE "public"."cover_letters";

-- DropTable
DROP TABLE "public"."industry_insights";

-- DropTable
DROP TABLE "public"."milestones";

-- DropTable
DROP TABLE "public"."resumes";

-- DropTable
DROP TABLE "public"."roles";

-- DropTable
DROP TABLE "public"."user_skills";

-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "industry" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bio" TEXT,
    "experience" INTEGER,
    "currentRole" TEXT,
    "targetRole" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Assessment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quizScore" DOUBLE PRECISION NOT NULL,
    "questions" JSONB[],
    "category" TEXT NOT NULL,
    "improvementTip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Resume" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "atsScore" DOUBLE PRECISION,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoverLetter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "jobDescription" TEXT,
    "companyName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoverLetter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."IndustryInsight" (
    "id" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "salaryRanges" JSONB[],
    "growthRate" DOUBLE PRECISION NOT NULL,
    "demandLevel" TEXT NOT NULL,
    "topSkills" TEXT[],
    "marketOutlook" TEXT NOT NULL,
    "keyTrends" TEXT[],
    "recommendedSkills" TEXT[],
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IndustryInsight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CareerPath" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentRoleId" TEXT,
    "targetRoleId" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Milestone" (
    "id" TEXT NOT NULL,
    "careerPathId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AICareerSuggestion" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AICareerSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CareerPathSelection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentRole" TEXT NOT NULL,
    "selectedRole" TEXT NOT NULL,
    "selectionReason" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerPathSelection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "level" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserSkill" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "proficiency" INTEGER NOT NULL DEFAULT 1,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSkill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "public"."User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "Assessment_userId_idx" ON "public"."Assessment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_userId_key" ON "public"."Resume"("userId");

-- CreateIndex
CREATE INDEX "CoverLetter_userId_idx" ON "public"."CoverLetter"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "IndustryInsight_industry_key" ON "public"."IndustryInsight"("industry");

-- CreateIndex
CREATE INDEX "IndustryInsight_industry_idx" ON "public"."IndustryInsight"("industry");

-- CreateIndex
CREATE UNIQUE INDEX "CareerPath_userId_key" ON "public"."CareerPath"("userId");

-- CreateIndex
CREATE INDEX "CareerPath_currentRoleId_idx" ON "public"."CareerPath"("currentRoleId");

-- CreateIndex
CREATE INDEX "CareerPath_targetRoleId_idx" ON "public"."CareerPath"("targetRoleId");

-- CreateIndex
CREATE INDEX "Milestone_careerPathId_idx" ON "public"."Milestone"("careerPathId");

-- CreateIndex
CREATE INDEX "AICareerSuggestion_userId_idx" ON "public"."AICareerSuggestion"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AICareerSuggestion_userId_priority_key" ON "public"."AICareerSuggestion"("userId", "priority");

-- CreateIndex
CREATE INDEX "CareerPathSelection_userId_idx" ON "public"."CareerPathSelection"("userId");

-- CreateIndex
CREATE INDEX "CareerPathSelection_createdAt_idx" ON "public"."CareerPathSelection"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Role_title_key" ON "public"."Role"("title");

-- CreateIndex
CREATE INDEX "Role_category_idx" ON "public"."Role"("category");

-- CreateIndex
CREATE INDEX "Role_level_idx" ON "public"."Role"("level");

-- CreateIndex
CREATE INDEX "UserSkill_userId_idx" ON "public"."UserSkill"("userId");

-- CreateIndex
CREATE INDEX "UserSkill_category_idx" ON "public"."UserSkill"("category");

-- CreateIndex
CREATE UNIQUE INDEX "UserSkill_userId_name_key" ON "public"."UserSkill"("userId", "name");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_industry_fkey" FOREIGN KEY ("industry") REFERENCES "public"."IndustryInsight"("industry") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Assessment" ADD CONSTRAINT "Assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoverLetter" ADD CONSTRAINT "CoverLetter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CareerPath" ADD CONSTRAINT "CareerPath_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CareerPath" ADD CONSTRAINT "CareerPath_currentRoleId_fkey" FOREIGN KEY ("currentRoleId") REFERENCES "public"."Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CareerPath" ADD CONSTRAINT "CareerPath_targetRoleId_fkey" FOREIGN KEY ("targetRoleId") REFERENCES "public"."Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Milestone" ADD CONSTRAINT "Milestone_careerPathId_fkey" FOREIGN KEY ("careerPathId") REFERENCES "public"."CareerPath"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AICareerSuggestion" ADD CONSTRAINT "AICareerSuggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CareerPathSelection" ADD CONSTRAINT "CareerPathSelection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserSkill" ADD CONSTRAINT "UserSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
