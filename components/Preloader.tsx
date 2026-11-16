"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";

const TIMEOUT_MS = 3500;
const HERO_SRC = "/images/hero-shawarma-spit.webp";

/**
 * Branded loader. The counter follows real readiness (fonts + hero photo), with a timeout fallback.
 * Skippable after 800ms, skipped on repeat visits in the same session, and a short fade under reduced motion.
 */
export function Preloader() {
  const { setReady } = useCart();
  const [phase, setPhase] = useState<"loading" | "leaving" | "gone">("loading");
  const [shown, setShown] = useState(0);
  const target = useRef(0);
  const skippable = useRef(false);
  const finished = useRef(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("wb-seen") === "1";
    } catch {
      /* storage unavailable: show the loader */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      target.current = 100;
      setShown(100);
      try {
        sessionStorage.setItem("wb-seen", "1");
      } catch {
        /* ignore */
      }
      setReady(true); // hero entrance starts as the overlay leaves
      setPhase("leaving");
      window.setTimeout(() => setPhase("gone"), reduce ? 320 : 800);
    };

    if (seen) {
      finished.current = true;
      setReady(true);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- session flag is only readable after mount
      setPhase("gone");
      return;
    }

    let fontsDone = false;
    let heroDone = false;
    const update = () => {
      target.current = (fontsDone ? 40 : 0) + (heroDone ? 60 : 0);
      if (fontsDone && heroDone) finish();
    };

    const fontsReady: Promise<unknown> = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.allSettled([fontsReady]).then(() => {
      fontsDone = true;
      update();
    });

    const img = new Image();
    img.src = HERO_SRC;
    const heroSettled = () => {
      heroDone = true;
      update();
    };
    (img.decode ? img.decode() : Promise.resolve()).then(heroSettled, heroSettled);

    const timer = window.setTimeout(finish, TIMEOUT_MS);
    const skipTimer = window.setTimeout(() => {
      skippable.current = true;
    }, 800);

    let raf = 0;
    const tick = () => {
      setShown((s) => (s < target.current ? Math.min(target.current, s + Math.max(1, (target.current - s) * 0.12)) : s));
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) raf = requestAnimationFrame(tick);

    const skip = () => {
      if (skippable.current) finish();
    };
    window.addEventListener("keydown", skip);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.clearTimeout(skipTimer);
      window.removeEventListener("keydown", skip);
    };
  }, [setReady]);

  if (phase === "gone") return null;

  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={() => {
        if (skippable.current && !finished.current) {
          finished.current = true;
          setReady(true);
          setPhase("leaving");
          window.setTimeout(() => setPhase("gone"), 800);
        }
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black px-[var(--gut)] py-8"
      style={{
        transition: reduceMotion ? "opacity .3s ease" : "transform .8s cubic-bezier(.76,0,.24,1)",
        transform: !reduceMotion && phase === "leaving" ? "translateY(-100%)" : "none",
        opacity: reduceMotion && phase === "leaving" ? 0 : 1,
        pointerEvents: phase === "leaving" ? "none" : "auto",
      }}
    >
      <span className="eyebrow">Loading</span>
      <div>
        <p className="disp text-[clamp(2.5rem,10vw,8rem)] uppercase leading-[0.9]">
          Waffy<span className="text-accent">Bite</span>
          <br />
          Express
        </p>
        <div className="mt-8 h-px w-full bg-line" aria-hidden="true">
          <div className="h-px bg-accent" style={{ width: `${Math.round(shown)}%`, transition: "width .15s linear" }} />
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-ink2">
        <span className="num">{Math.round(shown)}%</span>
        <span>Click or press any key to skip</span>
      </div>
    </div>
  );
}
