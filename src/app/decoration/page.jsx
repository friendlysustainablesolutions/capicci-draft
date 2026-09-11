"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";

export default function DecorationPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>Decoração e Aluguer</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-wrapper">
            <Copy splitType="words">
              <p className="lg">
                Alugamos o nosso material de forma integrada ou independente, desde loiças a mobiliário e equipamento, possibilitando ao cliente encontrar a melhor solução para o seu evento, de acordo com as suas necessidades e preferências.
              </p>
            </Copy>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Estética Única</h6>
              </Copy>
              <p className="md">
                Apostamos numa decoração original, adquirida continuamente ao longo de vários anos, o que permite transformar o seu evento numa atmosfera única, com soluções personalizadas e que refletem a sua visão.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Sustentabilidade</h6>
              </Copy>
              <p className="md">
                A reutilização criativa destes materiais, aplicando-os a novos conceitos e ambientes, não só permite prolongar a vida útil das peças, como confere uma componente de sustentabilidade ao reduzir o impacto ambiental do cliente.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Categorias de Material Disponível</h6>
              </Copy>
              <p className="md">
                Loiças | Toalhas | Mesas e Cadeiras | Peças de Decoração/Luzes | Talheres
              </p>
            </div>

            <div className="cta-section">
              <Button href="/contacts" label="Pedir informações" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}