"use client";

import { useLanguage } from "@/providers/LanguageProvider";

export default function GalleryGrid({
  images = [],
  placeholderCount = 0,
  placeholderLabel = "Imagem de decoração",
  emptyMessage = "Sem imagens disponíveis.",
}) {
  const { t } = useLanguage();

  if (!images.length && !placeholderCount) {
    return <p className="gallery-empty">{t("emptyGallery") || emptyMessage}</p>;
  }

  return (
    <div className="gallery-grid">
      {images.map((item, index) => {
        const imageSrc = typeof item === "string" ? item : item.src;
        const label = typeof item === "object" ? item.displayName : `Modelo ${index + 1}`;

        return (
          <div className="gallery-item" key={imageSrc || index}>
            <div className="image-wrapper">
              <img src={imageSrc} alt={label} loading="lazy" />
            </div>
            <span className="image-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}