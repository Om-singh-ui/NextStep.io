// lib/checkUser.js
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
import { inngest } from "./inngest/client";

export const checkUser = async () => {
  let user;
  try {
    user = await currentUser();
  } catch (error) {
    // During build time, skip user creation
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
      console.log("🏗️ Build-time detection - skipping user check");
      return null;
    }
    console.error("❌ Auth failed in checkUser:", error);
    return null;
  }

  if (!user) {
    console.log("No user found in checkUser");
    return null;
  }

  try {
    console.log("Checking user:", user.id, user.emailAddresses[0]?.emailAddress);

    // 1. Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser.id);
      return existingUser;
    }

    // 2. Prepare user data
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "New User";
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      console.error("No email found for user");
      return null;
    }

    console.log("Creating new user:", { name, email });

    // 3. Create new user with all required fields
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: email,
        isOnboarded: false,
        skills: [], // Initialize as empty array for JSON field
        bio: "", // Initialize as empty string
        experience: 0, // Initialize with default value
        // industry will be null by default
      },
    });

    console.log("New user created:", newUser.id);
    console.log("User data:", {
      id: newUser.id,
      isOnboarded: newUser.isOnboarded,
      skills: newUser.skills,
      bio: newUser.bio,
      experience: newUser.experience
    });

    // 4. Fire welcome email event
    if (email) {
      try {
        await inngest.send({
          name: "user/created",
          data: {
            email,
            name,
            userId: newUser.id,
          },
        });
        console.log("Welcome email event sent");
      } catch (inngestError) {
        console.error("Failed to send welcome email event:", inngestError);
      }
    }

    return newUser;
  } catch (err) {
    console.error("Error in checkUser:", err instanceof Error ? err.message : String(err));
    return null;
  }
};