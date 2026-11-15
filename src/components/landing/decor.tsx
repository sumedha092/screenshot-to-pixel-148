import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Decorative dog-park art. Everything here is aria-hidden, pointer-events-none and
 * sits behind content (-z-10 inside an `isolate` section). All motion stops for
 * reduced-motion users.
 */

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Bone() {
  return (
    <svg viewBox="0 0 48 24" {...line}>
      <path d="M12 9.5A4.2 4.2 0 1 0 6.5 12a4.2 4.2 0 1 0 5.5 2.5h24a4.2 4.2 0 1 0 5.5-2.5 4.2 4.2 0 1 0-5.5-2.5z" />
    </svg>
  );
}
function Ball() {
  return (
    <svg viewBox="0 0 24 24" {...line}>
      <circle cx="12" cy="12" r="9" />
      <path d="M4.6 6.8c4 2.6 4 7.8 0 10.4M19.4 6.8c-4 2.6-4 7.8 0 10.4" />
    </svg>
  );
}
function Frisbee() {
  return (
    <svg viewBox="0 0 32 22" {...line}>
      <ellipse cx="16" cy="9" rx="14" ry="6" />
      <ellipse cx="16" cy="9" rx="7" ry="2.6" />
      <path d="M2 9v2.5c0 3.3 6.3 6 14 6s14-2.7 14-6V9" />
    </svg>
  );
}
function Leash() {
  return (
    <svg viewBox="0 0 32 32" {...line}>
      <ellipse cx="8" cy="7" rx="5" ry="3.6" transform="rotate(-30 8 7)" />
      <path d="M11.5 9.5c6 3 -1 9 6 12.5 2.4 1.2 3.6 2.2 4.5 3.5" />
      <rect x="21" y="24" width="5" height="6.5" rx="2" transform="rotate(-35 23.5 27)" />
    </svg>
  );
}
function Bowl() {
  return (
    <svg viewBox="0 0 32 22" {...line}>
      <ellipse cx="16" cy="7" rx="13" ry="3" />
      <path d="M3 7l2.8 10.5c.3 1 1.2 1.5 2.2 1.5h16c1 0 1.9-.6 2.2-1.5L29 7" />
      <path d="M12.5 13.5h7M14 12a1 1 0 1 0-1.5 1.5M18 12a1 1 0 1 1 1.5 1.5M14 15a1 1 0 1 1-1.5-1.5M18 15a1 1 0 1 0 1.5-1.5" />
    </svg>
  );
}
function Hydrant() {
  return (
    <svg viewBox="0 0 24 32" {...line}>
      <path d="M11 3.5h2v2M7.5 9a4.5 4.5 0 0 1 9 0z" />
      <rect x="7" y="9" width="10" height="17" rx="1.2" />
      <rect x="3.5" y="13" width="3.5" height="4.5" rx="1" />
      <rect x="17" y="13" width="3.5" height="4.5" rx="1" />
      <circle cx="12" cy="15.3" r="1.8" />
      <rect x="5" y="26" width="14" height="3" rx="1" />
    </svg>
  );
}

const ICONS = { bone: Bone, ball: Ball, frisbee: Frisbee, leash: Leash, bowl: Bowl, hydrant: Hydrant };
type IconName = keyof typeof ICONS;
type Spot = { icon: IconName; top: string; left: string; size: number; rotate: number; depth: number };

