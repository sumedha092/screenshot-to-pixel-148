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
export function Accent({ children, tone = "clay" }: { children: ReactNode; tone?: "clay" | "peach" }) {
  return (
    <em className={cn("italic", tone === "clay" ? "text-clay-dark" : "text-peach")}>{children}</em>
  );
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

export function Eyebrow({ children, tone = "clay" }: { children: ReactNode; tone?: "clay" | "peach" }) {
  return <p className={cn("eyebrow", tone === "clay" ? "text-clay-dark" : "text-peach")}>{children}</p>;
}

export function GlowBlobs({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="glow-clay absolute -left-32 -top-24 size-[520px] opacity-60" />
      <div className="glow-sage absolute -bottom-40 right-[-120px] size-[560px] opacity-50" />
    </div>
  );
}
