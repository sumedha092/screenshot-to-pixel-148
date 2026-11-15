import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PawMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-6", className)} fill="currentColor">
      <ellipse cx="16" cy="21" rx="7" ry="6" />
      <ellipse cx="7.5" cy="13" rx="3" ry="3.8" />
      <ellipse cx="13" cy="7.5" rx="3" ry="3.8" />
      <ellipse cx="19" cy="7.5" rx="3" ry="3.8" />
      <ellipse cx="24.5" cy="13" rx="3" ry="3.8" />
    </svg>
  );
}

/** The single italic accent phrase inside a heading. */
const accentClass = { forest: "text-forest", tennis: "text-tennis" } as const;

export function Accent({ children, tone = "forest" }: { children: ReactNode; tone?: keyof typeof accentClass }) {
  return <em className={cn("italic", accentClass[tone])}>{children}</em>;
}

export type Level = "green" | "yellow" | "orange" | "red";

const levelClass: Record<Level, string> = {
  green: "chip-green",
  yellow: "chip-yellow",
  orange: "chip-orange",
  red: "chip-red",
};
const dotClass: Record<Level, string> = {
  green: "bg-level-green",
  yellow: "bg-level-yellow",
  orange: "bg-level-orange",
  red: "bg-level-red",
};

export function LevelChip({ level, children }: { level: Level; children: ReactNode }) {
  return (
    <span className={cn("chip", levelClass[level])}>
      <span aria-hidden="true" className={cn("size-2 rounded-full", dotClass[level])} />
      {children}
    </span>
  );
}

export function Eyebrow({ children, tone = "forest" }: { children: ReactNode; tone?: "forest" | "tennis" }) {
  return <p className={cn("eyebrow", tone === "forest" ? "text-forest" : "text-tennis")}>{children}</p>;
}

export function GlowBlobs({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="glow-forest absolute -left-32 -top-24 size-[520px] opacity-45" />
      <div className="glow-grass absolute -bottom-40 right-[-120px] size-[560px] opacity-35" />
      <div className="glow-tennis absolute bottom-[-30%] left-[35%] size-[420px] opacity-20" />
    </div>
  );
}
