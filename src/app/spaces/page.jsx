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
    title: "Aba da Serra",
    image: "/images/quinta-aba-da-serra.jpg",
    tags: ["Alenquer", { key: "rustic" }, { key: "guests150" }],
    location: "Sopé da Serra do Montejunto, Alenquer",
    yearKey: "equippedSpace",
  },
  {
    subtitle: "A Quinta",
    title: "do Campo",
    image: "/images/casamento_quinta_do_campo.jpg",
    tags: ["Coimbra", { key: "centennial" }, { key: "guests300" }],
    location: "Coimbra",
    yearKey: "greenSpaces",
  },
];

export default function SpacesPage() {
  return <ChroniclesPage items={spaces} titleHref="/contacts" counterPrefix="ESP" />;
}