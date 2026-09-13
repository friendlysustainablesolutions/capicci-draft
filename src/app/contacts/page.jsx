"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/providers/LanguageProvider";

export default function ContactsPage() {
  const { t } = useLanguage();
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>{t("contactTitle")}</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-wrapper">
            <Copy splitType="words">
              <p className="lg">
                {t("contactLead")}
              </p>
            </Copy>

            <div className="contact-grid">
              <div className="contact-card">
                <Copy splitType="words">
                  <h6 className="v2">{t("address")}</h6>
                </Copy>
                <p className="md">
                  Rua Carlos Anjos, Centro Empresarial Rambola, Armazém R/C A, nº 1387-A, Amoreira, 2645-178 Alcabideche
                </p>
              </div>

              <div className="contact-card">
                <Copy splitType="words">
                  <h6 className="v2">{t("phone")}</h6>
                </Copy>
                <p className="md">
                  +351 919 402 836<br />
                  +351 967 144 450
                </p>
                <p className="xs">{t("mobileCost")}</p>
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
                  <h6 className="v2">{t("otherLocation")}</h6>
                </Copy>
                <p className="md">Praça David Leandro da Silva, 1950-064 Lisboa</p>
              </div>
            </div>

            <div className="cta-section">
              <Button href="mailto:geral@capicci.pt" label={t("sendEmail")} />
            </div>

            <div className="contact-note">
              <Copy splitType="words">
                <p className="sm">
                  {t("complaints")}
                </p>
              </Copy>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}