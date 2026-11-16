import { Preloader } from "@/components/Preloader";
import { IslandHeader } from "@/components/IslandHeader";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Menu } from "@/components/Menu";
import { AddOns } from "@/components/AddOns";
import { Delivery } from "@/components/Delivery";
import { Footer } from "@/components/Footer";
import { OrderBar, CartSheet } from "@/components/OrderUI";

export default function Home() {
  return (
    <>
      <a
        href="#menu"
        className="fixed left-3 top-3 z-[120] -translate-y-24 bg-accent px-4 py-3 font-semibold text-accent-ink focus:translate-y-0"
      >
        Skip to the menu
      </a>
      <Preloader />
      <IslandHeader />
      <main>
        <Hero />
        <Ticker />
        <Menu />
        <AddOns />
        <Delivery />
      </main>
      <Footer />
      <OrderBar />
      <CartSheet />
    </>
  );
}