/** Icon positions per section — kept mostly in the side margins. */
const LAYOUTS: Record<string, Spot[]> = {
  proof: [
    { icon: "bone", top: "10%", left: "84%", size: 96, rotate: -18, depth: 60 },
    { icon: "ball", top: "70%", left: "3%", size: 56, rotate: 0, depth: 90 },
    { icon: "hydrant", top: "18%", left: "62%", size: 52, rotate: 6, depth: 40 },
  ],
  how: [
    { icon: "frisbee", top: "8%", left: "78%", size: 88, rotate: 14, depth: 70 },
    { icon: "leash", top: "62%", left: "88%", size: 72, rotate: -10, depth: 50 },
    { icon: "bone", top: "80%", left: "6%", size: 70, rotate: 24, depth: 80 },
  ],
  bento: [
    { icon: "bowl", top: "4%", left: "80%", size: 92, rotate: -6, depth: 60 },
    { icon: "ball", top: "46%", left: "-2%", size: 60, rotate: 0, depth: 100 },
    { icon: "hydrant", top: "88%", left: "92%", size: 56, rotate: -8, depth: 50 },
  ],
  label: [
    { icon: "leash", top: "6%", left: "4%", size: 76, rotate: 12, depth: 70 },
    { icon: "frisbee", top: "84%", left: "80%", size: 80, rotate: -12, depth: 60 },
  ],
  passport: [
    { icon: "bone", top: "8%", left: "40%", size: 80, rotate: 30, depth: 60 },
    { icon: "bowl", top: "82%", left: "2%", size: 76, rotate: 4, depth: 80 },
    { icon: "ball", top: "88%", left: "52%", size: 48, rotate: 0, depth: 110 },
  ],
};

function Doodle({ spot, index, progress }: { spot: Spot; index: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], [spot.depth, -spot.depth]);
  const Icon = ICONS[spot.icon];
  return (
    <motion.div
      className="absolute"
      style={{ top: spot.top, left: spot.left, width: spot.size, y: reduce ? 0 : y }}
    >
      <motion.div
        style={{ rotate: spot.rotate }}
        animate={reduce ? {} : { y: [0, -10, 0], rotate: [spot.rotate, spot.rotate + 4, spot.rotate] }}
        transition={{ duration: 7 + index * 1.3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon />
      </motion.div>
    </motion.div>
  );
}

/** Scattered line-art icons with gentle float + scroll parallax. */
export function Doodles({ layout }: { layout: keyof typeof LAYOUTS }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden text-ink opacity-[0.06]">
      {(LAYOUTS[layout] ?? []).map((spot, i) => (
        <Doodle key={i} spot={spot} index={i} progress={scrollYProgress} />
      ))}
    </div>
  );
}

/** Rolling hills along the bottom edge; the front hill matches the next section's background. */
export function Hills({ front, className }: { front: "canvas" | "surface"; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-14 w-full md:h-24", className)}
    >
      <path className="fill-forest/60" d="M0 64C160 30 300 26 470 52s330 40 520 6 330-34 450-12V120H0z" />
      <path className="fill-grass/30" d="M0 86c140-28 300-36 470-14s300 26 470 0 340-36 500-8V120H0z" />
      <path
        className={front === "canvas" ? "fill-canvas" : "fill-surface"}
        d="M0 100c180-18 360-22 560-6s380 16 560 0 260-12 320-6V120H0z"
      />
    </svg>
  );
}

/** A translucent tennis ball bouncing slowly behind the hero card. */
export function BouncingBall({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute size-28 opacity-60 md:size-32", className)}
      animate={reduce ? {} : { y: [0, -56, 0], rotate: [0, 90, 180] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: ["easeOut", "easeIn"], times: [0, 0.5, 1] }}
    >
      <svg viewBox="0 0 100 100" className="size-full">
        <circle cx="50" cy="50" r="46" className="fill-tennis" />
        <path
          d="M14 22c22 12 22 44 0 56M86 22c-22 12-22 44 0 56"
          className="stroke-on-dark/80"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

/** Large, heavily faded park photo behind a section. `tone` is the section background it fades into. */
export function FadedPhoto({ src, tone, children }: { src: string; tone: "canvas" | "bark"; children?: ReactNode }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <img src={src} alt="" loading="lazy" className="photo-grade size-full object-cover opacity-10" />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b via-transparent",
          tone === "canvas" ? "from-canvas to-canvas" : "from-bark to-bark",
        )}
      />
      {children}
    </div>
  );
}
