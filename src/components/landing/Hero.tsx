import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accent, Eyebrow, LevelChip } from "./bits";
import { BouncingBall, Hills } from "./decor";
import { IMAGES } from "./images";
import { EASE_UI } from "./motion";

const SCORES = [
  { label: "Energy", value: 62, note: "Moderate" },
  { label: "Stress", value: 22, note: "Low" },
  { label: "Approachability", value: 88, note: "High" },
  { label: "Confidence", value: 74, note: "Steady" },
  { label: "Arousal spikes", value: 12, note: "Rare" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 800], [0, 120]); // glow moves 15% of scroll

  return (
    <section id="top" className="section-dark relative isolate overflow-hidden">
      <motion.div aria-hidden="true" style={reduce ? {} : { y: glowY }} className="pointer-events-none absolute inset-0">
        <div className="glow-forest absolute -left-40 top-[-10%] size-[620px] opacity-50" />
        <div className="glow-grass absolute right-[-160px] top-[30%] size-[600px] opacity-35" />
        <div className="glow-tennis absolute bottom-[-25%] left-[30%] size-[480px] opacity-20" />
      </motion.div>
      <Hills front="canvas" />

      <div className="container-page relative grid items-center gap-14 pb-24 pt-16 md:grid-cols-12 md:gap-8 md:pb-[120px] md:pt-24">
        <motion.div
          className="md:col-span-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_UI }}
        >
          <Eyebrow tone="tennis">Behavior, measured — never breed</Eyebrow>
          <h1 className="mt-5 text-display text-on-dark">
            Judge the dog, <span className="block"><Accent tone="tennis">not the label.</Accent></span>
          </h1>
          <p className="mt-6 max-w-[30rem] text-lead text-on-dark/75">
            We measure real behavior from kennel video and match every dog to the family where they'll thrive.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="pill">
              <a href="#demo">See the demo</a>
            </Button>
            <Button asChild variant="outlineDark" size="pill">
              <a href="#how-it-works">How it works</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_UI }}
        >
          <BouncingBall className="-right-3 -top-10 md:-right-14 md:top-[38%]" />
          <LiveCard />
        </motion.div>
      </div>
    </section>
  );
}

function LiveCard() {
  const reduce = useReducedMotion();
  const drift = reduce
    ? {}
    : {
        animate: { x: ["0%", "-3%", "2%", "0%"], y: ["0%", "1.5%", "-1%", "0%"] },
        transition: { duration: 9, repeat: Infinity, ease: "easeInOut" as const },
      };

  return (
    <motion.div
      animate={reduce ? {} : { y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="card-surface relative z-10 bg-surface p-3 text-ink"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-line">
        <motion.div className="absolute inset-[-6%]" {...drift}>
          <img
            src={IMAGES.hero}
            alt="A happy brown-and-white shelter dog looking at the camera"
            className="photo-grade size-full object-cover"
            width={900}
            height={675}
          />
          {/* tracking box follows the same drift as the dog */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[30%] top-[12%] h-[62%] w-[42%]"
            animate={reduce ? {} : { scale: [1, 1.03, 0.99, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 rounded-[14px] border-2 border-sky/80" />
            {["left-0 top-0 border-l-4 border-t-4 rounded-tl-[14px]", "right-0 top-0 border-r-4 border-t-4 rounded-tr-[14px]", "left-0 bottom-0 border-l-4 border-b-4 rounded-bl-[14px]", "right-0 bottom-0 border-r-4 border-b-4 rounded-br-[14px]"].map((c) => (
              <span key={c} className={`absolute size-5 border-sky ${c}`} />
            ))}
            <span className="absolute left-2 top-2 rounded-full bg-sky px-2.5 py-0.5 text-body font-bold text-bark tabular-nums">
              dog · 0.97
            </span>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-bark/80 px-3 py-1 text-body font-extrabold text-on-dark">
          <span className="live-dot size-2.5 rounded-full bg-tennis" aria-hidden="true" />
          LIVE
        </div>
        <div className="absolute bottom-3 right-3 rounded-full bg-surface/90 px-3 py-1 text-body font-bold text-ink tabular-nums">
          Kennel 14 · Session 4
        </div>
      </div>

      <div className="px-3 pb-3 pt-5">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-h3 text-ink">Live analysis</p>
          <p className="text-body text-muted-ink tabular-nums">312 min observed</p>
        </div>
        <ul className="mt-4 space-y-3">
          {SCORES.map((s, i) => (
            <li key={s.label} className="grid grid-cols-[9.5rem_1fr_2.5rem] items-center gap-3 text-body">
              <span className="font-semibold">{s.label}</span>
              <span className="h-2 overflow-hidden rounded-full bg-line" role="presentation">
                <motion.span
                  className="block h-full rounded-full bg-signature"
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.6 + i * 0.25, ease: EASE_UI }}
                />
              </span>
              <span className="text-right font-bold text-ink tabular-nums">
                {s.value}
                <span className="sr-only"> out of 100, {s.note}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <LevelChip level="green">Green — great for first-time owners</LevelChip>
        </div>
      </div>
    </motion.div>
  );
}
