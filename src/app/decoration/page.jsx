"use client";

import { useState } from "react";
import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import GalleryGrid from "@/components/GalleryGrid/GalleryGrid";
import { useLanguage } from "@/providers/LanguageProvider";

const decorationCategories = [
  { id: "copos", key: "glasses", folder: "copos", images: [] },
  { id: "loicas", key: "crockery", folder: "loicas", images: [] },
  {
    id: "mesas-e-cadeiras",
    key: "tables",
    folder: "mesas e cadeiras",
    images: [],
  },
  { id: "mobilia", key: "furniture", folder: "mobilia", images: [] },
  { id: "diversos", key: "miscellaneous", folder: "diversos", images: [] },
];

export default function DecorationPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(decorationCategories[0].id);
  const selectedCategory = decorationCategories.find(
    (category) => category.id === activeCategory,
  );

  return (
    <>
      <section className="page-header decoration-page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>{t("decorationTitle")}</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="page-content decoration-page-content">
        <div className="container">
          <div className="content-wrapper">
            <div className="decoration-intro">
              <div className="decoration-intro-copy">
                <Copy splitType="words">
                  <p className="lg">
                    {t("decorationLead")}
                  </p>
                </Copy>

                <div className="decoration-intro-details">
                  <div>
                    <p className="mono sm">{t("uniqueAesthetic")}</p>
                    <p className="md">
                      {t("uniqueAestheticCopy")}
                    </p>
                  </div>
                  <div>
                    <p className="mono sm">{t("sustainability")}</p>
                    <p className="md">
                      {t("sustainabilityCopy")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="decoration-intro-images" aria-label={t("decorationImages")}>
                {[1, 2, 3].map((index) => (
                  <div className="decoration-intro-placeholder" key={index}>
                    <span>decoration_{index}.jpg</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="decoration-gallery">
              <Copy splitType="words">
                <h6 className="v2">{t("availableCategories")}</h6>
              </Copy>

              <div className="decoration-category-list" role="tablist" aria-label={t("materialCategories")}>
                {decorationCategories.map((category) => (
                  <button
                    className={`decoration-category${activeCategory === category.id ? " is-active" : ""}`}
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === category.id}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {t(category.key)}
                  </button>
                ))}
              </div>

              <div className="decoration-gallery-panel" role="tabpanel">
                <p className="mono sm">[ {selectedCategory.folder} ]</p>
                <GalleryGrid
                  images={selectedCategory.images}
                  placeholderCount={4}
                  placeholderLabel={t(selectedCategory.key)}
                />
              </div>
            </div>

            <div className="cta-section">
              <Button href="/contacts" label={t("moreInfo")} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}