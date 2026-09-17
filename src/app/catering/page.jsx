"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/providers/LanguageProvider";

import "./catering.css";

gsap.registerPlugin(ScrollTrigger);

// How far the corners are chewed in, as a fraction of the media's short side.
const MAX_BITE_RATIO = 0.28;
// Vertical drift of the image inside its frame, in % of the frame's height.
const PARALLAX_RANGE = 7;

export default function CateringPage() {
  const { t } = useLanguage();
  const cateringRef = useRef(null);

  useGSAP(
    () => {
      const mediaItems = gsap.utils.toArray(".catering-media");
      if (!mediaItems.length) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        mediaItems.forEach((media) => media.style.setProperty("--bite", "0px"));
        return;
      }

      const triggers = mediaItems.map((media) => {
        const image = media.querySelector("img");

        function apply(progress) {
          const maxBite =
            Math.min(media.offsetWidth, media.offsetHeight) * MAX_BITE_RATIO;
          media.style.setProperty("--bite", `${maxBite * progress}px`);
          if (image) {
            image.style.transform = `translate3d(0, ${
              (progress - 0.5) * PARALLAX_RANGE
            }%, 0)`;
          }
        }

        apply(0);

        return ScrollTrigger.create({
          trigger: media,
          // Starts once the frame is well inside the viewport and finishes as it
          // leaves, so the bite grows across the whole time it is on screen.
          start: "top 80%",
          end: "bottom 15%",
          scrub: true,
          onUpdate: (self) => apply(self.progress),
          onRefresh: (self) => apply(self.progress),
        });
      });

      return () => triggers.forEach((trigger) => trigger.kill());
    },
    { scope: cateringRef },
  );

  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>Catering</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="catering-page" ref={cateringRef}>
        <div className="container">
          <div className="catering-lead">
            <Copy splitType="words">
              <p className="lg">{t("cateringLead")}</p>
            </Copy>
          </div>

          <div className="catering-row">
            <div className="catering-media">
              <img src="/images/catering/1.webp" alt={t("imageAlt")} />
            </div>
            <div className="catering-row-copy">
              <Copy splitType="words">
                <p className="mono">01</p>
                <h4 className="v2">{t("cateringQuality")}</h4>
              </Copy>
              <p className="md">{t("cateringQualityCopy")}</p>
            </div>
          </div>

          <div className="catering-row catering-row--reverse">
            <div className="catering-media">
              <img src="/images/catering/2.webp" alt={t("imageAlt")} />
            </div>
            <div className="catering-row-copy">
              <Copy splitType="words">
                <p className="mono">02</p>
                <h4 className="v2">{t("cateringFlexibility")}</h4>
              </Copy>
              <p className="md">{t("cateringFlexibilityCopy")}</p>
            </div>
          </div>

          <div className="catering-media catering-media--wide">
            <img src="/images/catering/5.webp" alt={t("imageAlt")} />
          </div>

          <div className="cta-section">
            <Button href="/contacts" label={t("requestQuote")} />
          </div>
        </div>
      </section>
    </>
  );
}
