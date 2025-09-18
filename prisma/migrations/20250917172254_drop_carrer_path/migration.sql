/*
  Warnings:

  - You are about to drop the `Assessment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CareerPath` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoverLetter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IndustryInsight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Milestone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resume` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Assessment" DROP CONSTRAINT "Assessment_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CareerPath" DROP CONSTRAINT "CareerPath_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CoverLetter" DROP CONSTRAINT "CoverLetter_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Milestone" DROP CONSTRAINT "Milestone_careerPathId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Resume" DROP CONSTRAINT "Resume_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_industry_fkey";

-- DropTable
DROP TABLE "public"."Assessment";

-- DropTable
DROP TABLE "public"."CareerPath";

-- DropTable
DROP TABLE "public"."CoverLetter";

-- DropTable
DROP TABLE "public"."IndustryInsight";

-- DropTable
DROP TABLE "public"."Milestone";

-- DropTable
DROP TABLE "public"."Resume";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
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

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."assessments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quizScore" DOUBLE PRECISION NOT NULL,
    "questions" JSONB[],
    "category" TEXT NOT NULL,
    "improvementTip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."resumes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "atsScore" DOUBLE PRECISION,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cover_letters" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "jobDescription" TEXT,
    "companyName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cover_letters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."industry_insights" (
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

    CONSTRAINT "industry_insights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."career_paths" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentRoleId" TEXT,
    "targetRoleId" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "career_paths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."milestones" (
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

    CONSTRAINT "milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ai_career_suggestions" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_career_suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."career_path_selections" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentRole" TEXT NOT NULL,
    "selectedRole" TEXT NOT NULL,
    "selectionReason" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'ai-suggestion',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "career_path_selections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "level" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_skills" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "proficiency" INTEGER NOT NULL DEFAULT 1,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_skills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkUserId_key" ON "public"."users"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "assessments_userId_idx" ON "public"."assessments"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "resumes_userId_key" ON "public"."resumes"("userId");

-- CreateIndex
CREATE INDEX "cover_letters_userId_idx" ON "public"."cover_letters"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "industry_insights_industry_key" ON "public"."industry_insights"("industry");

-- CreateIndex
CREATE INDEX "industry_insights_industry_idx" ON "public"."industry_insights"("industry");

-- CreateIndex
CREATE UNIQUE INDEX "career_paths_userId_key" ON "public"."career_paths"("userId");

-- CreateIndex
CREATE INDEX "career_paths_currentRoleId_idx" ON "public"."career_paths"("currentRoleId");

-- CreateIndex
CREATE INDEX "career_paths_targetRoleId_idx" ON "public"."career_paths"("targetRoleId");

-- CreateIndex
CREATE INDEX "milestones_careerPathId_idx" ON "public"."milestones"("careerPathId");

-- CreateIndex
CREATE INDEX "ai_career_suggestions_userId_idx" ON "public"."ai_career_suggestions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ai_career_suggestions_userId_priority_key" ON "public"."ai_career_suggestions"("userId", "priority");

-- CreateIndex
CREATE INDEX "career_path_selections_userId_idx" ON "public"."career_path_selections"("userId");

-- CreateIndex
CREATE INDEX "career_path_selections_createdAt_idx" ON "public"."career_path_selections"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "roles_title_key" ON "public"."roles"("title");

-- CreateIndex
CREATE INDEX "roles_category_idx" ON "public"."roles"("category");

-- CreateIndex
CREATE INDEX "roles_level_idx" ON "public"."roles"("level");

-- CreateIndex
CREATE INDEX "user_skills_userId_idx" ON "public"."user_skills"("userId");

-- CreateIndex
CREATE INDEX "user_skills_category_idx" ON "public"."user_skills"("category");

-- CreateIndex
CREATE UNIQUE INDEX "user_skills_userId_name_key" ON "public"."user_skills"("userId", "name");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_industry_fkey" FOREIGN KEY ("industry") REFERENCES "public"."industry_insights"("industry") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."assessments" ADD CONSTRAINT "assessments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."resumes" ADD CONSTRAINT "resumes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cover_letters" ADD CONSTRAINT "cover_letters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."career_paths" ADD CONSTRAINT "career_paths_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."career_paths" ADD CONSTRAINT "career_paths_currentRoleId_fkey" FOREIGN KEY ("currentRoleId") REFERENCES "public"."roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."career_paths" ADD CONSTRAINT "career_paths_targetRoleId_fkey" FOREIGN KEY ("targetRoleId") REFERENCES "public"."roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."milestones" ADD CONSTRAINT "milestones_careerPathId_fkey" FOREIGN KEY ("careerPathId") REFERENCES "public"."career_paths"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_career_suggestions" ADD CONSTRAINT "ai_career_suggestions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."career_path_selections" ADD CONSTRAINT "career_path_selections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_skills" ADD CONSTRAINT "user_skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
