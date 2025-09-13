import { inngest } from "../client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.NODE_ENV === "production"
    ? "NextStep.io <welcome@yourdomain.com>"
    : "NextStep.io <onboarding@resend.dev>";

export const welcomeEmail = inngest.createFunction(
  { id: "send-welcome-email" },
  { event: "user/created" },
  async ({ event }) => {
    // Expect event.data to contain { email, name }
    const { email, name } = event.data;

    if (!email) {
      console.error("No email provided in event.data. Cannot send welcome email.");
      return { status: "error", message: "Missing email in event data" };
    }

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "👋 Welcome to NextStep.io – Let’s Grow Your Career Together",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
            <h1 style="color:#4F46E5;">Welcome to NextStep.io${name ? `, ${name}` : ""}! 🎉</h1>
            <p>
              I’m <strong>Om Singh</strong>, one of the developers here at <strong>NextStep.io</strong>.
              Thank you for joining our platform — we’re excited to have you on board.
            </p>
            <p>
              At <strong>NextStep.io</strong>, our mission is to help you grow in your career with the power
              of AI. Whether you’re preparing for interviews, exploring career paths, or building skills
              that matter most, we’ve got the tools to guide you every step of the way.
            </p>
            <h3 style="margin-top:25px; color:#4F46E5;">Here’s what you can do next:</h3>
            <ul style="padding-left:20px;">
              <li>🚀 Build your AI-powered resume and portfolio</li>
              <li>💡 Explore personalized career insights tailored to your profile</li>
              <li>🎯 Practice interviews and track your progress in real time</li>
            </ul>
            <p style="margin-top:20px;">
              To get started, click below to access your dashboard:
            </p>
            <p style="text-align:center; margin:30px 0;">
              <a href="https://nextstep.io/dashboard"
                 style="background:#4F46E5; color:#fff; padding:14px 24px; border-radius:6px;
                        text-decoration:none; font-weight:bold; display:inline-block;">
                Go to Your Dashboard
              </a>
            </p>
            <p>If you have any questions or feedback, just reply to this email — I’d love to hear from you.</p>
            <p style="margin-top:40px;">
              Best regards,<br/>
              <strong>Om Singh</strong><br/>
              Developer @ NextStep.io
            </p>
            <hr style="margin-top:40px; border:none; border-top:1px solid #eee;" />
            <p style="font-size:12px; color:#777;">
              You received this email because you signed up for NextStep.io. If this wasn’t you, ignore this email.
            </p>
          </div>
        `,
      });

      console.log(`Welcome email sent to ${email}`);
      return { status: "success", sentTo: email };
    } catch (error) {
      console.error("Error sending welcome email:", error);
      return { status: "error", message: error.message };
    }
  }
);
