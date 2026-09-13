"use client";

import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import Showreel from "@/components/Showreel/Showreel";
import About from "@/components/About/About";
import FeaturedCards from "@/components/FeaturedCards/FeaturedCards";
import WeddingCTA from "@/components/WeddingCTA/WeddingCTA";
import Copy from "@/components/Copy/Copy";
import { useLanguage } from "@/providers/LanguageProvider";

import "./home.css";

export default function Home() {
  const { t } = useLanguage();
  const heroDelay = isInitialLoad ? 7 : 0.5;
  const footerDelay = isInitialLoad ? 7.5 : 0.75;

  return (
    <>
      <Preloader />

      <section className="hero">
        <div className="hero-img">
          <img src="/images/img2.jpg" alt="" />
        </div>

        <div className="container">
          <div className="hero-header">
            <Copy animateOnScroll={false} delay={heroDelay}>
              <h2>CAPICCI</h2>
              <h2 className="subheader">EVENTS & HAPPINESS</h2>
            </Copy>
          </div>

          <div className="hero-footer">
            <Copy variant="flicker" delay={footerDelay} animateOnScroll={false}>
              <p className="mono sm">{t("homeTagline")}</p>
            </Copy>
            <Copy variant="flicker" delay={footerDelay} animateOnScroll={false}>
              <p className="mono sm">[ Since 1999 ]</p>
            </Copy>
          </div>
        </div>
      </section>

      <About showIntro={false} />

      <Showreel />

      <FeaturedCards />

      <WeddingCTA />
    </>
  );
}
