export const WHATSAPP_NUMBER = "2347045247904"; // 0704 524 7904
export const PHONE_DISPLAY = "0704 524 7904";
export const PHONE_TEL = "+2347045247904";

export type Item = { id: string; name: string; note?: string; full: string; price: number };

export const naira = (n: number) => "₦" + n.toLocaleString("en-NG");

export const ITEMS: Record<string, Item> = {
  cs: { id: "cs", name: "Chicken Shawarma", full: "Chicken Shawarma", price: 4500 },
  bs: { id: "bs", name: "Beef Shawarma", full: "Beef Shawarma", price: 4000 },
  wc: { id: "wc", name: "Waffle Corndogs", full: "Waffle Corndogs", price: 2500 },
  cc: { id: "cc", name: "Chicken and Chips", full: "Chicken and Chips", price: 6000 },
  sn: {
    id: "sn",
    name: "Special Noodles",
    note: "1 chicken, hotdog, vegetables",
    full: "Special Noodles (1 chicken, hotdog, vegetables)",
    price: 2500,
  },
  sp1: { id: "sp1", name: "With chicken", full: "Stir Fried Spaghetti (with chicken)", price: 3500 },
  sp2: { id: "sp2", name: "With turkey", full: "Stir Fried Spaghetti (with turkey)", price: 5000 },
  nh: { id: "nh", name: "Noodles", note: "Hungryman", full: "Noodles (Hungryman)", price: 1200 },
  ns: { id: "ns", name: "Noodles", note: "Super Pack", full: "Noodles (Super Pack)", price: 900 },
  eg: { id: "eg", name: "Egg", full: "Egg (add-on)", price: 300 },
  hd: { id: "hd", name: "Hotdog", full: "Hotdog (add-on)", price: 300 },
  ef: { id: "ef", name: "Extra Fries", full: "Extra Fries (add-on)", price: 1500 },
  ch: { id: "ch", name: "Chicken", full: "Chicken (add-on)", price: 1500 },
  tk: { id: "tk", name: "Turkey", full: "Turkey (add-on)", price: 3000 },
};

export const ALL_IDS = Object.keys(ITEMS);

export function buildWhatsAppLink(
  lines: { full: string; qty: number; price: number }[],
  total: number,
  who: { name: string; address: string; note: string },
) {
  let msg = "Hello WaffyBite Express, I'd like to order:\n";
  msg += lines.map((l) => `- ${l.qty} x ${l.full} (${naira(l.price * l.qty)})`).join("\n");
  msg += `\nTotal: ${naira(total)}`;
  if (who.name.trim()) msg += `\nName: ${who.name.trim()}`;
  if (who.address.trim()) msg += `\nDelivery address: ${who.address.trim()}`;
  if (who.note.trim()) msg += `\nNote: ${who.note.trim()}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export const WA_HELLO = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello WaffyBite Express, I'd like to place an order.",
)}`;
