"use client";

import ChroniclesPage from "@/app/chronicles/page";

const spaces = [
  {
    subtitle: "O 8",
    title: "Marvila",
    image: "/images/8-marvila.jpg",
    tags: ["Lisboa", { key: "industrial" }, "1000 m²"],
    location: "Marvila, Lisboa",
    yearKey: "twoWarehouses",
  },
  {
    subtitle: "A Quinta",
    title: "do Campo",
    image: "/images/quinta-do-campo/hero-golden-hour.jpg",
    tags: ["Coimbra", { key: "centennial" }, { key: "guests300" }],
    location: "Coimbra",
    yearKey: "greenSpaces",
  },
];

export default function SpacesPage() {
  return <ChroniclesPage items={spaces} titleHref="/contacts" counterPrefix="ESP" />;
}