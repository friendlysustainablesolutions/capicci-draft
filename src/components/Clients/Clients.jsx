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
];

export default function Clients({ logos = CLIENT_LOGOS }) {
  const { t } = useLanguage();
  const clientsRef = useRef(null);

  useGSAP(
    () => {
      const tiles = gsap.utils.toArray(".clients-item");
      if (!tiles.length) return;

      const animation = gsap.from(tiles, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".clients-grid",
          start: "top 85%",
          once: true,
        },
      });

      return () => animation.scrollTrigger?.kill();
    },
    { scope: clientsRef },
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

        <ul className="clients-grid">
          {logos.map((logo) => (
            <li className="clients-item" key={logo.src}>
              <img src={logo.src} alt={logo.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
