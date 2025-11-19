import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
]);


export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  const { userId } = session;

  // No user → redirect to sign in
  if (!userId && isProtectedRoute(req)) {
    return session.redirectToSignIn({
      returnBackUrl: req.url,
    });
  }

  // Allow request to continue
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/",
  ],
};
