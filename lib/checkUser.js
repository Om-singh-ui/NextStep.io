// lib/checkUser.ts
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
import { inngest } from "./inngest/client";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  try {
    // 1. Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });
    if (existingUser) return existingUser;

    // 2. Prepare user data
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "New User";
    const email = user.emailAddresses[0]?.emailAddress;

    // 3. Create new user
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: email ?? "",
      },
    });

    // 4. Fire welcome email event (guard against missing email)
    if (email) {
      await inngest.send({
        name: "user/created",
        data: {
          email,
          name,
          userId: newUser.id,
        },
      });
    }

    return newUser;
  } catch (err) {
    console.error(
      "Error in checkUser:",
      err instanceof Error ? err.message : String(err)
    );
    throw err;
  }
};
