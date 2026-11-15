import { PawMark } from "./bits";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="container-page flex flex-col gap-4 py-10 text-body text-muted-ink md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-2 font-semibold text-ink">
          <PawMark className="size-5 text-forest" /> Bonafide
        </p>
        <p className="max-w-[34rem]">Decision support, not a diagnosis. Staff and a vet make the final call.</p>
        <p>Built at sunhacks 2026</p>
      </div>
    </footer>
  );
}
