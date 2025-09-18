import { inngest } from "../client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Define your domain
const APP_DOMAIN = "https://nextstepio.vercel.app";

const FROM_EMAIL =
  process.env.NODE_ENV === "production"
    ? "NextStep.io <welcome@https://nextstepio.vercel.app>"
    : "NextStep.io <onboarding@resend.dev>";

export const welcomeEmail = inngest.createFunction(
  { id: "send-welcome-email" },
  { event: "user/created" },
  async ({ event }) => {
    // Extract data from event - works for both manual invocation and code triggers
    const { email, name } = event.data || event;

    if (!email) {
      throw new Error("No email provided in event data");
    }

    try {
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `👋 Welcome to NextStep.io${name ? `, ${name}` : ""} – Let's Grow Your Career Together`,
        html: `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to NextStep.io</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, #4F46E5 0%, #7E22CE 100%);
            padding: 30px;
            text-align: center;
            color: white;
            border-radius: 0 0 20px 20px;
        }
        
        .logo {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        
        .logo-badge {
            background-color: rgba(255,255,255,0.15);
            padding: 8px 20px;
            border-radius: 30px;
            display: inline-block;
        }
        
        .tagline {
            margin: 10px 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        
        /* Main Content */
        .content {
            padding: 40px 30px;
        }
        
        .welcome-heading {
            color: #4F46E5;
            font-size: 24px;
            margin-bottom: 25px;
            text-align: center;
        }
        
        .welcome-badge {
            background-color: #f3f4f6;
            padding: 12px 20px;
            border-radius: 10px;
            display: inline-block;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        
        .intro-text {
            margin-bottom: 20px;
            text-align: center;
            color: #4b5563;
        }
        
        /* Features Section */
        .features-container {
            background-color: #f9fafc;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }
        
        .features-title {
            color: #4F46E5;
            margin-bottom: 25px;
            text-align: center;
            font-size: 20px;
            position: relative;
            padding-bottom: 10px;
        }
        
        .features-title:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 3px;
            background: linear-gradient(to right, #4F46E5, #7E22CE);
            border-radius: 3px;
        }
        
        /* 2x2 Grid Layout for Cards */
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        
        .card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.07);
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        
        .icon-container {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
        }
        
        .card:nth-child(1) .icon-container {
            background-color: #eef2ff;
        }
        
        .card:nth-child(2) .icon-container {
            background-color: #f0f9ff;
        }
        
        .card:nth-child(3) .icon-container {
            background-color: #fdf2f8;
        }
        
        .card:nth-child(4) .icon-container {
            background-color: #f1fdf0;
        }
        
        .icon {
            font-size: 24px;
        }
        
        .card-title {
            margin: 0 0 10px;
            color: #4F46E5;
            font-size: 16px;
            font-weight: 600;
        }
        
        .card-text {
            margin: 0;
            font-size: 14px;
            color: #6b7280;
            line-height: 1.5;
        }
        
        /* CTA Section */
        .cta-text {
            margin-bottom: 25px;
            text-align: center;
            font-size: 18px;
            color: #374151;
            font-weight: 500;
        }
        
        /* Enhanced Button Gradient */
        .cta-button {
            background: linear-gradient(135deg, #4F46E5 0%, #7E22CE 70%, #C084FC 100%);
            color: white;
            padding: 16px 40px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
            transition: all 0.3s ease;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 18px rgba(79, 70, 229, 0.5);
        }
        
        .cta-button:active {
            transform: translateY(1px);
        }
        
        /* Adding a subtle shine effect for better visibility */
        .cta-button::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                to bottom right,
                rgba(255, 255, 255, 0.2),
                rgba(255, 255, 255, 0)
            );
            transform: rotate(30deg);
        }
        
        .signature {
            border-top: 1px solid #e5e7eb;
            padding-top: 30px;
            margin-top: 40px;
            text-align: center;
        }
        
        .closing-text {
            margin-bottom: 20px;
            color: #4b5563;
        }
        
        .name {
            margin-bottom: 5px;
            font-weight: 700;
            color: #4F46E5;
            cursor: pointer;
            display: inline-block;
            transition: all 0.2s ease;
        }
        
        .name:hover {
            color: #7E22CE;
            text-decoration: underline;
        }
        
        .title {
            margin: 0;
            color: #6b7280;
            font-size: 14px;
        }
        
        /* Footer */
        .footer {
            background-color: #f9fafb;
            padding: 25px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
            border-radius: 20px 20px 0 0;
        }
        
        .copyright {
            margin: 0 0 15px;
        }
        
        .footer-links {
            margin: 15px 0;
        }
        
        .footer-link {
            color: #4F46E5;
            text-decoration: none;
            margin: 0 12px;
            transition: color 0.2s ease;
        }
        
        .footer-link:hover {
            color: #7E22CE;
            text-decoration: underline;
        }
        
        .footer-note {
            margin: 15px 0 0;
            font-size: 12px;
        }
        
        @media only screen and (max-width: 620px) {
            .container {
                width: 100% !important;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .cards-grid {
                grid-template-columns: 1fr;
            }
            
            .card {
                margin: 0 0 15px 0;
            }
            
            .cta-button {
                display: block;
                margin: 0 auto;
                padding: 14px 30px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1 class="logo">
                <span class="logo-badge">NextStep.io</span>
            </h1>
            <p class="tagline">Your AI-powered career growth platform</p>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <h2 class="welcome-heading">
                <span class="welcome-badge">Welcome to NextStep.io, Chouhan! 🎉</span>
            </h2>
            
            <p class="intro-text">
                I'm <strong>Om Singh</strong>, the developer behind <strong>NextStep.io</strong>.
                On behalf of our entire team, I want to extend a warm welcome and thank you for joining our community.
            </p>
            
            <p class="intro-text">
                We created NextStep.io with one mission: to help professionals like you navigate your career journey with confidence. 
                Whether you're preparing for interviews, exploring new career paths, or building skills that matter, 
                we're here to support you every step of the way.
            </p>
            
            <div class="features-container">
                <h3 class="features-title">Here's what you can do next:</h3>
                
                <!-- 2x2 Grid Layout -->
                <div class="cards-grid">
                    <!-- Card 1 -->
                    <div class="card">
                        <div class="icon-container">
                            <span class="icon">🚀</span>
                        </div>
                        <h4 class="card-title">Build Your Profile</h4>
                        <p class="card-text">Create your AI-powered resume and portfolio in minutes.</p>
                    </div>
                    
                    <!-- Card 2 -->
                    <div class="card">
                        <div class="icon-container">
                            <span class="icon">💡</span>
                        </div>
                        <h4 class="card-title">Get Insights</h4>
                        <p class="card-text">Discover personalized career recommendations tailored just for you.</p>
                    </div>
                    
                    <!-- Card 3 -->
                    <div class="card">
                        <div class="icon-container">
                            <span class="icon">🎯</span>
                        </div>
                        <h4 class="card-title">Practice Interviews</h4>
                        <p class="card-text">Hone your skills with our AI-powered interview simulator.</p>
                    </div>
                    
                    <!-- Card 4 - New Card -->
                    <div class="card">
                        <div class="icon-container">
                            <span class="icon">🔍</span>
                        </div>
                        <h4 class="card-title">Explore Features</h4>
                        <p class="card-text">Try our resume builder, cover letter generator, and interview prep tools.</p>
                    </div>
                </div>
            </div>
            
            <p class="cta-text">
                Ready to take the next step in your career journey?
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${APP_DOMAIN}/dashboard" class="cta-button">
                    Access Your Dashboard
                </a>
            </div>
            
            <div class="signature">
                <p class="closing-text">
                    We're genuinely excited to be part of your career growth story. If you have any questions, 
                    feedback, or just want to share your journey, please don't hesitate to reply to this email. 
                    I personally read and respond to every message.
                </p>
                
                <a href="https://www.linkedin.com/in/om-singh-chouhan-1a761a323" target="_blank" style="text-decoration: none;">
                    <p class="name">Om Singh Chouhan</p>
                </a>
                <p class="title">Founder and CEO at NextStep.io</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p class="copyright">© 2025 NextStep.io. All rights reserved.</p>
            
            <div class="footer-links">
                <a href="${APP_DOMAIN}/privacy" class="footer-link">Privacy Policy</a>
                <a href="${APP_DOMAIN}/terms" class="footer-link">Terms of Service</a>
                <a href="${APP_DOMAIN}/contact" class="footer-link">Contact Us</a>
            </div>
            
            <p class="footer-note">
                You received this email because you signed up for NextStep.io
            </p>
        </div>
    </div>
</body>
</html>
        `,
      });

      if (error) {
        throw new Error(`Resend error: ${error.message}`);
      }

      return { success: true, messageId: data?.id };
    } catch (error) {
      throw new Error(`Failed to send welcome email: ${error.message}`);
    }
  }
);
