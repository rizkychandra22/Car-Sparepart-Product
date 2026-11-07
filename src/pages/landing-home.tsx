import { ClosingCta } from "@/features/landing/closing-cta"
import { FeaturesSection } from "@/features/landing/features-section"
import { HeroSection } from "@/features/landing/hero-section"
import { StatsSection } from "@/features/landing/stats-section"
import { WorkflowSection } from "@/features/landing/workflow-section"

export default function LandingHome() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <WorkflowSection />
      <ClosingCta />
    </>
  )
}
