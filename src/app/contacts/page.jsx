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
              <h1>Contacts</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-wrapper">
            <Copy splitType="words">
              <p className="lg">
                Get in touch with us to transform your event into a memorable experience. We are available to answer all your questions and help you plan the perfect day.
              </p>
            </Copy>

            <div className="contact-grid">
              <div className="contact-card">
                <Copy splitType="words">
                  <h6 className="v2">Address</h6>
                </Copy>
                <p className="md">
                  Rua Carlos Anjos, Centro Empresarial Rambola, Armazém R/C A, nº 1387-A, Amoreira, 2645-178 Alcabideche
                </p>
              </div>

              <div className="contact-card">
                <Copy splitType="words">
                  <h6 className="v2">Phone</h6>
                </Copy>
                <p className="md">
                  +351 919 402 836<br />
                  +351 967 144 450
                </p>
                <p className="xs">*Cost of a call to the national mobile network</p>
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
                  <h6 className="v2">Hours</h6>
                </Copy>
                <p className="md">
                  Monday to Friday: 9h00 - 18h00<br />
                  Saturday: 10h00 - 14h00
                </p>
              </div>
            </div>

            <div className="cta-section">
              <Button href="mailto:geral@capicci.pt" label="Send Email" />
            </div>

            <div className="contact-note">
              <Copy splitType="words">
                <p className="sm">
                  For events at warehouses 8 and 80, please contact us in advance to check date availability.
                </p>
              </Copy>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}