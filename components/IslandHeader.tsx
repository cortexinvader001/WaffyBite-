"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { PHONE_DISPLAY, WA_HELLO } from "@/lib/menu";

const LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#addons", label: "Add-ons" },
  { href: "#delivery", label: "Delivery" },
  { href: "#contact", label: "Contact" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function IslandHeader() {
  const { count, openCart, ready } = useCart();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const close = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) burgerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const dur = reduce ? 0 : 0.55;

  /** Close the drawer, then scroll to the section ourselves so the closing animation cannot cancel the jump. */
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href);
    if (!target) {
      setOpen(false);
      return;
    }
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      try {
        history.pushState(null, "", href);
      } catch {
        /* ignore */
      }
    }, 60);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <motion.div
        ref={rootRef}
        initial={reduce ? false : { y: -90, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : reduce ? { opacity: 1 } : { y: -90, opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: ready ? 0.15 : 0 }}
        className="pointer-events-auto overflow-hidden rounded-[30px] border border-line bg-[#0c0806]/90 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md"
        style={{ willChange: "transform" }}
      >
        <motion.div
          animate={{ width: open ? "min(calc(100vw - 1.5rem), 30rem)" : "min(calc(100vw - 1.5rem), 22rem)" }}
          transition={{ duration: dur, ease: EASE }}
          className="flex flex-col"
        >
          {/* island bar */}
          <div className="flex h-14 items-center justify-between gap-2 px-2">
            <button
              ref={burgerRef}
              type="button"
              aria-expanded={open}
              aria-controls="island-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-11 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/10"
            >
              <span className="relative block h-3.5 w-5" aria-hidden="true">
                <motion.span
                  className="absolute left-0 block h-0.5 w-5 rounded bg-ink"
                  animate={{ top: open ? 6 : 0, rotate: open ? 45 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-ink"
                  animate={{ opacity: open ? 0 : 1 }}
                  transition={{ duration: reduce ? 0 : 0.2 }}
                />
                <motion.span
                  className="absolute left-0 block h-0.5 w-5 rounded bg-ink"
                  animate={{ top: open ? 6 : 12, rotate: open ? -45 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                />
              </span>
            </button>

            <a href="#top" aria-label="WaffyBite Express, back to top" className="disp min-w-0 truncate text-[0.95rem] uppercase leading-none">
              Waffy<span className="text-accent">Bite</span>
              <span className="hidden min-[360px]:inline"> Express</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openCart();
              }}
              aria-label={`Your order, ${count} ${count === 1 ? "item" : "items"}`}
              className="relative flex h-11 shrink-0 items-center gap-2 rounded-full bg-accent px-4 text-accent-ink transition-colors hover:bg-gold"
            >
              <ShoppingBag size={18} strokeWidth={2.25} aria-hidden="true" />
              <span className="num min-w-[1ch] text-sm font-bold" aria-hidden="true">
                {count}
              </span>
            </button>
          </div>

          {/* drop-down drawer */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.nav
                id="island-menu"
                aria-label="Main"
                key="drawer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: dur, ease: EASE }}
                className="overflow-hidden"
              >
                <ul className="flex flex-col px-5 pb-2 pt-2">
                  {LINKS.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={reduce ? false : { opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduce ? 0 : 0.45, ease: EASE, delay: reduce ? 0 : 0.08 + i * 0.05 }}
                      className="border-t border-line first:border-t-0"
                    >
                      <a
                        ref={i === 0 ? firstLink : undefined}
                        href={l.href}
                        onClick={(e) => go(e, l.href)}
                        className="disp flex min-h-14 items-center justify-between text-[clamp(1.75rem,6vw,2.5rem)] leading-none transition-colors hover:text-accent"
                      >
                        {l.label}
                        <span aria-hidden="true" className="text-base text-ink2">
                          ↘
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
                  <span className="num text-sm text-ink2">{PHONE_DISPLAY}</span>
                  <a href={WA_HELLO} target="_blank" rel="noopener" className="btn-fill min-h-11 rounded-full px-5">
                    Chat on WhatsApp
                  </a>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </header>
  );
}
