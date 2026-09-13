"use client";

import Copy from "../Copy/Copy";
import FieldReportPage from "@/app/report/page";
import Button from "../Button/Button";
import { useLanguage } from "@/providers/LanguageProvider";

import "./About.css";

const serviceImages = [
  {
    src: "/images/services/services_catering.jpg",
    compassRotation: 0,
  },
  {
    src: "/images/services/services_decoration.jpg",
    compassRotation: 120,
  },
  {
    src: "/images/services/services_graphic_design.jpg",
    compassRotation: 240,
  }
];

const serviceDataBlocks = [
  [
    { label: "Catering", value: "Gastronomia versátil", position: "top-left" },
    { label: "Ementas", value: "Tradicionais e alternativas", position: "bottom-right" },
  ],
  [
    { label: "Decoração", value: "Ambientes únicos", position: "top-right" },
    { label: "Aluguer", value: "Loiças, mobiliário e equipamento", position: "bottom-left" },
  ],
  [
    { label: "Design Gráfico", value: "Uma identidade com essência", position: "top-left" },
    { label: "Propostas", value: "Convites e brochuras", position: "bottom-right" },
  ],
];

export default function About({ showIntro = true }) {
  const { t } = useLanguage();
  const serviceDataBlocks = [
    [
      { label: t("cateringLabel"), value: t("gastronomy"), position: "top-left" },
      { label: t("menus"), value: t("menusValue"), position: "bottom-right" },
    ],
    [
      { label: t("decorationLabel"), value: t("decorationValue"), position: "top-right" },
      { label: t("hire"), value: t("hireValue"), position: "bottom-left" },
    ],
    [
      { label: t("design"), value: t("designValue"), position: "top-left" },
      { label: t("proposals"), value: t("proposalsValue"), position: "bottom-right" },
    ],
  ];

  return (
    <section className="about">
      <div className="container">
        <div className="about-wrapper">
          {showIntro && (
            <div className="about-intro">
            <Copy variant="flicker">
              <p className="mono about-label">[ {t("aboutTitle").toUpperCase()} ]</p>
            </Copy>

            <Copy splitType="words">
              <h5 className="v2 about-title">
                {t("aboutIntro")}
              </h5>
            </Copy>
            </div>
          )}

          <div className="about-services-intro">
            <Copy variant="flicker">
              <p className="mono about-services-label">[ {t("aboutHow")} ]</p>
            </Copy>
            <Copy splitType="words">
              <h1 className="v2 about-services-title">{t("aboutSolutions")}</h1>
            </Copy>
            <p className="lg about-services-copy">
              {t("aboutCopy")}
            </p>
          </div>

          <div className="about-services-report">
            <FieldReportPage
              mode="services"
              visualImages={serviceImages}
              visualDataBlocks={serviceDataBlocks}
            />
          </div>

          <div className="about-footer">
            <Copy variant="flicker">
              <p className="mono about-footer-label">[ MARVILA / O 8 ]</p>
            </Copy>
            <Copy splitType="words">
              <h4 className="v2 about-footer-title">{t("aboutSpace")}</h4>
            </Copy>
            <p className="lg about-footer-copy">
              {t("aboutSpaceCopy")}
            </p>
            <Button href="/spaces">{t("aboutSpaceButton")}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
