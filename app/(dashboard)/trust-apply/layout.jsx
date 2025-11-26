// nextstep.io/app/(dashboard)/trust-apply/layout.jsx
import { PageTransition } from "@/components/trust-apply/page-transition"

export default function TrustApplyLayout({ children }) {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  )
}