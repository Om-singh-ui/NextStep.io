import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";

import { welcomeEmail } from "@/lib/inngest/functions/welcomeEmail";
import { generateIndustryInsights } from "@/lib/inngest/functions/industryInsights";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [welcomeEmail, generateIndustryInsights],
});
