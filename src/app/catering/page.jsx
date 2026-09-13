"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/providers/LanguageProvider";

export default function CateringPage() {
  const { t } = useLanguage();
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

      <section className="page-content">
        <div className="container">
          <div className="content-wrapper">
            <Copy splitType="words">
              <p className="lg">{t("cateringLead")}</p>
            </Copy>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">{t("cateringQuality")}</h6>
              </Copy>
              <p className="md">
                {t("cateringQualityCopy")}
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">{t("cateringFlexibility")}</h6>
              </Copy>
              <p className="md">
                {t("cateringFlexibilityCopy")}
              </p>
            </div>

            <div className="cta-section">
              <Button href="/contacts" label={t("requestQuote")} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}