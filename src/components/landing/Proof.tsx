import { Accent, Eyebrow } from "./bits";
import { Doodles } from "./decor";
import { CountUp, Reveal, RevealItem } from "./motion";

const STATS = [
  { to: 28, suffix: "%", text: "of surrenders are behavior mismatches — the dog and the home just didn't fit." },
  { to: 27, suffix: "%", text: "of housing-related surrenders come from breed or size bans." },
  { to: 3, suffix: "×", text: "longer shelter stay, from a single label on a kennel card." },
];

export function Proof() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="section-pad relative isolate">
      <div aria-hidden="true" className="paw-trail pointer-events-none absolute inset-0 -z-10" />
      <Doodles layout="proof" />
      <Reveal className="container-page">
        <RevealItem className="max-w-[40rem]">
          <Eyebrow>The problem</Eyebrow>
          <h2 id="proof-title" className="mt-4 text-h2">
            A label decides too much, <Accent>too early.</Accent>
          </h2>
        </RevealItem>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STATS.map((s) => (
            <RevealItem key={s.suffix + s.to} className="card-surface lift p-8">
              <p className="font-display text-display text-forest">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-4 text-lead text-muted-ink">{s.text}</p>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
