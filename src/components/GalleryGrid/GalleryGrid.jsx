"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";

import "./GalleryGrid.css";

export default function GalleryGrid({
  images = [],
  placeholderCount = 0,
  placeholderLabel = "Imagem de decoração",
  emptyMessage = "Sem imagens disponíveis.",
}) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta) =>
      setOpenIndex((current) =>
        current === null
          ? current
          : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, close, step]);

  if (!images.length && !placeholderCount) {
    return <p className="gallery-empty">{t("emptyGallery") || emptyMessage}</p>;
  }

  const labelFor = (item, index) =>
    typeof item === "object" && item?.displayName
      ? item.displayName
      : `${placeholderLabel} ${index + 1}`;
  const srcFor = (item) => (typeof item === "string" ? item : item.src);

  const openItem = openIndex === null ? null : images[openIndex];

  return (
    <>
      <div className="gallery-grid">
        {images.map((item, index) => {
          const imageSrc = srcFor(item);
          const label = labelFor(item, index);

          return (
            <button
              type="button"
              className="gallery-item"
              key={imageSrc || index}
              onClick={() => setOpenIndex(index)}
              aria-label={label}
            >
              <div className="image-wrapper">
                <img src={imageSrc} alt={label} loading="lazy" />
              </div>
              <span className="image-label">{label}</span>
            </button>
          );
        })}
      </div>

      {openItem && (
        <div className="gallery-lightbox" onClick={close} role="dialog" aria-modal="true">
          <div
            className="gallery-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={close}
              aria-label="Close"
            >
              ✕
            </button>

            {images.length > 1 && (
              <button
                type="button"
                className="gallery-lightbox-nav prev"
                onClick={() => step(-1)}
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            <figure className="gallery-lightbox-figure">
              <img
                src={srcFor(openItem)}
                alt={labelFor(openItem, openIndex)}
                className="gallery-lightbox-image"
              />
              <figcaption className="gallery-lightbox-caption">
                {labelFor(openItem, openIndex)}
                {images.length > 1 && (
                  <span className="gallery-lightbox-count">
                    {openIndex + 1} / {images.length}
                  </span>
                )}
              </figcaption>
            </figure>

            {images.length > 1 && (
              <button
                type="button"
                className="gallery-lightbox-nav next"
                onClick={() => step(1)}
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
