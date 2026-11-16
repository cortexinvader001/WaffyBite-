# WaffyBite Express

Next.js (App Router) + Tailwind + React Bits. Orders go to WhatsApp (0704 524 7904).

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## Deploy
Push to GitHub and import into Vercel, or run `npx vercel`. No environment variables are needed.

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
