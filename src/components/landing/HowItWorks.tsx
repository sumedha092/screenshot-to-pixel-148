import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Activity, Users, Video } from "lucide-react";
import { useRef } from "react";
import { Accent, Eyebrow } from "./bits";
import { Doodles, FadedPhoto } from "./decor";
import { IMAGES } from "./images";
import { Reveal, RevealItem } from "./motion";

const STEPS = [
  {
    icon: Video,
    title: "Kennel scan",
    text: "A fixed camera or a volunteer's phone records the kennel. No collars, no extra handling.",
  },
  {
    icon: Activity,
    title: "Behavior scores",
    text: "Energy, stress, approachability, confidence and arousal — measured across several days, not one bad afternoon.",
  },
  {
    icon: Users,
    title: "Whole-shelter match",
    text: "Every dog and every waiting family, matched at once, so the best fit wins — not the first in line.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section-pad relative isolate">
      <FadedPhoto src={IMAGES.parkRun} tone="canvas" />
      <div aria-hidden="true" className="paw-trail pointer-events-none absolute inset-0 -z-10" />
      <Doodles layout="how" />
      <div className="container-page">
        <Reveal className="max-w-[40rem]">
          <RevealItem>
            <Eyebrow>How it works</Eyebrow>
            <h2 id="how-title" className="mt-4 text-h2">
              From kennel video to <Accent>the right home.</Accent>
            </h2>
          </RevealItem>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          {/* connecting line (desktop: horizontal, mobile: vertical) */}
          <div aria-hidden="true" className="absolute left-[16.66%] right-[16.66%] top-9 hidden h-0.5 bg-line md:block">
            <motion.div
              className="h-full origin-left bg-forest"
              style={{ scaleX: reduce ? 1 : progress }}
            />
          </div>
          <div aria-hidden="true" className="absolute bottom-10 left-9 top-9 w-0.5 bg-line md:hidden">
            <motion.div className="h-full w-full origin-top bg-forest" style={{ scaleY: reduce ? 1 : progress }} />
          </div>

          <Reveal as="ol" className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((s, i) => (
              <RevealItem as="li" key={s.title} className="flex gap-5 md:flex-col md:items-center md:text-center">
                <div className="relative grid size-[72px] shrink-0 place-items-center rounded-full border border-line bg-forest-tint shadow-card">
                  <s.icon className="size-7 text-forest" aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-bark text-body font-extrabold text-on-dark tabular-nums">
                    {i + 1}
                  </span>
                </div>
                <div className="md:mt-6 md:max-w-[18rem]">
                  <h3 className="text-h3">{s.title}</h3>
                  <p className="mt-2 text-body text-muted-ink">{s.text}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
