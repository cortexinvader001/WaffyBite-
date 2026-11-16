import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "WaffyBite Express | Boundary Road, Ekosodin",
  description:
    "Shawarma, waffle corndogs, noodles and stir fried spaghetti on Boundary Road, Ekosodin. Fast delivery. Order on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#070504",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
