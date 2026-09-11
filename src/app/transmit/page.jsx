"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "@/components/Copy/Copy";

import "./transmit.css";

gsap.registerPlugin(ScrollTrigger);

const transmitCards = [
  {
    id: "transmit-card-1",
    image: "/transmit/transmit-card-1.jpg",
    index: "01",
    label: "Email",
    value: "geral@capicci.pt",
    label2: "Marca",
    value2: "CAPICCI - Events & Happiness",
  },
  {
    id: "transmit-card-2",
    image: "/transmit/transmit-card-2.jpg",
    index: "02",
    label: "Telefone",
    value: "+351 919 402 836",
    label2: "Telefone",
    value2: "+351 967 144 450",
  },
  {
    id: "transmit-card-3",
    image: "/transmit/transmit-card-3.jpg",
    index: "03",
    label: "Morada",
    value: "Amoreira, Alcabideche",
    label2: "Localização",
    value2: "Praça David Leandro da Silva, Lisboa",
  },
];

const MOBILE_BREAKPOINT = 1000;

export default function TransmitPage({
  mode = "contact",
  cards = transmitCards,
  heading = "Contacte-nos",
  className = "",
}) {
  const transmitStickyRef = useRef(null);
  const transmitContainerRef = useRef(null);
  const transmitHeaderRef = useRef(null);
  const transmitGapCompleted = useRef(false);
  const transmitFlipCompleted = useRef(false);

  useGSAP(
    () => {
      const transmitSection = transmitStickyRef.current;
      const transmitContainer = transmitContainerRef.current;
      const transmitHeader = transmitHeaderRef.current;
      if (!transmitSection || !transmitContainer || !transmitHeader) return;

      const transmitCardEls = [
        ...transmitSection.querySelectorAll(".transmit-card"),
      ];
      const transmitCard1 = transmitSection.querySelector("#transmit-card-1");
      const transmitCard2 = transmitSection.querySelector("#transmit-card-2");
      const transmitCard3 = transmitSection.querySelector("#transmit-card-3");

      let transmitScrollTrigger;
      const isMobileWeddings =
        window.innerWidth < MOBILE_BREAKPOINT && mode === "weddings";

      function setup() {
        cleanup();

        transmitCardEls.forEach((card) =>
          gsap.set(card, { clearProps: "all" }),
        );
        gsap.set(transmitContainer, { clearProps: "all" });
        gsap.set(transmitHeader, { clearProps: "all" });

        transmitGapCompleted.current = false;
        transmitFlipCompleted.current = false;

        if (window.innerWidth < MOBILE_BREAKPOINT && mode !== "weddings") return;

        gsap.set(transmitHeader, { y: 40, opacity: 0 });

        transmitScrollTrigger = ScrollTrigger.create({
          trigger: transmitSection,
          start: "top top",
          end: `+=${window.innerHeight * 4}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const transmitProgress = self.progress;

            if (isMobileWeddings) {
              const mobileProgress = gsap.utils.clamp(0, 1, transmitProgress);
              gsap.set(transmitHeader, {
                y: gsap.utils.mapRange(0, 0.2, 40, 0, mobileProgress),
                opacity: mobileProgress > 0.02 ? 1 : 0,
              });
              gsap.set(transmitCardEls[0], {
                yPercent: -100 * mobileProgress,
                rotation: -8 * mobileProgress,
              });
              gsap.set(transmitCardEls[1], {
                yPercent: 0,
                rotation: 0,
              });
              gsap.set(transmitCardEls[2], {
                yPercent: 100 * mobileProgress,
                rotation: 8 * mobileProgress,
              });
              return;
            }

            if (transmitProgress >= 0.1 && transmitProgress <= 0.25) {
              const transmitHeaderProgress = gsap.utils.mapRange(
                0.1,
                0.25,
                0,
                1,
                transmitProgress,
              );
              gsap.set(transmitHeader, {
                y: gsap.utils.mapRange(0, 1, 40, 0, transmitHeaderProgress),
                opacity: transmitHeaderProgress,
              });
            } else if (transmitProgress < 0.1) {
              gsap.set(transmitHeader, { y: 40, opacity: 0 });
            } else {
              gsap.set(transmitHeader, { y: 0, opacity: 1 });
            }

            if (transmitProgress <= 0.25) {
              const transmitWidth = gsap.utils.mapRange(
                0,
                0.25,
                80,
                60,
                transmitProgress,
              );
              gsap.set(transmitContainer, { width: `${transmitWidth}%` });
            } else {
              gsap.set(transmitContainer, { width: "60%" });
            }

            if (transmitProgress >= 0.35 && !transmitGapCompleted.current) {
              gsap.to(transmitContainer, {
                gap: "16px",
                duration: 0.5,
                ease: "power3.out",
              });
              gsap.to(transmitCardEls, {
                borderRadius: "12px",
                duration: 0.5,
                ease: "power3.out",
              });
              transmitGapCompleted.current = true;
            } else if (
              transmitProgress < 0.35 &&
              transmitGapCompleted.current
            ) {
              gsap.to(transmitContainer, {
                gap: "0px",
                duration: 0.5,
                ease: "power3.out",
              });
              gsap.to(transmitCard1, {
                borderRadius: "12px 0 0 12px",
                duration: 0.5,
                ease: "power3.out",
              });
              gsap.to(transmitCard2, {
                borderRadius: "0px",
                duration: 0.5,
                ease: "power3.out",
              });
              gsap.to(transmitCard3, {
                borderRadius: "0 12px 12px 0",
                duration: 0.5,
                ease: "power3.out",
              });
              transmitGapCompleted.current = false;
            }

            if (transmitProgress >= 0.7 && !transmitFlipCompleted.current) {
              gsap.to(transmitCardEls, {
                rotationY: 180,
                duration: 0.75,
                ease: "power3.inOut",
                stagger: 0.1,
              });
              gsap.to([transmitCard1, transmitCard3], {
                y: 30,
                rotationZ: (i) => [-12, 12][i],
                duration: 0.75,
                ease: "power3.inOut",
              });
              transmitFlipCompleted.current = true;
            } else if (
              transmitProgress < 0.7 &&
              transmitFlipCompleted.current
            ) {
              gsap.to(transmitCardEls, {
                rotationY: 0,
                duration: 0.75,
                ease: "power3.inOut",
                stagger: -0.1,
              });
              gsap.to([transmitCard1, transmitCard3], {
                y: 0,
                rotationZ: 0,
                duration: 0.75,
                ease: "power3.inOut",
              });
              transmitFlipCompleted.current = false;
            }
          },
        });
      }

      function cleanup() {
        transmitScrollTrigger?.kill();
        transmitScrollTrigger = null;
      }

      setup();

      let transmitResizeTimer;
      const handleTransmitResize = () => {
        clearTimeout(transmitResizeTimer);
        transmitResizeTimer = setTimeout(setup, 250);
      };

      window.addEventListener("resize", handleTransmitResize);

      return () => {
        cleanup();
        clearTimeout(transmitResizeTimer);
        window.removeEventListener("resize", handleTransmitResize);
      };
    },
    { scope: transmitStickyRef },
  );

  const transmitSection = (
    <section className={`transmit-sticky ${className}`.trim()} ref={transmitStickyRef}>
      <div className="container">
        <div className="transmit-sticky-header" ref={transmitHeaderRef}>
          <h6 className="v2">{heading}</h6>
        </div>

        <div className="transmit-card-container" ref={transmitContainerRef}>
          {cards.map((card) => (
            <div className="transmit-card" id={card.id} key={card.id}>
              <div
                className={`transmit-card-front${card.split ? ` transmit-card-split transmit-card-split-${card.split}` : ""}`}
              >
                <picture>
                  {card.mobileImage && (
                    <source media="(max-width: 1000px)" srcSet={card.mobileImage} />
                  )}
                  <img src={card.image} alt={card.label} />
                </picture>
              </div>
              <div className="transmit-card-back">
                <span className="transmit-card-index">[ {card.index} ]</span>
                <div className="transmit-card-info">
                  <div className="transmit-card-block">
                    <p className="mono sm">{card.label}</p>
                    <p className="lg">{card.value}</p>
                  </div>
                  <div className="transmit-card-block">
                    <p className="mono sm">{card.label2}</p>
                    <p className="lg">{card.value2}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (mode === "weddings") return transmitSection;

  return (
    <>
      <section className="transmit-hero">
        <div className="container">
          <div className="transmit-hero-header">
            <Copy animateOnScroll={false} delay={0.65}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>Contactos</h1>
            </Copy>
          </div>
          <div className="transmit-hero-footer">
            <Copy variant="flicker" delay={0.85} animateOnScroll={false}>
              <p className="mono sm">geral@capicci.pt</p>
            </Copy>
            <Copy variant="flicker" delay={0.85} animateOnScroll={false}>
              <p className="mono sm">[ CAPICCI - Events & Happiness ]</p>
            </Copy>
          </div>
        </div>
      </section>

      {transmitSection}
    </>
  );
}
