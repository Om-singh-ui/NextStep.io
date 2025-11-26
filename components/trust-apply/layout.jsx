// nextstep.io/app/(dashboard)/trust-apply/layout.jsx
import { PageTransition } from "@/components/trust-apply/page-transition"

export const metadata = {
  title: "TrustApply™ - Job Authenticity & Negotiation Tools",
  description: "AI-powered tools to verify job authenticity, negotiate better offers, and protect your career journey",
}

export default function TrustApplyLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <PageTransition>
        {children}
      </PageTransition>
    </div>
  )
}