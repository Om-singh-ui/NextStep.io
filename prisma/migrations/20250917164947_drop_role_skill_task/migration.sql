/*
  Warnings:

  - You are about to drop the column `currentRoleId` on the `CareerPath` table. All the data in the column will be lost.
  - You are about to drop the column `targetRoleId` on the `CareerPath` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Milestone` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Milestone` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CareerPath" DROP CONSTRAINT "CareerPath_currentRoleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CareerPath" DROP CONSTRAINT "CareerPath_targetRoleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Skill" DROP CONSTRAINT "Skill_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_milestoneId_fkey";

-- AlterTable
ALTER TABLE "public"."CareerPath" DROP COLUMN "currentRoleId",
DROP COLUMN "targetRoleId",
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Milestone" DROP COLUMN "order",
DROP COLUMN "slug",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "duration" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "currentRole" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "targetRole" TEXT;

-- DropTable
DROP TABLE "public"."Role";

-- DropTable
DROP TABLE "public"."Skill";

-- DropTable
DROP TABLE "public"."Task";
