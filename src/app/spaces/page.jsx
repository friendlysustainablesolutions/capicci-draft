"use client";

import ChroniclesPage from "@/app/chronicles/page";

const spaces = [
  {
    subtitle: "O 8",
    title: "Marvila",
    image: "/images/8-marvila.jpg",
    tags: ["Lisboa", "Industrial", "1000 m²"],
    location: "Marvila, Lisboa",
    year: "2 armazéns",
  },
  {
    subtitle: "A Quinta",
    title: "Aba da Serra",
    image: "/images/quinta-aba-da-serra.jpg",
    tags: ["Alenquer", "Rústico", "150 pessoas"],
    location: "Sopé da Serra do Montejunto, Alenquer",
    year: "Espaço equipado",
  },
  {
    subtitle: "A Quinta",
    title: "do Campo",
    image: "/images/casamento_quinta_do_campo.jpg",
    tags: ["Coimbra", "Centenária", "300 convidados"],
    location: "Coimbra",
    year: "Espaços verdes",
  },
];

export default function SpacesPage() {
  return <ChroniclesPage items={spaces} titleHref="/contacts" counterPrefix="ESP" />;
}