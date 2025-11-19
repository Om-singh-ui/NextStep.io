import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./_component/dashboard-view";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

// REMOVED: export const dynamic = 'force-dynamic';
// The page can now be statically generated when possible

export default async function DashboardPage() {
  let onboarding;

  try {
    onboarding = await getUserOnboardingStatus();
  } catch (error) {
    console.error("❌ Onboarding check failed:", error);
    redirect("/sign-in");
  }

  const { isOnboarded } = onboarding;

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  let insights = null;

  try {
    insights = await getIndustryInsights();
  } catch (error) {
    console.error("❌ Failed to load insights:", error);
  }

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights || {}} />
    </div>
  );
}