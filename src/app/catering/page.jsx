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
                O nosso catering é versátil e alinhado com as mais recentes tendências gastronómicas. As nossas ementas combinam confiança com qualidade e podem ser adaptadas aos seus gostos e necessidades, sejam estas tradicionais ou alternativas, vegetarianas, veganas e/ou sem glúten.
              </p>
            </Copy>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">O Nosso Serviço</h6>
              </Copy>
              <p className="md">
                Com mais de 25 anos de experiência no setor de eventos, a nossa equipa garante um serviço de catering de excelência, desde eventos corporativos a celebrações privadas. Trabalhamos com ingredientes frescos e de qualidade, sempre com o objetivo de superar as expectativas dos nossos clientes.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Ementas Personalizadas</h6>
              </Copy>
              <p className="md">
                Desenvolvemos ementas personalizadas para cada evento, tendo em conta as preferências dos nossos clientes, restrições alimentares e o tipo de celebração. Desde coffee breaks a jantares de gala, temos a solução ideal para o seu evento.
              </p>
            </div>

            <div className="cta-section">
              <Button href="/contactos" label="Solicitar Orçamento" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}