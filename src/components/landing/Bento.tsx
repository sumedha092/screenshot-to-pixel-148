import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Heart, Home, Stethoscope, UserRound, Users } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Accent, Eyebrow, LevelChip, type Level } from "./bits";
import { Doodles } from "./decor";
import { IMAGES } from "./images";
import { EASE_UI, Reveal, RevealItem } from "./motion";

function Tile({
  title,
  kicker,
  detail,
  className,
  children,
}: {
  title: string;
  kicker: string;
  detail: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <RevealItem className={cn("h-full", className)}>
      <article tabIndex={0} className="group card-surface lift flex h-full flex-col overflow-hidden p-6 md:p-7">
        <p className="eyebrow text-muted-ink">{kicker}</p>
        <h3 className="mt-2 text-h3">{title}</h3>
        <div className="mt-5 flex-1">{children}</div>
        <p className="bento-detail mt-5 border-t border-line pt-4 text-body text-muted-ink">{detail}</p>
      </article>
    </RevealItem>
  );
}

const STRESS = [78, 66, 51, 38, 29];

function SettlingChart() {
  const reduce = useReducedMotion();
  const w = 240;
  const h = 110;
  // high stress sits high on the chart
  const pp = STRESS.map((v, i) => [12 + (i * (w - 24)) / 4, 10 + ((100 - v) / 100) * (h - 20)] as const);
  const d = pp.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
  return (
    <figure>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Stress score falls from 78 on day 1 to 29 on day 5">
        {[0, 1, 2].map((i) => (
          <line key={i} x1="0" x2={w} y1={15 + i * 30} y2={15 + i * 30} className="stroke-line" strokeWidth="1" />
        ))}
        <motion.path
          d={d}
          fill="none"
          className="stroke-forest"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE_UI }}
        />
        {pp.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" className="fill-tennis stroke-forest" strokeWidth="2" />
        ))}
      </svg>
      <figcaption className="mt-2 flex justify-between text-body font-semibold text-muted-ink tabular-nums">
        {STRESS.map((_, i) => (
          <span key={i}>D{i + 1}</span>
        ))}
      </figcaption>
    </figure>
  );
}

const LEVELS: { level: Level; name: string; who: string }[] = [
  { level: "green", name: "Green", who: "First-time owners, kids" },
  { level: "yellow", name: "Yellow", who: "Some dog experience" },
  { level: "orange", name: "Orange", who: "Confident handler, routine" },
  { level: "red", name: "Red", who: "Staff-guided placement" },
];

const DOGS = [
  { name: "Pepper", img: IMAGES.avatarA, alt: "Small black, white and tan dog" },
  { name: "Juno", img: IMAGES.avatarB, alt: "Fluffy white and brown dog smiling" },
  { name: "Biscuit", img: IMAGES.avatarC, alt: "Young golden puppy running" },
];
const FAMILIES = [
  { name: "First-time renter", icon: UserRound },
  { name: "Family + kids", icon: Home },
  { name: "Active couple", icon: Users },
];
// dog index -> family index, match %
const PAIRS: [number, number, number][] = [
  [0, 1, 94],
  [1, 2, 91],
  [2, 0, 89],
];
const ROW_Y = [14, 47, 80] as const;
const rowY = (i: number): number => ROW_Y[i as 0 | 1 | 2] ?? 50;

function MatchViz() {
  const reduce = useReducedMotion();
  // viewBox matches the 16:11 box, so circles and curves stay true
  const W = 160;
  const H = 110;
  const y = (i: number) => (rowY(i) / 100) * H;
  return (
    <div
      className="relative mx-auto aspect-[16/11] w-full max-w-[560px]"
      role="img"
      aria-label="Three dogs matched to three families at once: Pepper to the family with kids at 94%, Juno to the active couple at 91%, Biscuit to the first-time renter at 89%."
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden="true">
        {PAIRS.map(([d, f], i) => (
          <motion.path
            key={i}
            d={`M20,${y(d)} C80,${y(d)} 80,${y(f)} 140,${y(f)}`}
            fill="none"
            className="stroke-grass"
            strokeWidth="0.9"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, delay: 0.3 + i * 0.3, ease: EASE_UI }}
          />
        ))}
      </svg>
      {DOGS.map((dog, i) => (
        <div
          key={dog.name}
          className="absolute left-[6.25%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ top: `${rowY(i)}%` }}
        >
          <img
            src={dog.img}
            alt={dog.alt}
            className="photo-grade size-11 rounded-full border-2 border-surface object-cover shadow-card md:size-14"
            loading="lazy"
          />
          <span className="absolute top-full mt-1 whitespace-nowrap text-body font-bold">{dog.name}</span>
        </div>
      ))}
      {FAMILIES.map((fam, i) => (
        <div
          key={fam.name}
          className="absolute left-[93.75%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ top: `${rowY(i)}%` }}
        >
          <span className="grid size-11 place-items-center rounded-full border border-line bg-forest-tint text-forest shadow-card md:size-14">
            <fam.icon className="size-5" aria-hidden="true" />
          </span>
          <span className="absolute right-0 top-full mt-1 whitespace-nowrap text-body font-bold sm:right-auto">
            {fam.name}
          </span>
        </div>
      ))}
      {PAIRS.map(([d, f, pct], i) => (
        <motion.span
          key={pct}
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bark px-2.5 py-0.5 text-body font-extrabold text-on-dark tabular-nums"
          style={{ top: `${(rowY(d) + rowY(f)) / 2}%` }}
          initial={{ opacity: reduce ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1 + i * 0.3, duration: 0.3 }}
        >
          {pct}%
        </motion.span>
      ))}
    </div>
  );
}

