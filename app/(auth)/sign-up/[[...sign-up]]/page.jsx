"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp
        appearance={{
          elements: {
            card: "shadow-lg border border-gray-200",
          },
        }}
        redirectUrl="/onboarding"
        afterSignUpUrl="/onboarding"
      />
    </div>
  );
}
