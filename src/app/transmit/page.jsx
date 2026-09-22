"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "@/components/Copy/Copy";
import { useLanguage } from "@/providers/LanguageProvider";

import "./transmit.css";

gsap.registerPlugin(ScrollTrigger);

const transmitCards = [
  {
    id: "transmit-card-1",
    image: "/transmit/transmit-card-1.jpg",
    index: "01",
    labelKey: "email",
    value: "geral@capicci.pt",
    label2Key: "brand",
    value2: "CAPICCI - Events & Happiness",
  },
  {
    id: "transmit-card-2",
    image: "/transmit/transmit-card-2.jpg",
    index: "02",
    labelKey: "phone",
    value: "+351 919 402 836",
    label2Key: "phone",
    value2: "+351 967 144 450",
  },
  {
    id: "transmit-card-3",
    image: "/transmit/transmit-card-3.jpg",
    index: "03",
    labelKey: "address",
    value: "Amoreira, Alcabideche",
    label2Key: "location",
    value2: "Praça David Leandro da Silva, Lisboa",
  },
];

const MOBILE_BREAKPOINT = 1000;

export default function TransmitPage({
  mode = "contact",
  cards = transmitCards,
  heading,
  className = "",
}) {
  const transmitStickyRef = useRef(null);
  const transmitContainerRef = useRef(null);
  const transmitHeaderRef = useRef(null);
  const transmitGapCompleted = useRef(false);
  const transmitFlipCompleted = useRef(false);
  const transmitHeaderHidden = useRef(false);
  const { t } = useLanguage();

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

      function setup() {
        cleanup();

        // Recomputed per setup() (which re-runs on resize) rather than captured
        // once at mount -- otherwise crossing the breakpoint leaves the desktop
        // path running on mobile, which tilts the cards via rotationZ.
        const isMobileWeddings =
          window.innerWidth < MOBILE_BREAKPOINT && mode === "weddings";

        transmitCardEls.forEach((card) =>
          gsap.set(card, { clearProps: "all" }),
        );
        gsap.set(transmitContainer, { clearProps: "all" });
        gsap.set(transmitHeader, { clearProps: "all" });

        transmitGapCompleted.current = false;
        transmitFlipCompleted.current = false;
        transmitHeaderHidden.current = false;

        if (window.innerWidth < MOBILE_BREAKPOINT && mode !== "weddings") return;

        gsap.set(transmitHeader, {
          y: mode === "weddings" ? 0 : 40,
          opacity: mode === "weddings" ? 1 : 0,
        });

        transmitScrollTrigger = ScrollTrigger.create({
          trigger: transmitSection,
          start: "top top",
          end: `+=${window.innerHeight * 3}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const transmitProgress = self.progress;
            const headerHideProgress = isMobileWeddings ? 0.02 : 0.7;

            if (
              mode === "weddings" &&
              transmitProgress <= 0.001 &&
              transmitHeaderHidden.current
            ) {
              transmitHeaderHidden.current = false;
              gsap.to(transmitHeader, {
                opacity: 1,
                duration: 0.35,
                ease: "power2.out",
              });
            }

            if (
              mode === "weddings" &&
              transmitProgress >= headerHideProgress &&
              !transmitHeaderHidden.current
            ) {
              transmitHeaderHidden.current = true;
              gsap.to(transmitHeader, {
                opacity: 0,
                duration: 0.35,
                ease: "power2.out",
              });
            }

            if (isMobileWeddings) {
              const mobileProgress = gsap.utils.clamp(0, 1, transmitProgress);
              if (!transmitHeaderHidden.current) {
                gsap.set(transmitHeader, {
                  y: 0,
                  opacity: 1,
                });
              }
              transmitCardEls.forEach((card, index) => {
                const cardProgress = gsap.utils.clamp(
                  0,
                  1,
                  (mobileProgress - index * 0.12) / 0.45,
                );
                gsap.set(card, {
                  yPercent: 0,
                  rotationY: 180 * cardProgress,
                });
              });
              return;
            }

            if (!(mode === "weddings" && transmitHeaderHidden.current)) {
              if (transmitProgress >= 0.1 && transmitProgress <= 0.25) {
                const transmitHeaderProgress = gsap.utils.mapRange(
                  0.1,
                  0.25,
                  0,
                  1,
                  transmitProgress,
                );
                gsap.set(transmitHeader, {
                  y: gsap.utils.mapRange(
                    0,
                    1,
                    mode === "weddings" ? 0 : 40,
                    0,
                    transmitHeaderProgress,
                  ),
                  opacity: mode === "weddings" ? 1 : transmitHeaderProgress,
                });
              } else if (transmitProgress < 0.1) {
                gsap.set(transmitHeader, {
                  y: mode === "weddings" ? 0 : 40,
                  opacity: mode === "weddings" ? 1 : 0,
                });
              } else {
                gsap.set(transmitHeader, { y: 0, opacity: 1 });
              }
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
          <h6 className="v2">{heading || t("contactHeading")}</h6>
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
                  <img src={card.image} alt={t(card.labelKey || "imageAlt")} />
                </picture>
              </div>
              <div className="transmit-card-back">
                <span className="transmit-card-index">[ {card.index} ]</span>
                <div className="transmit-card-info">
                  <div className="transmit-card-block">
                    <p className="mono sm">{card.labelKey ? t(card.labelKey) : card.label}</p>
                    <p className="lg">{card.valueKey ? t(card.valueKey) : card.value}</p>
                  </div>
                  <div className="transmit-card-block">
                    <p className="mono sm">{card.label2Key ? t(card.label2Key) : card.label2}</p>
                    <p className="lg">{card.value2Key ? t(card.value2Key) : card.value2}</p>
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
              <h1>{t("contactTitle")}</h1>
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
