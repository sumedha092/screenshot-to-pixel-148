import { Button } from "@/components/ui/button";
import { Accent, GlowBlobs } from "./bits";
import { FadedPhoto, Hills } from "./decor";
import { APP_URL, IMAGES } from "./images";
import { Reveal, RevealItem } from "./motion";

export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="section-dark section-pad relative isolate overflow-hidden">
      <FadedPhoto src={IMAGES.parkPack} tone="bark" />
      <GlowBlobs />
      <Hills front="surface" />
      <Reveal className="container-page relative text-center">
        <RevealItem>
          <h2 id="cta-title" className="mx-auto max-w-[48rem] text-display text-on-dark">
            Every dog deserves to be seen <Accent tone="tennis">for who they are.</Accent>
          </h2>
        </RevealItem>
        <RevealItem className="mt-10">
          <Button asChild variant="brand" size="pill">
            <a href={APP_URL}>Open the app</a>
          </Button>
        </RevealItem>
      </Reveal>
    </section>
  );
}