const NOTES = [
  { day: "Day 2", who: "Staff", icon: Heart, text: "Shy with tall visitors, warms up fast with treats." },
  { day: "Day 4", who: "Vet", icon: Stethoscope, text: "Ear discomfort treated — stress scores re-checked." },
];

export function Bento() {
  return (
    <section id="demo" aria-labelledby="bento-title" className="section-pad relative isolate">
      <div aria-hidden="true" className="paw-trail pointer-events-none absolute inset-0 -z-10" />
      <Doodles layout="bento" />
      <div className="container-page">
        <Reveal className="max-w-[40rem]">
          <RevealItem>
            <Eyebrow>What it sees</Eyebrow>
            <h2 id="bento-title" className="mt-4 text-h2">
              Built for real shelters, <Accent>real kennels.</Accent>
            </h2>
            <p className="mt-4 text-lead text-muted-ink [@media(hover:none)]:hidden">Hover a tile for the detail.</p>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 grid gap-5 md:grid-cols-6">
          <Tile
            className="md:col-span-4 md:row-span-2"
            kicker="Matching"
            title="Whole-shelter matching"
            detail="We solve every pairing together, so one great match never blocks three good ones. Staff can lock or swap any pair."
          >
            <div className="flex h-full items-center">
              <MatchViz />
            </div>
          </Tile>

          <Tile
            className="md:col-span-2"
            kicker="Over days"
            title="Settling in"
            detail="Day-one stress isn't personality. We wait for the dog to settle before scores count."
          >
            <SettlingChart />
          </Tile>

          <Tile
            className="md:col-span-2"
            kicker="Handling levels"
            title="Who each dog suits"
            detail="Levels describe the home a dog needs today — and they move as the dog does."
          >
            <ul className="space-y-2.5">
              {LEVELS.map((l) => (
                <li key={l.level} className="flex flex-wrap items-center justify-between gap-2">
                  <LevelChip level={l.level}>{l.name}</LevelChip>
                  <span className="text-body text-muted-ink">{l.who}</span>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile
            className="md:col-span-2"
            kicker="Any camera"
            title="Camera-shake proof"
            detail="Works on volunteers' handheld phone video — we stabilize before we measure."
          >
            <div className="relative overflow-hidden rounded-[20px] bg-line">
              <div className="shaky">
                <img src={IMAGES.shake} alt="Two small mixed-breed dogs trotting down a dirt path" className="photo-grade aspect-[4/3] w-full scale-110 object-cover" loading="lazy" />
              </div>
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-3 py-1 text-body font-bold text-ink">
                <Check className="size-4 text-grass" aria-hidden="true" /> Stabilized
              </span>
            </div>
          </Tile>

          <Tile
            className="md:col-span-2"
            kicker="People first"
            title="Staff + vet in the loop"
            detail="Every score can be annotated, questioned or overridden. A person signs off before a family sees it."
          >
            <ol className="relative space-y-4 border-l-2 border-line pl-5">
              {NOTES.map((n) => (
                <li key={n.day} className="relative">
                  <span className="absolute -left-[31px] top-0.5 grid size-5 place-items-center rounded-full bg-forest-tint ring-2 ring-line">
                    <n.icon className="size-3 text-forest" aria-hidden="true" />
                  </span>
                  <p className="text-body font-bold">
                    {n.day} · {n.who}
                  </p>
                  <p className="text-body text-muted-ink">{n.text}</p>
                </li>
              ))}
            </ol>
            <span className="chip chip-green mt-4">
              <Check className="size-4" aria-hidden="true" /> Reviewed
            </span>
          </Tile>

          <Tile
            className="md:col-span-2"
            kicker="Fairness"
            title="Label-proof"
            detail="Swap the breed on the kennel card and nothing changes. Breed is never an input."
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-line bg-canvas px-3 py-1 text-body font-semibold text-muted-ink line-through">pit bull</span>
              <span className="rounded-full border border-line bg-canvas px-3 py-1 text-body font-semibold text-muted-ink line-through">Lab mix</span>
            </div>
            <p className="mt-4 font-display text-h3">
              Same dog. <Accent>Same scores.</Accent>
            </p>
            <a href="#label-proof" className="mt-4 inline-flex items-center gap-1.5 rounded-md text-body font-bold text-forest hover:underline">
              See the test <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Tile>
        </Reveal>
      </div>
    </section>
  );
}
