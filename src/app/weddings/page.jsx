"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import TransmitPage from "@/app/transmit/page";
import { useLanguage } from "@/providers/LanguageProvider";

import "./weddings.css";

const weddingImages = [
  { src: "/images/weddings/casamento_6.jpg", alt: "Jardim preparado para um casamento" },
  { src: "/images/weddings/casamento_2.jpeg", alt: "Cerimónia de casamento na praia" },
  { src: "/images/weddings/casamento_3.jpg", alt: "Sala preparada para um casamento" },
  { src: "/images/weddings/casamento_4.jpeg", alt: "Mesa de apoio decorada" },
  { src: "/images/weddings/casamento_5.jpeg", alt: "Sala de casamento decorada" },
  { src: "/images/weddings/casamento_1.jpg", alt: "Mesa de casamento junto ao mar" },
  { src: "/images/weddings/casamento_7.jpeg", alt: "Mesa de casamento ao ar livre" },
  { src: "/images/weddings/casamento_8.jpeg", alt: "Celebração junto à piscina" },
  { src: "/images/weddings/casamento_9.jpeg", alt: "Decoração de casamento ao entardecer" },
  { src: "/images/weddings/casamento_10.jpeg", alt: "Mesa de casamento com vista" },
];

const weddingServiceCards = [
  {
    id: "transmit-card-1",
    image: "/images/weddings/casamento_11.jpeg",
    mobileImage: "/images/weddings/casamento_7.jpeg",
    split: "left",
    index: "01",
    labelKey: "catering",
    valueKey: "gastronomy",
    label2Key: "about",
    value2Key: "weddingCopy",
  },
  {
    id: "transmit-card-2",
    image: "/images/weddings/casamento_11.jpeg",
    mobileImage: "/images/weddings/casamento_7.jpeg",
    split: "middle",
    index: "02",
    labelKey: "decoration",
    valueKey: "uniqueAestheticCopy",
    label2Key: "sustainability",
    value2Key: "uniqueAestheticCopy",
  },
  {
    id: "transmit-card-3",
    image: "/images/weddings/casamento_11.jpeg",
    mobileImage: "/images/weddings/casamento_7.jpeg",
    split: "right",
    index: "03",
    labelKey: "weddings",
    valueKey: "weddingDetail",
    label2Key: "aboutHow",
    value2Key: "weddingStory",
  },
];

export default function WeddingsPage() {
  const { t } = useLanguage();
  return (
    <>
      <TransmitPage
        mode="weddings"
        className="weddings-flip-section"
        heading={t("weddingHeading")}
        cards={weddingServiceCards}
      />

      <section className="weddings-opening-copy">
        <div className="container">
          <Copy splitType="words">
            <p className="lg">
              {t("weddingLead")}
            </p>
          </Copy>
        </div>
      </section>

      <section className="weddings-showcase">
        <div className="container">
          <div className="weddings-hero-image">
            <img src={weddingImages[0].src} alt={t("imageAlt")} />
            <div className="weddings-image-caption">
              <p className="mono sm">{t("weddingDay")}</p>
              <p className="v2">{t("weddingDetail")}</p>
            </div>
          </div>

          <div className="weddings-intro">
            <Copy splitType="words">
              <h3 className="v2">{t("weddingTitle")}</h3>
            </Copy>
            <p className="md">
              {t("weddingCopy")}
            </p>
          </div>

          <div className="weddings-image-row">
            {weddingImages.slice(1, 4).map((image, index) => (
              <div className={`weddings-image-card weddings-image-card-${index + 1}`} key={image.src}>
                <img src={image.src} alt={t("imageAlt")} />
              </div>
            ))}
          </div>

          <div className="weddings-story-grid">
            <div className="weddings-story-copy">
              <Copy splitType="words">
                <p className="mono">{t("weddingApproach")}</p>
                <h4 className="v2">{t("weddingMeasure")}</h4>
              </Copy>
              <p className="md">
                {t("weddingStory")}
              </p>
            </div>
            <div className="weddings-story-image">
              <img src={weddingImages[4].src} alt={t("imageAlt")} />
            </div>
          </div>

          <div className="weddings-mosaic">
            {weddingImages.slice(5).map((image) => (
              <div className="weddings-mosaic-item" key={image.src}>
                <img src={image.src} alt={t("imageAlt")} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="weddings-final-cta">
        <Button href="/contacts" label={t("startPlanning")} />
      </div>
    </>
  );
}