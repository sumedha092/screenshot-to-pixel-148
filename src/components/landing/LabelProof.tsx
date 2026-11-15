import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { Accent, Eyebrow } from "./bits";
import { Doodles } from "./decor";
import { IMAGES } from "./images";
import { EASE_UI, Reveal, RevealItem } from "./motion";

const SCORES = [
  ["Energy", 58],
  ["Stress", 26],
  ["Approachability", 84],
  ["Confidence", 71],
  ["Arousal spikes", 14],
] as const;

function LabeledCard({ label }: { label: string }) {
  return (
    <div className="card-surface lift p-3">
      <div className="relative overflow-hidden rounded-[20px]">
        <img
          src={IMAGES.labelProof}
          alt="The same black-and-white shelter dog, smiling on a walk"
          className="photo-grade aspect-[4/5] w-full object-cover"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 hidden rounded-full bg-surface/90 px-3 py-1 text-body font-bold text-ink md:inline-block">
          Labeled: {label}
        </span>
      </div>
      <p className="px-1 pb-1 pt-3 text-center text-body font-bold md:hidden">Labeled: {label}</p>
    </div>
  );
}

export function LabelProof() {
  const reduce = useReducedMotion();
  return (
    <section id="label-proof" aria-labelledby="label-title" className="section-pad relative isolate">
      <Doodles layout="label" />
      <div className="container-page">
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <RevealItem>
            <Eyebrow>The label test</Eyebrow>
            <h2 id="label-title" className="mt-4 text-h2">
              Same dog, two labels, <Accent>one answer.</Accent>
            </h2>
            <p className="mt-4 text-lead text-muted-ink">
              We ran the same kennel footage under two different breed guesses.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 grid grid-cols-2 items-center gap-4 md:grid-cols-12 md:gap-5">
          <RevealItem className="order-1 md:order-none md:col-span-3">
            <LabeledCard label="pit bull" />
          </RevealItem>

          <RevealItem className="relative order-3 col-span-2 md:order-none md:col-span-6">
            <div className="flex justify-center py-1 md:hidden" aria-hidden="true">
              <ArrowDown className="size-6 text-forest" />
            </div>
            <div className="card-surface relative mx-auto max-w-[420px] p-7 md:p-8">
              <span aria-hidden="true" className="absolute left-0 top-1/2 hidden -translate-x-full -translate-y-1/2 md:block">
                <ArrowRight className="size-6 text-forest" />
              </span>
              <span aria-hidden="true" className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-full rotate-180 md:block">
                <ArrowRight className="size-6 text-forest" />
              </span>
              <motion.div
                initial={{ scale: reduce ? 1 : 0.6, opacity: reduce ? 1 : 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: EASE_UI, delay: 0.2 }}
                className="mx-auto grid size-14 place-items-center rounded-full bg-tennis text-bark shadow-card"
              >
                <Check className="size-7" strokeWidth={3} aria-hidden="true" />
              </motion.div>
              <p className="mt-5 text-center font-display text-h3">
                Our scores: <Accent>identical.</Accent>
              </p>
              <p className="mt-1 text-center text-body font-bold text-muted-ink">Breed is never an input.</p>
              <table className="mt-6 w-full text-body">
                <caption className="sr-only">Scores under both labels</caption>
                <thead>
                  <tr className="text-muted-ink">
                    <th scope="col" className="pb-2 text-left font-semibold">Score</th>
                    <th scope="col" className="pb-2 text-right font-semibold">“pit bull”</th>
                    <th scope="col" className="pb-2 text-right font-semibold">“Lab mix”</th>
                  </tr>
                </thead>
                <tbody>
                  {SCORES.map(([k, v]) => (
                    <tr key={k} className="border-t border-line">
                      <th scope="row" className="py-2 text-left font-semibold">{k}</th>
                      <td className="py-2 text-right font-bold tabular-nums">{v}</td>
                      <td className="py-2 text-right font-bold tabular-nums">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealItem>

          <RevealItem className="order-2 md:order-none md:col-span-3">
            <LabeledCard label="Labrador mix" />
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
