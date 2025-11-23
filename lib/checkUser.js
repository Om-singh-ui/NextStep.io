// lib/checkUser.js
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

// Import inngest conditionally to avoid build errors
let inngest;
try {
  inngest = require("./inngest/client").inngest;
} catch (error) {
  console.warn("⚠️ Inngest not available, continuing without event system");
}

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
    console.log("🔐 No user found in checkUser");
    return null;
  }

  try {
    console.log("👤 Checking user:", user.id, user.emailAddresses[0]?.emailAddress);

    // 1. Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (existingUser) {
      console.log("✅ User already exists:", existingUser.id);
      return existingUser;
    }

    // 2. Prepare user data
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "New User";
    const email = user.primaryEmailAddressId ? 
      user.emailAddresses.find(addr => addr.id === user.primaryEmailAddressId)?.emailAddress :
      user.emailAddresses[0]?.emailAddress;

    if (!email) {
      console.error("❌ No email found for user");
      // Still create user but without email events
      console.warn("⚠️ Creating user without email");
    }

    console.log("📝 Creating new user:", { name, email: email || 'no-email' });

    // 3. Create new user with all required fields and error handling for duplicates
    try {
      const newUser = await db.user.create({
        data: {
          clerkUserId: user.id,
          name,
          imageUrl: user.imageUrl,
          email: email || "", // Use empty string if no email
          isOnboarded: false,
          skills: [], // Initialize as empty array for JSON field
          bio: "", // Initialize as empty string
          experience: 0, // Initialize with default value
          // industry will be null by default
        },
      });

      console.log("✅ New user created:", newUser.id);
      console.log("📊 User data:", {
        id: newUser.id,
        isOnboarded: newUser.isOnboarded,
        skills: newUser.skills,
        bio: newUser.bio,
        experience: newUser.experience,
        email: newUser.email
      });

      // 4. Fire welcome email event only if email exists and inngest is available
      if (email && inngest) {
        try {
          await inngest.send({
            name: "user/created",
            data: {
              email,
              name,
              userId: newUser.id,
            },
          });
          console.log("📧 Welcome email event sent");
        } catch (inngestError) {
          console.warn("⚠️ Failed to send welcome email event (non-critical):", inngestError.message);
          // Don't fail the whole process if inngest fails
        }
      } else if (!email) {
        console.log("📭 No email available, skipping welcome email");
      } else if (!inngest) {
        console.log("🔌 Inngest not available, skipping welcome email");
      }

      return newUser;

    } catch (createError) {
      // Handle unique constraint violation - user might have been created by another process
      if (createError.code === 'P2002') {
        console.log("🔄 User already exists (race condition), fetching existing user");
        const raceUser = await db.user.findUnique({
          where: { clerkUserId: user.id },
        });
        if (raceUser) {
          console.log("✅ Retrieved existing user after race condition:", raceUser.id);
          return raceUser;
        }
      }
            throw createError;
    }

  } catch (err) {
    console.error("❌ Error in checkUser:", {
      message: err.message,
      code: err.code,
      name: err.name
    });
    
    return null;
  }
};