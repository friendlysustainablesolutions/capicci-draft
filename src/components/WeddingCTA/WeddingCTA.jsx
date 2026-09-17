"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/providers/LanguageProvider";

import "./WeddingCTA.css";

export default function WeddingCTA() {
  const { t } = useLanguage();

  return (
    <section className="wedding-cta">
      <div className="container">
        <div className="wedding-cta-grid">
          <div className="wedding-cta-copy">
            <Copy variant="flicker">
              <p className="mono">[ WEDDINGS ]</p>
            </Copy>
            <Copy splitType="words">
              <h2 className="v2">{t("weddingHeading")}</h2>
            </Copy>
            <p className="lg">{t("weddingLead")}</p>
            <Copy variant="slide" delay={0.35}>
              <Button href="/weddings">{t("startPlanning")}</Button>
            </Copy>
          </div>

          <div className="wedding-cta-video" aria-label={t("weddingVideoAlt")}>
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/images/homepage.wedding.video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
