"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/providers/LanguageProvider";

// Digits only, international format, no "+". Empty string disables the button
// (same convention as the footer's WhatsApp button) -- no number confirmed yet.
const WHATSAPP_NUMBER = "";
const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre os serviços da CAPICCI.";

const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6223.867279647234!2d-9.102092!3d38.742285!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19338c8ea3ba2b%3A0xf172cab9dad6d35d!2s8%20Marvila!5e0!3m2!1spt-PT!2spt!4v1789647558726!5m2!1spt-PT!2spt";

export default function ContactsPage() {
  const { t } = useLanguage();
  const whatsappHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : "#";
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
                <Button
                  href={whatsappHref}
                  label={t("footerWhatsapp")}
                  className={`contact-card-action${WHATSAPP_NUMBER ? "" : " contact-whatsapp--pending"}`}
                  aria-disabled={!WHATSAPP_NUMBER}
                  onClick={(event) => {
                    if (!WHATSAPP_NUMBER) event.preventDefault();
                  }}
                />
              </div>

              <div className="contact-card">
                <Copy splitType="words">
                  <h6 className="v2">Email</h6>
                </Copy>
                <p className="md">
                  geral@capicci.pt
                </p>
                <Button
                  href="mailto:geral@capicci.pt"
                  label={t("sendEmail")}
                  className="contact-card-action"
                />
              </div>

              <div className="contact-card">
                <Copy splitType="words">
                  <h6 className="v2">{t("otherLocation")}</h6>
                </Copy>
                <p className="md">Praça David Leandro da Silva, 1950-064 Lisboa</p>
              </div>

              {/* Sits in the grid so it fills the empty cells beside the last
                  card on desktop, where the layout resolves to three columns. */}
              <div className="contact-map">
                <iframe
                  src={MAPS_EMBED_SRC}
                  title="8 Marvila"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
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