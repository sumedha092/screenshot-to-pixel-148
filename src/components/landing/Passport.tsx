import { motion, useReducedMotion } from "framer-motion";
import { Accent, Eyebrow, LevelChip, PawMark } from "./bits";
import { Doodles } from "./decor";
import { IMAGES } from "./images";
import { Reveal, RevealItem } from "./motion";

const SCORES = [
  ["Energy", 64, "Moderate"],
  ["Stress", 21, "Low"],
  ["Approachability", 90, "High"],
  ["Confidence", 77, "Steady"],
  ["Arousal spikes", 9, "Rare"],
] as const;

const NEEDS = ["Daily walk + sniff time", "Quiet first week", "Fine with calm dogs", "No yard required"];

function Seal() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className="relative grid size-24 place-items-center rounded-full bg-forest text-on-dark shadow-glow"
      animate={reduce ? {} : { rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
        <defs>
          <path id="seal-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <circle cx="50" cy="50" r="46" fill="none" className="stroke-on-dark/40" strokeWidth="1" strokeDasharray="2 3" />
        <text className="fill-on-dark" style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 2.2 }}>
          <textPath href="#seal-circle">BONAFIDE · BEHAVIOR VERIFIED ·</textPath>
        </text>
      </svg>
      <PawMark className="size-8" />
    </motion.div>
  );
}

export function Passport() {
  return (
    <section id="passport" aria-labelledby="passport-title" className="section-pad relative isolate">
      <Doodles layout="passport" />
      <div className="container-page grid items-center gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <RevealItem>
            <Eyebrow>Behavior Passport</Eyebrow>
            <h2 id="passport-title" className="mt-4 text-h2">
              A record that travels <Accent>with the dog.</Accent>
            </h2>
            <p className="mt-5 text-lead text-muted-ink">
              A renter can show this to a landlord instead of a breed label.
            </p>
            <ul className="mt-6 space-y-2 text-body text-muted-ink">
              <li>Signed by shelter staff and a vet.</li>
              <li>Built from days of footage, not one meeting.</li>
              <li>Shareable as a link or a printed page.</li>
            </ul>
          </RevealItem>
        </Reveal>

        <Reveal className="md:col-span-7">
          <RevealItem>
            <figure>
              <article
                aria-label="Sample Behavior Passport for Maple"
                className="paper relative rounded-[28px] border border-line p-6 shadow-lift md:p-9"
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-signature" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[20px] border border-line" />
                <header className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-forest">Behavior Passport</p>
                    <p className="mt-1 text-body text-muted-ink tabular-nums">No. BF-2026-0418 · Issued Nov 2026</p>
                  </div>
                  <Seal />
                </header>

                <div className="relative mt-6 grid grid-cols-[96px_1fr] gap-x-5 gap-y-5 sm:grid-cols-[150px_1fr] sm:gap-x-6">
                  <img
                    src={IMAGES.passport}
                    alt="Maple, a chocolate-brown shelter dog, looking up at the camera"
                    className="photo-grade aspect-[4/5] w-full rounded-[20px] border-4 border-surface object-cover shadow-card sm:row-span-2"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-h2">Maple</h3>
                    <p className="text-body text-muted-ink">About 3 years · 52 lb · 6 days observed</p>
                    <div className="mt-3">
                      <LevelChip level="green">Green handling level</LevelChip>
                    </div>
                  </div>
                  <dl className="col-span-2 grid grid-cols-1 sm:col-span-1 sm:col-start-2 gap-x-6 gap-y-2 text-body sm:grid-cols-2">
                      {SCORES.map(([k, v, note]) => (
                        <div key={k} className="flex items-baseline justify-between border-b border-dashed border-line pb-1">
                          <dt className="font-semibold">{k}</dt>
                          <dd className="font-bold tabular-nums">
                            {v} <span className="font-semibold text-muted-ink">{note}</span>
                          </dd>
                        </div>
                      ))}
                      <div className="flex items-baseline justify-between border-b border-dashed border-line pb-1">
                        <dt className="font-semibold">Breed</dt>
                        <dd className="font-bold text-forest">not used</dd>
                      </div>
                    </dl>
                </div>

                <div className="relative mt-6">
                  <p className="eyebrow text-muted-ink">Needs</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {NEEDS.map((n) => (
                      <li key={n} className="rounded-full border border-line bg-surface px-3 py-1 text-body font-semibold">
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>

                <footer className="relative mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5 text-body text-muted-ink">
                  <div>
                    <p className="font-display text-h3 italic text-ink">R. Alvarez</p>
                    <p>Shelter behavior lead</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-h3 italic text-ink">Dr. K. Osei</p>
                    <p>Shelter veterinarian</p>
                  </div>
                </footer>
              </article>
              <figcaption className="mt-4 text-center text-body text-muted-ink">
                Sample passport. Names and numbers are illustrative.
              </figcaption>
            </figure>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
