"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import Button from "../Button/Button";
import { useLanguage } from "@/providers/LanguageProvider";

import "./Showreel.css";

gsap.registerPlugin(ScrollTrigger, Flip);

export default function Showreel() {
  const { t } = useLanguage();
  const showreelRef = useRef(null);

  useGSAP(
    () => {
      const section = showreelRef.current;
      const headers = gsap.utils.toArray(".showreel-header", section);
      const visual = section?.querySelector(".showreel-visual");
      const marqueeContainer = section?.querySelector(
        ".showreel-marquee-container",
      );
      const marqueeTrack = section?.querySelector(".showreel-marquee-track");

      if (!headers.length || !visual || !marqueeContainer) return;

      let showreelHeaderFlip;
      let showreelVisualFlip;
      let showreelMarqueeFlip;
      let showreelTrigger;
      let showreelMarqueeTween;

      function setup() {
        cleanup();

        headers.forEach((h) => h.classList.remove("end-state"));
        visual.classList.remove("end-state");

        gsap.set([...headers, visual, marqueeContainer], {
          clearProps: "all",
        });
        if (marqueeTrack) gsap.set(marqueeTrack, { clearProps: "all" });

        visual.classList.toggle(
          "showreel-visual--compact",
          window.innerWidth < 1000,
        );

        // eslint-disable-next-line no-unused-expressions
        section.offsetHeight;

        marqueeContainer.style.width = `${marqueeContainer.offsetWidth}px`;

        const showreelHeaderState = Flip.getState(headers);
        const showreelVisualState = Flip.getState(visual);
        const showreelMarqueeState = Flip.getState(marqueeContainer);

        headers.forEach((h) => h.classList.add("end-state"));
        visual.classList.add("end-state");

        showreelHeaderFlip = Flip.from(showreelHeaderState, {
          duration: 1,
          ease: "none",
          absolute: true,
          paused: true,
        });

        showreelVisualFlip = Flip.from(showreelVisualState, {
          duration: 1,
          ease: "none",
          absolute: false,
          paused: true,
        });

        showreelMarqueeFlip = Flip.from(showreelMarqueeState, {
          duration: 1,
          ease: "none",
          absolute: false,
          paused: true,
        });

        showreelHeaderFlip.progress(0);
        showreelVisualFlip.progress(0);
        showreelMarqueeFlip.progress(0);

        if (marqueeTrack) {
          const items = marqueeTrack.querySelectorAll("p");
          const singleSetCount = items.length / 2;
          const trackGap = parseFloat(getComputedStyle(marqueeTrack).gap || 0);
          let singleSetWidth = 0;

          for (let i = 0; i < singleSetCount; i++) {
            singleSetWidth += items[i].offsetWidth + trackGap;
          }

          gsap.set(marqueeTrack, { x: 0 });

          showreelMarqueeTween = gsap.to(marqueeTrack, {
            x: -singleSetWidth,
            duration: 12,
            ease: "none",
            repeat: -1,
          });
        }

        showreelTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            showreelHeaderFlip.progress(self.progress);
            showreelVisualFlip.progress(self.progress);
            showreelMarqueeFlip.progress(self.progress);
          },
        });
      }

      function cleanup() {
        showreelTrigger?.kill();
        showreelHeaderFlip?.kill();
        showreelVisualFlip?.kill();
        showreelMarqueeFlip?.kill();
        showreelMarqueeTween?.kill();
      }

      setup();

      let showreelResizeTimer;
      const handleShowreelResize = () => {
        clearTimeout(showreelResizeTimer);
        showreelResizeTimer = setTimeout(setup, 250);
      };

      window.addEventListener("resize", handleShowreelResize);

      return () => {
        cleanup();
        clearTimeout(showreelResizeTimer);
        window.removeEventListener("resize", handleShowreelResize);
        marqueeContainer.style.width = "";
      };
    },
    { scope: showreelRef },
  );

  return (
    <section className="showreel" ref={showreelRef}>
      <div className="showreel-header" id="showreel-header-1">
        <span aria-hidden="true">EVENTOS</span>
      </div>

      <div className="showreel-header" id="showreel-header-2">
        <span aria-hidden="true">EVENTOS</span>
      </div>

      <div className="showreel-header" id="showreel-header-3">
        <span aria-hidden="true">EVENTOS</span>
      </div>

      <div className="showreel-header" id="showreel-header-4">
        <span aria-hidden="true">EVENTOS</span>
      </div>

      <div className="container">
        <div className="showreel-visual">
          <img src="/images/img8.jpg" alt="" />

          <div className="showreel-marquee-container">
            <div className="showreel-marquee">
              <div className="showreel-marquee-track">
                {Array.from({ length: 6 }, (_, index) => <p className="sm" key={index}>{t("spacesButton")}</p>)}
                <p className="sm">O 8 MARVILA – Eventos com espaço para acontecer</p>
                <p className="sm">O 8 MARVILA – Eventos com espaço para acontecer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="showreel-space-cta">
          <p className="mono sm">[ MARVILA / ESPAÇOS ]</p>
          <p className="v2">Venha conhecer os nossos espaços.</p>
          <Button href="/spaces">Ver espaços</Button>
        </div>
      </div>
    </section>
  );
}
