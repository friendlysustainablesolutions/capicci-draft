"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "../Copy/Copy";
import { useLanguage } from "@/providers/LanguageProvider";

import "./Clients.css";

gsap.registerPlugin(ScrollTrigger);

// Names are proper nouns, so they double as the alt text in every language.
const CLIENT_LOGOS = [
  { src: "/clients/sothebys-portugal.png", name: "Portugal Sotheby's International Realty" },
  { src: "/clients/ethglobal.png", name: "ETHGlobal" },
  { src: "/clients/thomas-piron.png", name: "Thomas & Piron Groupe Portugal" },
  { src: "/clients/omnitel.png", name: "Omnitel" },
  { src: "/clients/exklusive.jpeg", name: "Exklusive Special and Visual Effects" },
  { src: "/clients/mossa.png", name: "Mossa" },
  { src: "/clients/nova-sbe.png", name: "Nova SBE Executive Education" },
];

// Constant scroll speed regardless of how many logos there are or how wide
// the tiles render at a given breakpoint.
const CAROUSEL_SPEED_PX_PER_SECOND = 55;

export default function Clients({ logos = CLIENT_LOGOS }) {
  const { t } = useLanguage();
  const clientsRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useGSAP(
    () => {
      const section = clientsRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const reveal = gsap.from(".clients-carousel", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      });

      function setup() {
        // The track renders two back-to-back copies of the logo list (below);
        // once the first copy has scrolled fully past, resetting x to 0 lands
        // on an identical frame, so the loop is seamless.
        const items = track.querySelectorAll(".clients-item");
        const singleSetCount = items.length / 2;
        const trackGap = parseFloat(getComputedStyle(track).gap || 0);
        let singleSetWidth = 0;

        for (let i = 0; i < singleSetCount; i++) {
          singleSetWidth += items[i].offsetWidth + trackGap;
        }

        tweenRef.current?.kill();
        gsap.set(track, { x: 0 });

        // Duration derived from the measured width so the crawl speed stays
        // constant whether a language's logo count or a breakpoint's tile
        // size changes how wide one set of logos actually is.
        tweenRef.current = gsap.to(track, {
          x: -singleSetWidth,
          duration: singleSetWidth / CAROUSEL_SPEED_PX_PER_SECOND,
          ease: "none",
          repeat: -1,
        });
      }

      setup();

      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setup, 250);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        reveal.scrollTrigger?.kill();
        tweenRef.current?.kill();
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: clientsRef, dependencies: [logos] },
  );

  return (
    <section className="clients" ref={clientsRef}>
      <div className="container">
        <div className="clients-slogan">
          <Copy splitType="words">
            <h2 className="v2">{t("slogan")}</h2>
          </Copy>
        </div>

        <Copy variant="flicker">
          <p className="mono clients-label">{t("clientsLabel")}</p>
        </Copy>

        {/* Keeps crawling on hover -- deliberately no pause/resume here. */}
        <div className="clients-carousel">
          <div className="clients-track" ref={trackRef}>
            {[...logos, ...logos].map((logo, i) => (
              <div className="clients-item" key={`${logo.src}-${i}`}>
                <img src={logo.src} alt={logo.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
