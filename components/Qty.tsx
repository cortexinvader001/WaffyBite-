"use client";

import { useCart } from "./CartProvider";
import { ITEMS } from "@/lib/menu";

/** Add button that turns into a stepper once the item is in the order. */
export function Qty({ id, variant = "default" }: { id: string; variant?: "default" | "board" }) {
  const { qty, change } = useCart();
  const q = qty[id] ?? 0;
  const name = ITEMS[id].full;

  if (variant === "board") {
    return q === 0 ? (
      <button type="button" className="board-btn" onClick={() => change(id, 1)} aria-label={`Add ${name} to order`}>
        Add
      </button>
    ) : (
      <div className="board-step">
        <button type="button" onClick={() => change(id, -1)} aria-label={`Remove one ${name}`}>
          −
        </button>
        <span className="num" aria-live="polite">
          {q}
        </span>
        <button type="button" onClick={() => change(id, 1)} aria-label={`Add one ${name}`}>
          +
        </button>
      </div>
    );
  }

  return q === 0 ? (
    <button type="button" className="btn-line min-h-11" onClick={() => change(id, 1)} aria-label={`Add ${name} to order`}>
      Add
    </button>
  ) : (
    <div className="stepper">
      <button type="button" onClick={() => change(id, -1)} aria-label={`Remove one ${name}`}>
        −
      </button>
      <span className="num" aria-live="polite">
        {q}
      </span>
      <button type="button" onClick={() => change(id, 1)} aria-label={`Add one ${name}`}>
        +
      </button>
    </div>
  );
}
