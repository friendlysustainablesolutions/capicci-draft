"use client";

import { useState, useEffect } from "react";
import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import GalleryGrid from "@/components/GalleryGrid/GalleryGrid";
import { useLanguage } from "@/providers/LanguageProvider";

const decorationCategories = [
  { id: "copos", key: "glasses", folder: "copos" },
  { id: "loicas", key: "crockery", folder: "loicas" },
  { id: "mesas-e-cadeiras", key: "tables", folder: "mesas e cadeiras" },
  { id: "mobilia", key: "furniture", folder: "mobilia" },
  { id: "diversos", key: "miscellaneous", folder: "diversos" },
];

// Intro section images mapped directly from public/images/decoration
const introImages = [
  { src: "/images/decoration/decoration_1.jpg", alt: "Decoration 1" },
  { src: "/images/decoration/decoration_2.jpg", alt: "Decoration 2" },
  { src: "/images/decoration/decoration_3.jpg", alt: "Decoration 3" },
];

export default function DecorationPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(decorationCategories[0].id);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = decorationCategories.find(
    (category) => category.id === activeCategory
  );

  useEffect(() => {
    async function loadCategoryImages() {
      setLoading(true);
      try {
        const folderParam = encodeURIComponent(selectedCategory.folder);
        const res = await fetch(`/api/gallery?folder=${folderParam}`);
        const data = await res.json();
        setImages(data.images || []);
      } catch (err) {
        console.error("Failed to load images:", err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    }

    loadCategoryImages();
  }, [selectedCategory.folder]);

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
                  <p className="lg">{t("decorationLead")}</p>
                </Copy>

                <div className="decoration-intro-details">
                  <div>
                    <p className="mono sm">{t("uniqueAesthetic")}</p>
                    <p className="md">{t("uniqueAestheticCopy")}</p>
                  </div>
                  <div>
                    <p className="mono sm">{t("sustainability")}</p>
                    <p className="md">{t("sustainabilityCopy")}</p>
                  </div>
                </div>
              </div>

              {/* Real images routed from public/images/decoration */}
              <div className="decoration-intro-images" aria-label={t("decorationImages")}>
                {introImages.map((img, index) => (
                  <div className="decoration-intro-placeholder" key={index}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        // Fallback to label if the image file isn't found
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "block";
                      }}
                    />
                    <span style={{ display: "none" }}>{`decoration_${index + 1}.jpg`}</span>
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
                {loading ? (
                  <p className="mono sm">A carregar imagens...</p>
                ) : (
                  <GalleryGrid
                    images={images}
                    placeholderCount={0}
                    placeholderLabel={t(selectedCategory.key)}
                  />
                )}
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