"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";

export default function CateringPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>Catering</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-wrapper">
            <Copy splitType="words">
              <p className="lg">
                A gastronomia é, sem dúvida, uma das experiências mais marcantes de qualquer evento, sendo frequentemente um dos elementos mais apreciados pelos convidados por criar a verdadeira diferença.
              </p>
            </Copy>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Qualidade e Variedade</h6>
              </Copy>
              <p className="md">
                No nosso Catering, priorizamos a utilização de ingredientes frescos, locais, sazonais e de alta qualidade, assegurando opções que atendem a todos os gostos e necessidades alimentares, incluindo alternativas vegetarianas, veganas e sem glúten.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Flexibilidade</h6>
              </Copy>
              <p className="md">
                Com uma equipa experiente e dedicada, respondemos às mais recentes tendências gastronómicas. Oferecemos soluções para todos os tipos de eventos, desde casamentos e festas particulares a eventos corporativos, conferências e feiras profissionais. Cuidamos de toda a gastronomia, desde a conceção até ao serviço de mesa, ou simplesmente para desfrutar de momentos em família/amigos.
              </p>
            </div>

            <div className="cta-section">
              <Button href="/contacts" label="Solicitar Orçamento" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}