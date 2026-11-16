"use client";

import AnimatedContent from "./reactbits/AnimatedContent";
import { Photo } from "./Photo";
import { Qty } from "./Qty";
import { ITEMS, naira } from "@/lib/menu";

type Row = { id: string; label?: string };

type Dish = {
  title: string;
  src: string;
  alt: string;
  position: string;
  rows: Row[];
  flip?: boolean;
};

const DISHES: Dish[] = [
  {
    title: "Shawarma",
    src: "/images/shawarma-wrap.webp",
    alt: "Two halves of a foil-wrapped chicken shawarma on a wooden counter, steaming, with a busy street blurred behind.",
    position: "42% 60%",
    rows: [
      { id: "cs", label: "Chicken Shawarma" },
      { id: "bs", label: "Beef Shawarma" },
    ],
  },
  {
    title: "Waffle Corndogs",
    src: "/images/waffle-corndogs.webp",
    alt: "Three waffle corndogs on sticks, laid on a wooden tray and drizzled with mustard.",
    position: "50% 55%",
    rows: [{ id: "wc" }],
    flip: true,
  },
  {
    title: "Special Noodles",
    src: "/images/special-noodles.webp",
    alt: "A bowl of noodles seen from above with grilled chicken, sliced hotdog, broccoli, peppers and sesame seeds, with chopsticks resting on the rim.",
    position: "50% 50%",
    rows: [{ id: "sn" }],
  },
  {
    title: "Stir Fried Spaghetti",
    src: "/images/stir-fry-skillet.webp",
    alt: "A cast iron skillet of stir fried spaghetti with seared chicken, peppers and herbs, steam rising.",
    position: "50% 55%",
    rows: [
      { id: "sp1", label: "With chicken" },
      { id: "sp2", label: "With turkey" },
    ],
    flip: true,
  },
  {
    title: "Chicken and Chips",
    src: "/images/chicken-and-chips.webp",
    alt: "Crispy fried chicken pieces on a pile of chips in an open brown takeaway box, steam rising, with coarse salt scattered on a dark wooden counter.",
    position: "42% 55%",
    rows: [{ id: "cc" }],
  },
];

function DishRow({ id, label, title }: Row & { title: string }) {
  const it = ITEMS[id];
  const name = label ?? it.name;
  const same = name === title; // the heading already says it, so keep the name for screen readers only
  return (
    <li className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line py-5 first:border-t">
      <div className="min-w-0 flex-[1_1_12rem]">
        <p className={same ? "sr-only" : "disp text-[clamp(1.25rem,1.2vw+0.9rem,1.75rem)] leading-tight"}>{name}</p>
        {it.note && <p className={same ? "text-ink2" : "mt-1 text-[0.9375rem] text-ink2"}>{it.note}</p>}
        {same && !it.note && <p className="text-ink2">Per order</p>}
      </div>
      <span className="num text-[clamp(1.375rem,1.4vw+1rem,2rem)] font-semibold">{naira(it.price)}</span>
      <Qty id={id} />
    </li>
  );
}

function DishBlock({ d }: { d: Dish }) {
  return (
    <AnimatedContent distance={70} duration={0.9} threshold={0.12}>
      <article
        className={`grid items-stretch ${
          d.flip ? "lg:grid-cols-[1fr_1.25fr]" : "lg:grid-cols-[1.25fr_1fr]"
        }`}
      >
        <Photo
          src={d.src}
          alt={d.alt}
          position={d.position}
          className={`aspect-[1408/768] w-full lg:aspect-auto lg:h-full lg:min-h-[26rem] ${d.flip ? "lg:order-2" : ""}`}
        />
        <div
          className={`flex flex-col justify-center gap-8 px-[var(--gut)] py-10 lg:py-14 ${
            d.flip ? "lg:order-1 lg:pr-[clamp(2rem,4vw,5rem)]" : "lg:pl-[clamp(2rem,4vw,5rem)]"
          }`}
        >
          <div>
            <p className="eyebrow">Main dish</p>
            <h3 className="h2 mt-3 !text-[clamp(2.25rem,3.6vw+0.5rem,4.5rem)]">{d.title}</h3>
          </div>
          <ul>
            {d.rows.map((r) => (
              <DishRow key={r.id} {...r} title={d.title} />
            ))}
          </ul>
        </div>
      </article>
    </AnimatedContent>
  );
}

export function Menu() {
  return (
    <section id="menu" className="bg-bg2 py-[clamp(4rem,9vw,8rem)]">
      <div className="wrap">
        <p className="eyebrow">What we make</p>
        <h2 className="h2 mt-4">The menu</h2>
        <p className="mt-5 max-w-[34ch] text-ink2">Tap Add on what you want. Your order opens in WhatsApp, ready to send.</p>
      </div>

      <div className="mt-[clamp(2.5rem,6vw,5rem)] flex flex-col gap-[clamp(2.5rem,5vw,4.5rem)]">
        {DISHES.map((d) => (
          <DishBlock key={d.title} d={d} />
        ))}
      </div>

      <div className="wrap mt-[clamp(3rem,7vw,6rem)]">
        <AnimatedContent distance={50} duration={0.8} threshold={0.15}>
          <p className="eyebrow">More plates</p>
          <ul className="mt-4 grid border-t border-line md:grid-cols-2">
            {["nh", "ns"].map((id) => {
              const it = ITEMS[id];
              return (
                <li key={id} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line py-6 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                  <div className="min-w-0 flex-[1_1_9rem]">
                    <p className="disp text-[clamp(1.375rem,1.4vw+1rem,2rem)] leading-tight">{it.name}</p>
                    {it.note && <p className="mt-1 text-[0.9375rem] text-ink2">{it.note}</p>}
                    <p className="num mt-2 text-xl font-semibold">{naira(it.price)}</p>
                  </div>
                  <Qty id={id} />
                </li>
              );
            })}
          </ul>
        </AnimatedContent>
      </div>
    </section>
  );
}
