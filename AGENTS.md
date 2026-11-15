<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

<!-- AGENT-MEMORY:BEGIN -->
- Landing page sections live in `src/components/landing/` and are composed in `src/routes/index.tsx` — keeps the single scroll page modular.
- Animations use framer-motion inside `<MotionConfig reducedMotion="user">`; infinite/decorative loops also check `useReducedMotion` — reduced-motion users must get a static page.
- All colors/sizes come from tokens and `@utility` classes in `src/styles.css` (chip, card-surface, lift, section-dark, eyebrow) — no ad-hoc colors in components.
- Photo URLs and the "Open the app" target are centralized in `src/components/landing/images.ts`; the app URL comes from `VITE_APP_URL` with a localhost fallback — one place to swap them.
- Decorative background art (doodles, hills, bouncing ball, faded photos) lives in `src/components/landing/decor.tsx`, rendered aria-hidden at `-z-10` inside `isolate` sections — keeps art behind content and out of screen readers.
- `cn()` in `src/lib/utils.ts` registers the custom type scale (display/h2/h3/lead/body) with tailwind-merge — otherwise `text-body` silently strips text colors.
<!-- AGENT-MEMORY:END -->
