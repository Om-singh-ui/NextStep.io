/*
  Warnings:

  - You are about to drop the column `progress` on the `CareerPath` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Milestone` table. All the data in the column will be lost.
  - You are about to drop the column `currentRole` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `targetRole` on the `User` table. All the data in the column will be lost.
  - Added the required column `currentRoleId` to the `CareerPath` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetRoleId` to the `CareerPath` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Milestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Milestone` table without a default value. This is not possible if the table is not empty.
  - Made the column `duration` on table `Milestone` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."CareerPath" DROP COLUMN "progress",
ADD COLUMN     "currentRoleId" TEXT NOT NULL,
ADD COLUMN     "targetRoleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Milestone" DROP COLUMN "description",
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "duration" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "currentRole",
DROP COLUMN "skills",
DROP COLUMN "targetRole";

-- CreateTable
CREATE TABLE "public"."Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" TEXT NOT NULL,
    "milestoneId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_title_key" ON "public"."Role"("title");

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CareerPath" ADD CONSTRAINT "CareerPath_currentRoleId_fkey" FOREIGN KEY ("currentRoleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CareerPath" ADD CONSTRAINT "CareerPath_targetRoleId_fkey" FOREIGN KEY ("targetRoleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "public"."Milestone"("id") ON DELETE CASCADE ON UPDATE CASCADE;
