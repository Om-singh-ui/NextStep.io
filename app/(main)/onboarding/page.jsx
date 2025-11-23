import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { getUserOnboardingStatus } from "@/actions/user";
import { checkUser } from "@/lib/checkUser";
import { currentUser } from "@clerk/nextjs/server";

export default async function OnboardingPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in"); // redirect unauthenticated users immediately
  }

  let isOnboarded = false;

  try {
    await checkUser();
    const status = await getUserOnboardingStatus();
    isOnboarded = status.isOnboarded;
  } catch (error) {
    console.error("❌ Onboarding page error:", error);
    // optionally show fallback UI or log, but don't redirect here
  }
  // dashnoard redirect---->osc 
  if (isOnboarded) {
    redirect("/dashboard"); // outside try/catch
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
}
