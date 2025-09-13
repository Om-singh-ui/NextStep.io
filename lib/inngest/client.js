import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "Next-Step.io", // Unique app ID
  name: "NextStep.io",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
