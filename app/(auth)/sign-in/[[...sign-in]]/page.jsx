"use client";

import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn
        appearance={{
          elements: {
            card: "shadow-lg border border-gray-200",
          },
        }}
      />
    </div>
  );
};

export default SignInPage;
