"use client";

import ScrollVelocity from "./reactbits/ScrollVelocity";

const DISHES = [
  "Chicken Shawarma",
  "Beef Shawarma",
  "Waffle Corndogs",
  "Chicken and Chips",
  "Special Noodles",
  "Stir Fried Spaghetti",
];

export function Ticker() {
  return (
    <div aria-hidden="true" className="border-y border-line bg-bg py-5">
      <ScrollVelocity
        texts={[DISHES.join("   ■   ") + "   ■   "]}
        velocity={45}
        numCopies={4}
        className="uppercase text-ink2"
        fontSize="clamp(1.25rem, 2.2vw, 2rem)"
        fontWeight={700}
        scrollerClassName="scroller font-display !text-[inherit] !leading-none"
        parallaxClassName="parallax"
      />
    </div>
  );
}
