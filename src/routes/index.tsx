import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { Bento } from "@/components/landing/Bento";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LabelProof } from "@/components/landing/LabelProof";
import { Nav } from "@/components/landing/Nav";
import { Passport } from "@/components/landing/Passport";
import { Proof } from "@/components/landing/Proof";
import { IMAGES } from "@/components/landing/images";

const TITLE = "Bonafide — Judge the dog, not the label";
const DESC =
  "Bonafide measures shelter dogs' real behavior from kennel video over several days — never breed — and matches the whole shelter to waiting families at once.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: IMAGES.hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: IMAGES.hero },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-background text-foreground">
        {/* faint 12-column grid lines behind light sections */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
          <div className="container-page grid-lines h-full" />
        </div>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-bark px-4 py-2 text-on-dark focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <div className="relative z-10">
          <Nav />
          <main id="main">
            <Hero />
            <Proof />
            <HowItWorks />
            <Bento />
            <LabelProof />
            <Passport />
            <ClosingCta />
          </main>
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}
