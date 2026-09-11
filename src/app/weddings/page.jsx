"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import TransmitPage from "@/app/transmit/page";

import "./weddings.css";

const weddingImages = [
  { src: "/images/weddings/casamento_1.jpg", alt: "Mesa de casamento junto ao mar" },
  { src: "/images/weddings/casamento_2.jpeg", alt: "Cerimónia de casamento na praia" },
  { src: "/images/weddings/casamento_3.jpg", alt: "Sala preparada para um casamento" },
  { src: "/images/weddings/casamento_4.jpeg", alt: "Mesa de apoio decorada" },
  { src: "/images/weddings/casamento_5.jpeg", alt: "Sala de casamento decorada" },
  { src: "/images/weddings/casamento_6.jpg", alt: "Jardim preparado para um casamento" },
  { src: "/images/weddings/casamento_7.jpeg", alt: "Mesa de casamento ao ar livre" },
  { src: "/images/weddings/casamento_8.jpeg", alt: "Celebração junto à piscina" },
  { src: "/images/weddings/casamento_9.jpeg", alt: "Decoração de casamento ao entardecer" },
  { src: "/images/weddings/casamento_10.jpeg", alt: "Mesa de casamento com vista" },
];

const weddingServiceCards = [
  {
    id: "transmit-card-1",
    image: "/images/weddings/casamento_11.jpeg",
    mobileImage: "/images/weddings/casamento_7.jpeg",
    split: "left",
    index: "01",
    label: "Catering",
    value: "Sabores e técnicas",
    label2: "Experiência",
    value2: "Menus clássicos e alternativas audazes",
  },
  {
    id: "transmit-card-2",
    image: "/images/weddings/casamento_11.jpeg",
    mobileImage: "/images/weddings/casamento_7.jpeg",
    split: "middle",
    index: "02",
    label: "Decoração e Aluguer",
    value: "Uma estética única",
    label2: "Personalização",
    value2: "Cada espaço com a vossa essência",
  },
  {
    id: "transmit-card-3",
    image: "/images/weddings/casamento_11.jpeg",
    mobileImage: "/images/weddings/casamento_7.jpeg",
    split: "right",
    index: "03",
    label: "O vosso dia",
    value: "Uma celebração única",
    label2: "Dedicação",
    value2: "Cada desejo tratado com atenção",
  },
];

export default function WeddingsPage() {
  return (
    <>
      <TransmitPage
        mode="weddings"
        className="weddings-flip-section"
        heading="Porque o vosso dia merece ser especial"
        cards={weddingServiceCards}
      />

      <section className="weddings-opening-copy">
        <div className="container">
          <Copy splitType="words">
            <p className="lg">
              O casamento é mais do que um evento, é o início de uma nova história. Na CAPICCI - Events & Happiness, sabemos o quão importante é cada detalhe; por isso, trabalhamos de perto consigo para que cada desejo seja cumprido. Afinal, este é um dia único e inesquecível, pelo que cada pormenor deve ser tratado com total dedicação.
            </p>
          </Copy>
        </div>
      </section>

      <section className="weddings-showcase">
        <div className="container">
          <div className="weddings-hero-image">
            <img src={weddingImages[0].src} alt={weddingImages[0].alt} />
            <div className="weddings-image-caption">
              <p className="mono sm">[ UM DIA ÚNICO ]</p>
              <p className="v2">Cada detalhe conta.</p>
            </div>
          </div>

          <div className="weddings-intro">
            <Copy splitType="words">
              <h3 className="v2">Criamos o cenário para a vossa história.</h3>
            </Copy>
            <p className="md">
              Do primeiro brinde à última dança, reunimos gastronomia, decoração e aluguer de material para que o espaço reflita a essência de cada casal.
            </p>
          </div>

          <div className="weddings-image-row">
            {weddingImages.slice(1, 4).map((image, index) => (
              <div className={`weddings-image-card weddings-image-card-${index + 1}`} key={image.src}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>

          <div className="weddings-story-grid">
            <div className="weddings-story-copy">
              <Copy splitType="words">
                <p className="mono">[ A NOSSA ABORDAGEM ]</p>
                <h4 className="v2">Uma celebração com a vossa medida.</h4>
              </Copy>
              <p className="md">
                Com uma experiência diversificada em sabores e técnicas, cada prato é preparado com uma dedicação que ultrapassa o simples ato de servir. A decoração e os materiais são escolhidos para criar uma atmosfera única e original.
              </p>
            </div>
            <div className="weddings-story-image">
              <img src={weddingImages[4].src} alt={weddingImages[4].alt} />
            </div>
          </div>

          <div className="weddings-mosaic">
            {weddingImages.slice(5).map((image) => (
              <div className="weddings-mosaic-item" key={image.src}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="weddings-final-cta">
        <Button href="/contacts" label="Começar a planear" />
      </div>
    </>
  );
}