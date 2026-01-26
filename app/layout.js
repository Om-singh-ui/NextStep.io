import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

/* Headings */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
});

/* Body / UI */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata = {
  title: "NextStep.io - AI-Powered Career Growth Platform",
  description: "Transforming Career Growth Through AI Precision.",
  icons: "/logo.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased flex flex-col min-h-screen`}
      >
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <ThemeProvider>
            <Header />
            <Chatbot />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
