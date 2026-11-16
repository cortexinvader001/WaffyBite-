"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCart } from "./CartProvider";
import { buildWhatsAppLink, naira } from "@/lib/menu";

const EASE = [0.16, 1, 0.3, 1] as const;

export function OrderBar() {
  const { count, total, openCart, cartOpen } = useCart();
  if (count === 0 || cartOpen) return null;
  return (
    <div className="on-accent fixed inset-x-0 bottom-0 z-40 bg-accent px-[var(--gut)] pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 text-accent-ink">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <span className="num font-semibold">
          {count} {count === 1 ? "item" : "items"} · {naira(total)}
        </span>
        <button type="button" onClick={openCart} className="inline-flex min-h-11 items-center bg-accent-ink px-5 font-semibold text-ink">
          Review order
        </button>
      </div>
    </div>
  );
}

export function CartSheet() {
  const { cartOpen, closeCart, lines, total, change, clear } = useCart();
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const panelRef = useRef<HTMLElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!cartOpen) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("button, a, input")?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>("button, a[href], input");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lastFocus.current?.focus?.();
    };
  }, [cartOpen, closeCart]);

  const link = buildWhatsAppLink(lines, total, { name, address, note });

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <motion.button
            type="button"
            aria-label="Close your order"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="absolute inset-0 h-full w-full cursor-pointer bg-black/75"
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={reduce ? false : { x: 48, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { x: 48, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
            className="relative flex h-full w-[min(30rem,100%)] flex-col gap-6 overflow-y-auto border-l border-line bg-bg2 p-6 pt-[max(1.5rem,env(safe-area-inset-top))]"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 id="cart-title" className="disp text-3xl">
                Your order
              </h2>
              <button type="button" onClick={closeCart} className="btn-line min-h-11 px-4">
                Close
              </button>
            </div>

            {lines.length === 0 ? (
              <div>
                <p className="text-ink2">Nothing here yet. Add dishes from the menu.</p>
                <button type="button" onClick={closeCart} className="btn-fill mt-4">
                  Back to menu
                </button>
              </div>
            ) : (
              <>
                <ul>
                  {lines.map((l) => (
                    <li key={l.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line py-4">
                      <span className="min-w-0 flex-[1_1_10rem] font-medium">{l.full}</span>
                      <span className="num font-semibold">{naira(l.price * l.qty)}</span>
                      <div className="stepper">
                        <button type="button" onClick={() => change(l.id, -1)} aria-label={`Remove one ${l.full}`}>
                          −
                        </button>
                        <span className="num">{l.qty}</span>
                        <button type="button" onClick={() => change(l.id, 1)} aria-label={`Add one ${l.full}`}>
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {[
                  { id: "cust-name", label: "Your name", v: name, set: setName, ac: "name" },
                  { id: "cust-address", label: "Delivery address", v: address, set: setAddress, ac: "street-address" },
                  { id: "cust-note", label: "Note for the kitchen (optional)", v: note, set: setNote, ac: "off" },
                ].map((f) => (
                  <div key={f.id} className="flex flex-col gap-1.5">
                    <label htmlFor={f.id} className="eyebrow">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type="text"
                      value={f.v}
                      autoComplete={f.ac}
                      onChange={(e) => f.set(e.target.value)}
                      className="h-12 border border-line bg-surface px-3.5 text-ink"
                    />
                  </div>
                ))}

                <div className="flex items-baseline justify-between text-2xl font-semibold">
                  <span>Total</span>
                  <span className="num">{naira(total)}</span>
                </div>
                <p className="-mt-3 text-sm text-ink2">The total is for the food only. Delivery is confirmed on WhatsApp.</p>

                <a href={link} target="_blank" rel="noopener" className="btn-fill min-h-14">
                  Send order on WhatsApp
                </a>
                <button type="button" onClick={clear} className="min-h-11 self-start text-ink2 underline underline-offset-4 hover:text-ink">
                  Clear order
                </button>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
