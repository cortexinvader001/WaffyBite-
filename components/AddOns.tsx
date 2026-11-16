"use client";

import AnimatedContent from "./reactbits/AnimatedContent";
import { Qty } from "./Qty";
import { ITEMS, naira } from "@/lib/menu";

/* Rows sit on the photo's own orange panels, lined up with the food they name:
   hotdogs at the top, eggs in the middle, fries at the bottom. */
const LEFT = [
  { id: "hd", top: "14%" },
  { id: "eg", top: "50%" },
  { id: "ef", top: "86%" },
];
const RIGHT = [
  { id: "ch", top: "30%" },
  { id: "tk", top: "70%" },
];

function BoardRow({ id, top }: { id: string; top: string }) {
  const it = ITEMS[id];
  return (
    <div className="board-row" style={{ top }}>
      <h3 className="board-name">{it.name}</h3>
      <div className="board-line">
        <p className="board-price">{naira(it.price)}</p>
        <Qty id={id} variant="board" />
      </div>
    </div>
  );
}

export function AddOns() {
  return (
    <section id="addons" className="on-accent bg-accent text-accent-ink">
      <div className="wrap flex flex-wrap items-end justify-between gap-x-12 gap-y-4 py-[clamp(3rem,7vw,6rem)]">
        <h2 className="h2">Add-ons</h2>
        <p className="max-w-[30ch] font-medium">Stack them onto any dish. Hotdog, egg, fries, chicken or turkey.</p>
      </div>

      <AnimatedContent distance={60} duration={0.9} threshold={0.1}>
        <div className="board">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="board-img"
            src="/images/addons-board.webp"
            width={1408}
            height={768}
            loading="lazy"
            decoding="async"
            alt="A slate board seen from above with a row of grilled hotdogs, four halved boiled eggs and a stack of fries, between two orange cloths."
          />
          <div className="board-panel board-l">
            {LEFT.map((r) => (
              <BoardRow key={r.id} {...r} />
            ))}
          </div>
          <div className="board-panel board-r">
            {RIGHT.map((r) => (
              <BoardRow key={r.id} {...r} />
            ))}
          </div>

          {/* small screens: same items as a list under the photo */}
          <ul className="board-stack wrap py-6">
            {[...LEFT, ...RIGHT].map(({ id }) => {
              const it = ITEMS[id];
              return (
                <li key={id} className="flex items-center justify-between gap-4 border-b border-accent-ink/40 py-4 last:border-b-0">
                  <div>
                    <p className="disp text-2xl leading-none">{it.name}</p>
                    <p className="num mt-1 text-lg font-semibold">{naira(it.price)}</p>
                  </div>
                  <Qty id={id} />
                </li>
              );
            })}
          </ul>
        </div>
      </AnimatedContent>
    </section>
  );
}
