import { cn } from "@/lib/utils";

/** An inquisitive dog peeking through a lens, with its paw gripping the handle. */
export function SearchDogLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={cn("size-9", className)}>
      <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 48V29C6 23 7 12 12 7L20 14C26 12 31 16 33 21L36 24L29 29L24 28V35" />
        <path d="M12 8L14 22L20 15" />
        <circle cx="39" cy="27" r="15" />
        <path d="M49 39L58 51" />
        <path d="M24 36L29 46L44 43C48 41 51 44 49 47L45 50L26 53L17 44" />
      </g>
      <circle cx="28" cy="22" r="1.8" fill="currentColor" />
      <path d="M34 26C30 22 28 27 31 29C28 32 32 35 35 31L43 28C47 32 50 27 47 25C50 22 46 19 43 23Z" fill="currentColor" />
    </svg>
  );
}