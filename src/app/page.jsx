"use client";

import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import Showreel from "@/components/Showreel/Showreel";
import About from "@/components/About/About";
import FeaturedCards from "@/components/FeaturedCards/FeaturedCards";
import CTA from "@/components/CTA/CTA";
import Copy from "@/components/Copy/Copy";

import "./home.css";

export default function Home() {
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
              <h1>CAPICCI</h1>
              <h1 className="subheader">EVENTS & HAPPINESS</h1>
            </Copy>
          </div>

          <div className="hero-footer">
            <Copy variant="flicker" delay={footerDelay} animateOnScroll={false}>
              <p className="mono sm">Events that Matter</p>
            </Copy>
            <Copy variant="flicker" delay={footerDelay} animateOnScroll={false}>
              <p className="mono sm">[ Since 1999 ]</p>
            </Copy>
          </div>
        </div>
      </section>

      <About />

      <Showreel />

      <CTA />

      <FeaturedCards />
    </>
  );
}
