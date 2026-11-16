import { PHONE_DISPLAY, PHONE_TEL, WA_HELLO } from "@/lib/menu";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-bg2 pb-28 pt-[clamp(4rem,9vw,8rem)]">
      <div className="wrap">
        <p className="eyebrow">Order directly</p>
        <a href={`tel:${PHONE_TEL}`} className="disp num mt-5 block text-[clamp(2.25rem,9vw,8rem)] leading-[0.95] tracking-[-0.04em] transition-colors hover:text-accent">
          {PHONE_DISPLAY}
        </a>

        <div className="mt-12 flex flex-wrap items-start justify-between gap-x-16 gap-y-8">
          <div>
            <p className="font-medium">Find us</p>
            <p className="text-ink2">Boundary Road, Ekosodin</p>
          </div>
          <div>
            <p className="font-medium">Fast. Fresh. Satisfying.</p>
            <p className="text-ink2">Bold Flavors. Nigerian Soul.</p>
          </div>
          <a href={WA_HELLO} target="_blank" rel="noopener" className="btn-fill">
            Order on WhatsApp
          </a>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-line pt-5 text-sm text-ink2">
          <span>© WaffyBite Express</span>
          <span>Direct ordering via DM or web. Animated components from React Bits.</span>
        </div>
      </div>
    </footer>
  );
}
