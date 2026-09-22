"use client";

import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import Showreel from "@/components/Showreel/Showreel";
import About from "@/components/About/About";
import FeaturedCards from "@/components/FeaturedCards/FeaturedCards";
import Clients from "@/components/Clients/Clients";
import WeddingCTA from "@/components/WeddingCTA/WeddingCTA";
import Copy from "@/components/Copy/Copy";
import { useLanguage } from "@/providers/LanguageProvider";

import "./home.css";

export default function Home() {
  const { t } = useLanguage();
  // The preloader's own timeline finishes around 5.5s, so these pick up just
  // as it clears rather than leaving a pause on an empty hero.
  const heroDelay = isInitialLoad ? 5.7 : 0.5;
  const footerDelay = isInitialLoad ? 6.1 : 0.75;

  return (
    <>
      <Preloader />

      <section className="hero">
        <div className="hero-img">
          <img src="/images/img2.jpg" alt="" />
        </div>

        <div className="container">
          <div className="hero-header">
            <Copy variant="slide" animateOnScroll={false} delay={heroDelay}>
              <img className="hero-logo" src="/images/hero%20logo.png" alt="CAPICCI - Events & Happiness" />
            </Copy>
          </div>

          <div className="hero-footer">
            <Copy variant="flicker" delay={footerDelay} animateOnScroll={false}>
              <p className="mono sm">{t("homeTagline")}</p>
            </Copy>
            <Copy variant="flicker" delay={footerDelay} animateOnScroll={false}>
              <p className="mono sm">{t("homeSince")}</p>
            </Copy>
          </div>
        </div>
      </section>

      <About showIntro={false} />

      <Showreel />

      <FeaturedCards />

      <Clients />

      <WeddingCTA />
    </>
  );
}
