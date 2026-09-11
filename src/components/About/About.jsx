"use client";

import Copy from "../Copy/Copy";
import FieldReportPage from "@/app/report/page";
import Button from "../Button/Button";

import "./About.css";

const serviceImages = [
  {
    src: "/images/services/services_catering.jpg",
    compassRotation: 0,
  },
  {
    src: "/images/services/services_decoration.jpg",
    compassRotation: 120,
  },
  {
    src: "/images/services/services_graphic_design.jpg",
    compassRotation: 240,
  }
];

const serviceDataBlocks = [
  [
    { label: "Catering", value: "Gastronomia versátil", position: "top-left" },
    { label: "Ementas", value: "Tradicionais e alternativas", position: "bottom-right" },
  ],
  [
    { label: "Decoração", value: "Ambientes únicos", position: "top-right" },
    { label: "Aluguer", value: "Loiças, mobiliário e equipamento", position: "bottom-left" },
  ],
  [
    { label: "Design Gráfico", value: "Uma identidade com essência", position: "top-left" },
    { label: "Propostas", value: "Convites e brochuras", position: "bottom-right" },
  ],
];

export default function About({ showIntro = true }) {
  return (
    <section className="about">
      <div className="container">
        <div className="about-wrapper">
          {showIntro && (
            <div className="about-intro">
            <Copy variant="flicker">
              <p className="mono about-label">[ SOBRE ]</p>
            </Copy>

            <Copy splitType="words">
              <h5 className="v2 about-title">
                A CAPICCI - Events & Happiness é uma jovem empresa de eventos que surge com uma imagem renovada, mas sustentada por uma equipa de profissionais com mais de 25 anos de experiência no setor de eventos.
              </h5>
            </Copy>
            </div>
          )}

          <div className="about-services-intro">
            <Copy variant="flicker">
              <p className="mono about-services-label">[ COMO TRABALHAMOS ]</p>
            </Copy>
            <Copy splitType="words">
              <h3 className="v2 about-services-title">Soluções completas para momentos com significado.</h3>
            </Copy>
            <p className="lg about-services-copy">
              O nosso profundo conhecimento do mercado, aliado a uma sólida rede de parceiros e fornecedores de confiança fomentada ao longo de décadas de projetos em conjunto, garante a capacidade de compreender e concretizar o seu evento, seja este corporativo ou particular.
            </p>
          </div>

          <div className="about-services-report">
            <FieldReportPage
              mode="services"
              visualImages={serviceImages}
              visualDataBlocks={serviceDataBlocks}
            />
          </div>

          <div className="about-footer">
            <Copy variant="flicker">
              <p className="mono about-footer-label">[ MARVILA / O 8 ]</p>
            </Copy>
            <Copy splitType="words">
              <h4 className="v2 about-footer-title">Um espaço para acontecer.</h4>
            </Copy>
            <p className="lg about-footer-copy">
              Somos também responsáveis pela gestão de eventos nos armazéns 8 e 8.0 de Marvila, onde o nosso catering é exclusivo.
            </p>
            <Button href="/spaces">Conheça o 8 Marvila</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
