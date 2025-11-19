"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  let userId;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (error) {
    console.error("❌ Auth failed in updateUser:", error);
    return { success: false, error: "Authentication failed" };
  }

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  console.log("🔄 updateUser called with data:", data);

  try {
    const existingUser = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!existingUser) {
      console.error("❌ User not found for clerkUserId:", userId);
      return { success: false, error: "User not found" };
    }

    console.log("✅ Found existing user:", existingUser.id);

    // SIMPLIFIED VERSION - Remove transaction for now to isolate issues
    let industryInsight = await db.industryInsight.findUnique({
      where: { industry: data.industry },
    });

    // If not exists → create basic entry (skip AI for now)
    if (!industryInsight && data.industry) {
      console.log("📝 Creating new industry insight for:", data.industry);
      industryInsight = await db.industryInsight.create({
        data: {
          industry: data.industry,
          salaryRanges: [],
          growthRate: 0,
          demandLevel: "Medium",
          topSkills: [],
          marketOutlook: "Stable",
          keyTrends: [],
          recommendedSkills: [],
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // Normalize skills
    let normalizedSkills = data.skills;
    if (typeof normalizedSkills === "string") {
      normalizedSkills = normalizedSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (!Array.isArray(normalizedSkills)) {
      normalizedSkills = [];
    }

    // Prepare update payload
    const updatePayload = {
      industry: data.industry,
      experience: data.experience,
      bio: data.bio,
      skills: normalizedSkills,
      isOnboarded: true, // CRITICAL: This must be set
    };

    console.log("📤 Updating user with payload:", updatePayload);

    // Update user data
    const updatedUser = await db.user.update({
      where: { id: existingUser.id },
      data: updatePayload,
    });

    console.log("✅ User updated successfully:", {
      id: updatedUser.id,
      isOnboarded: updatedUser.isOnboarded,
      industry: updatedUser.industry
    });

    revalidatePath("/");

    return { 
      success: true, 
      updatedUser: {
        id: updatedUser.id,
        isOnboarded: updatedUser.isOnboarded,
        industry: updatedUser.industry
      } 
    };
  } catch (error) {
    console.error("❌ Error in updateUser:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      code: error.code
    });
    return { 
      success: false, 
      error: error.message || "Failed to update profile" 
    };
  }
}

export async function getUserOnboardingStatus() {
  let userId;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (error) {
    // During build time, auth() will fail - return default values
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
      console.log("🏗️ Build-time detection - returning default onboarding status");
      return { isOnboarded: false };
    }
    console.error("❌ Auth failed in getUserOnboardingStatus:", error);
    return { isOnboarded: false };
  }

  if (!userId) {
    console.log("❌ No user ID in getUserOnboardingStatus");
    return { isOnboarded: false };
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { 
        isOnboarded: true,
        industry: true,
        skills: true,
        bio: true,
        experience: true 
      },
    });

    console.log("🔍 getUserOnboardingStatus - User data:", user);

    // SIMPLIFIED: Only check isOnboarded flag
    const isOnboarded = user?.isOnboarded === true;

    console.log("🔍 getUserOnboardingStatus - isOnboarded:", isOnboarded);

    return {
      isOnboarded: isOnboarded,
      userData: user // Include full user data for debugging
    };
  } catch (error) {
    console.error("❌ Error in getUserOnboardingStatus:", error);
    return { isOnboarded: false };
  }
}