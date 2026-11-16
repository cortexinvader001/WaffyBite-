"use client";

import SplitText from "./reactbits/SplitText";
import { Photo } from "./Photo";
import { useCart } from "./CartProvider";
import { PHONE_DISPLAY, WA_HELLO } from "@/lib/menu";

const LINES: { text: string; color?: string }[] = [
  { text: "Fast." },
  { text: "Fresh.", color: "var(--accent)" },
  { text: "Satisfying." },
];

export function Hero() {
  const { ready } = useCart();

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-black lg:justify-center">
      <Photo
        src="/images/hero-shawarma-spit.webp"
        srcMobile="/images/hero-shawarma-spit-mobile.webp"
        w={1376}
        h={768}
        priority
        position="88% 50%"
        alt="A tall stack of seasoned shawarma meat turning on a spit, with a few slices curling away and juices dripping from the base."
        className="!absolute inset-0 -z-10 h-full w-full !bg-black max-[700px]:[&_img]:!object-[84%_50%]"
      />
      {/* keep the type readable and blend the photo into the page */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 via-45% to-transparent lg:bg-gradient-to-r lg:from-black/70 lg:via-transparent lg:to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-bg to-transparent" />

      <div className="wrap relative w-full pb-14 pt-32 lg:pb-24 lg:pt-36">
        <p className="eyebrow">Boundary Road, Ekosodin</p>

        <h1 className="disp mt-5 uppercase leading-[0.88] tracking-[-0.04em]" aria-label="Fast. Fresh. Satisfying.">
          {LINES.map((l) => (
            <span key={l.text} className="block text-[clamp(3rem,13.5vw,6.5rem)] lg:text-[clamp(4rem,8.2vw,9.5rem)]" aria-hidden="true">
              {ready ? (
                <SplitText
                  tag="span"
                  text={l.text}
                  trigger="load"
                  effect="rise"
                  mask
                  delay={28}
                  duration={1}
                  textAlign="left"
                  color={l.color}
                  className="!block"
                />
              ) : (
                <span className="invisible">{l.text}</span>
              )}
            </span>
          ))}
        </h1>

        <p className="disp mt-6 max-w-[22ch] text-[clamp(1.25rem,1.6vw+0.8rem,2rem)] leading-tight">Bold Flavors. Nigerian Soul.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#menu" className="btn-fill">
            Start your order
          </a>
          <a href={WA_HELLO} target="_blank" rel="noopener" className="btn-line">
            Chat on WhatsApp
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-2 border-t border-line pt-5 text-[0.9375rem] text-ink2">
          <li>
            <b className="font-medium text-ink">Fast delivery</b> available
          </li>
          <li>Order on the web or by DM</li>
          <li className="num">
            <b className="font-medium text-ink">{PHONE_DISPLAY}</b>
          </li>
        </ul>
      </div>
    </section>
  );
}
