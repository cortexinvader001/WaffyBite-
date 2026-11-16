# WaffyBite Express

Next.js (App Router) + Tailwind + React Bits. Orders go to WhatsApp (0704 524 7904).

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run build   # writes the static site to ./out

## Deploy
Render Static Site (below), or Vercel / Netlify. No environment variables are needed.

## Where things are
- `lib/menu.ts`: every dish, price and the WhatsApp number. Change prices here.
- `components/IslandHeader.tsx`: dynamic island header and the drop-down drawer.
- `components/Hero.tsx`, `Menu.tsx`, `AddOns.tsx`, `Delivery.tsx`, `Footer.tsx`: page sections.
- `components/OrderUI.tsx` and `CartProvider.tsx`: the order bar, cart panel and WhatsApp message.
- `public/images/`: the photos (WebP).
- `components/reactbits/`: React Bits SplitText, ScrollVelocity and AnimatedContent.

## React Bits licence
React Bits is MIT + Commons Clause (see `components/reactbits/LICENSE.md`). Using it on this website is fine.
Do not resell this project, or the React Bits components inside it, as a template or kit.

## Deploy on Render (Static Site)
The project exports to plain HTML, CSS and JS in `out/`, so it runs as a free Static Site that never sleeps.
1. New > Static Site, connect this GitHub repo (or New > Blueprint to use `render.yaml`).
2. Build command: `npm ci && npm run build`. Publish directory: `out`.
3. Environment variable: `NODE_VERSION` = `22`. Nothing else is needed.
To preview the built site locally: `npm run build && npx serve out`.
