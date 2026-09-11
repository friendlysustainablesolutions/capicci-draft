"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";

export default function ContactsPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>Contactos</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-wrapper">
            <Copy splitType="words">
              <p className="lg">
                Entre em contacto connosco para saber mais sobre os nossos serviços e espaços.
              </p>
            </Copy>

            <div className="contact-grid">
              <div className="contact-card">
                <Copy splitType="words">
                  <h6 className="v2">Morada</h6>
                </Copy>
                <p className="md">
                  Rua Carlos Anjos, Centro Empresarial Rambola, Armazém R/C A, nº 1387-A, Amoreira, 2645-178 Alcabideche
                </p>
              </div>

              <div className="contact-card">
                <Copy splitType="words">
                  <h6 className="v2">Contactos Telefónicos</h6>
                </Copy>
                <p className="md">
                  +351 919 402 836<br />
                  +351 967 144 450
                </p>
                <p className="xs">*Custo de uma chamada para a rede móvel nacional</p>
              </div>

              <div className="contact-card">
                <Copy splitType="words">
                  <h6 className="v2">Email</h6>
                </Copy>
                <p className="md">
                  geral@capicci.pt
                </p>
              </div>

              <div className="contact-card">
                <Copy splitType="words">
                  <h6 className="v2">Outra Localização Registada</h6>
                </Copy>
                <p className="md">Praça David Leandro da Silva, 1950-064 Lisboa</p>
              </div>
            </div>

            <div className="cta-section">
              <Button href="mailto:geral@capicci.pt" label="Enviar Email" />
            </div>

            <div className="contact-note">
              <Copy splitType="words">
                <p className="sm">
                  Livro de Reclamações | Gerir o consentimento
                </p>
              </Copy>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}