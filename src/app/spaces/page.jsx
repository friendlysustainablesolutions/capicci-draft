"use client";

import ChroniclesPage from "@/app/chronicles/page";

const spaces = [
  {
    subtitle: "O 8",
    title: "Marvila",
    image: "/images/8-marvila.jpg",
    // No further photography exists for this space yet -- see the Flow
    // prompts handed over at the end of the session that added this.
    images: [],
    descriptionKey: "spaceMarvilaDescription",
    tags: ["Lisboa", { key: "industrial" }, "1000 m²"],
    location: "Marvila, Lisboa",
    yearKey: "twoWarehouses",
  },
  {
    subtitle: "A Quinta",
    title: "do Campo",
    image: "/images/quinta-do-campo/hero-golden-hour.jpg",
    images: [
      "/images/quinta-do-campo/long-table-avenue.jpg",
      "/images/quinta-do-campo/table-under-tree.jpg",
      "/images/quinta-do-campo/garden-ceremony-chairs.jpg",
      "/images/quinta-do-campo/ivy-window.jpg",
      "/images/quinta-do-campo/poolside.jpg",
    ],
    descriptionKey: "spaceQuintaCampoDescription",
    tags: ["Coimbra", { key: "centennial" }, { key: "guests300" }],
    location: "Coimbra",
    yearKey: "greenSpaces",
  },
];

export default function SpacesPage() {
  return <ChroniclesPage items={spaces} titleHref="/contacts" counterPrefix="ESP" />;
}