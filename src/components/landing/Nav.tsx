import { Button } from "@/components/ui/button";
import { APP_URL } from "./images";
import { PawMark } from "./bits";

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#proof", label: "Proof" },
  { href: "#passport", label: "Passport" },
];

export function Nav() {
  return (
    <header className="glass-nav sticky top-0 z-50">
      <nav aria-label="Main" className="container-page flex h-[72px] items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2 rounded-full text-ink">
          <span className="grid size-9 place-items-center rounded-full bg-clay text-ink">
            <PawMark className="size-5" />
          </span>
          <span className="font-display text-h3 font-semibold tracking-tight">Bonafide</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md text-body font-semibold text-muted-ink transition-colors duration-200 ease-ui hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Button asChild variant="clay" size="pillSm">
          <a href={APP_URL}>Open the app</a>
        </Button>
      </nav>
    </header>
  );
}
