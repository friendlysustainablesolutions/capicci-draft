"use client";

import CatalogPage from "@/app/catalog/page";
import { useLanguage } from "@/providers/LanguageProvider";

const galleryImages = [
  "/images/galeria/galeria_1.jpg",
  "/images/galeria/galeria_2.jpg",
  "/images/galeria/galeria_3.jpg",
  "/images/galeria/galeria_4.jpg",
  "/images/galeria/galeria_5.jpg",
  "/images/galeria/galeria_6.jpg",
  "/images/galeria/galeria_7.jpg",
  "/images/galeria/galeria_8.jpg",
  "/images/galeria/galeria_9.jpg",
  "/images/galeria/galeria_10.jpg",
];

export default function GalleryPage() {
  const { t } = useLanguage();
  return (
    <CatalogPage
      images={galleryImages}
      eyebrow="CAPICCI - Events & Happiness"
      title={t("galleryTitle")}
    />
  );
}