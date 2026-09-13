"use client";

import { useLanguage } from "@/providers/LanguageProvider";

export default function GalleryGrid({
  images,
  placeholderCount = 0,
  placeholderLabel = "Imagem de decoração",
  emptyMessage = "Sem imagens disponíveis.",
}) {
  const { t } = useLanguage();
  if (!images.length && !placeholderCount) {
    return <p className="gallery-empty">{t("emptyGallery")}</p>;
  }

  return (
    <div className="gallery-grid">
      {images.map((image, index) => (
        <div className="gallery-item" key={image}>
          <img src={image} alt={`${t("catalogImageAlt")} ${index + 1}`} />
        </div>
      ))}
      {!images.length &&
        Array.from({ length: placeholderCount }, (_, index) => (
          <div className="gallery-item gallery-placeholder" key={`placeholder-${index}`}>
            <span>{placeholderLabel} {index + 1}</span>
          </div>
        ))}
    </div>
  );
}
