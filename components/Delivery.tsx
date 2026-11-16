"use client";

import AnimatedContent from "./reactbits/AnimatedContent";
import { Photo } from "./Photo";
import { PHONE_DISPLAY } from "@/lib/menu";

const STEPS = [
  { t: "Pick your food", p: "Add dishes and add-ons from the menu." },
  { t: "Send it on WhatsApp", p: `Your order opens in WhatsApp with the list and total, ready to send to ${PHONE_DISPLAY}.` },
  { t: "We deliver", p: "Fast delivery is available from Boundary Road, Ekosodin." },
];

export function Delivery() {
  return (
    <section id="delivery" className="py-[clamp(4rem,9vw,8rem)]">
      <div className="wrap">
        <p className="eyebrow">Delivery and ordering</p>
        <h2 className="h2 mt-4 max-w-[16ch]">Fast delivery from Boundary Road</h2>
      </div>

      <AnimatedContent distance={60} duration={0.9} className="mt-[clamp(2rem,5vw,4rem)]">
        <Photo
          src="/images/delivery-handoff.webp"
          alt="Two hands passing a brown paper food bag to each other against a soft orange and pink background."
          position="50% 55%"
          className="aspect-[1408/768] max-h-[78svh] w-full"
        />
      </AnimatedContent>

      <div className="wrap">
        <ol className="mt-[clamp(2.5rem,6vw,5rem)] flex flex-wrap gap-x-8 gap-y-10">
          {STEPS.map((s, i) => (
            <li key={s.t} className="min-w-0 flex-[1_1_16rem] border-t border-line pt-5">
              <p className="num font-display text-[clamp(3.5rem,7vw,6rem)] font-bold leading-[0.9] text-[#4A382A]" aria-hidden="true">
                {i + 1}
              </p>
              <h3 className="disp mt-4 text-[1.625rem] leading-tight">{s.t}</h3>
              <p className="mt-2 max-w-[32ch] text-ink2">{s.p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
