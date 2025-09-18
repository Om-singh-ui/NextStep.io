import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; 
import  Header  from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import Chatbot from "@/components/chatbot";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextStep.io",
  description: "Ai Based Carrer Growth Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ClerkProvider
          appearance={{
            baseTheme: dark, 
          }}
        >
          <ThemeProvider>
            <Header />
            <Chatbot />
            <main suppressHydrationWarning className="flex-grow">
              {children}
            </main>
            <Footer/>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
