"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ITEMS } from "@/lib/menu";

type Qty = Record<string, number>;

type CartCtx = {
  qty: Qty;
  count: number;
  total: number;
  lines: { id: string; full: string; qty: number; price: number }[];
  change: (id: string, delta: number) => void;
  clear: () => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  ready: boolean;
  setReady: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [qty, setQty] = useState<Qty>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const change = useCallback((id: string, delta: number) => {
    setQty((prev) => {
      const next = (prev[id] ?? 0) + delta;
      const copy = { ...prev };
      if (next <= 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  }, []);

  const value = useMemo<CartCtx>(() => {
    const lines = Object.keys(qty)
      .filter((id) => ITEMS[id])
      .map((id) => ({ id, full: ITEMS[id].full, qty: qty[id], price: ITEMS[id].price }));
    return {
      qty,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.price, 0),
      lines,
      change,
      clear: () => setQty({}),
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      ready,
      setReady,
    };
  }, [qty, change, cartOpen, ready]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside CartProvider");
  return v;
}
