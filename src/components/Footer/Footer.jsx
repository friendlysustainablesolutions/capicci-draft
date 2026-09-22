"use client";

import { useRef } from "react";
import Link from "next/link";
import Button from "../Button/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/providers/LanguageProvider";

import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_ARC_TEXT = "CAPICCI – EVENTS & HAPPINESS · ";
const FOOTER_ARC_REPEAT = 14;
const FOOTER_ARC_PATH =
  "M 0,280 C 300,280 450,40 700,40 C 950,40 1100,280 1400,280";

const FOOTER_NAV_LEFT = [
  { label: "about", href: "/about" },
  { label: "catering", href: "/catering" },
  { label: "events", href: "/events" },
  { label: "weddings", href: "/weddings" },
];

const FOOTER_NAV_RIGHT = [
  { label: "decoration", href: "/decoration" },
  { label: "gallery", href: "/gallery" },
  { label: "spaces", href: "/spaces" },
  { label: "contacts", href: "/contacts" },
];

const FOOTER_SOCIALS = ["Instagram", "LinkedIn"];
// Digits only, international format, no "+", "00" or spaces -- the format
// tel: hrefs expect.
const PHONE_NUMBER = "351919402836";

export default function Footer() {
  const footerRef = useRef(null);
  const footerArcRef = useRef(null);
  const footerTextPathRef = useRef(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      const footerArc = footerArcRef.current;
      const footerTextPath = footerTextPathRef.current;
      if (!footerArc || !footerTextPath) return;

      let footerTrigger;

      function setup() {
        cleanup();

        gsap.set(footerArc, { clearProps: "all" });
        footerTextPath.setAttribute("startOffset", "-30%");

        footerTrigger = ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: -1,
          onUpdate: (self) => {
            const footerOffset = -30 + self.progress * 60;
            footerTextPath.setAttribute("startOffset", `${footerOffset}%`);
          },
        });
      }

      function cleanup() {
        footerTrigger?.kill();
        footerTrigger = null;
      }

      setup();

      let footerResizeTimer;
      const handleFooterResize = () => {
        clearTimeout(footerResizeTimer);
        footerResizeTimer = setTimeout(setup, 250);
      };

      window.addEventListener("resize", handleFooterResize);

      return () => {
        cleanup();
        clearTimeout(footerResizeTimer);
        window.removeEventListener("resize", handleFooterResize);
      };
    },
    { scope: footerRef },
  );

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-wrapper">
        <div className="footer-arc" ref={footerArcRef}>
          <svg
            viewBox="0 0 1400 300"
            xmlns="http://www.w3.org/2000/svg"
            className="footer-arc-svg"
          >
            <defs>
              <path id="footer-arc-path" d={FOOTER_ARC_PATH} fill="none" />
            </defs>
            <text className="footer-arc-text">
              <textPath
                ref={footerTextPathRef}
                href="#footer-arc-path"
                startOffset="0%"
              >
                {FOOTER_ARC_TEXT.repeat(FOOTER_ARC_REPEAT)}
              </textPath>
            </text>
          </svg>
        </div>

        <div className="footer-content">
          <div className="footer-center">
            <div className="footer-brand">
              <img className="footer-logo" src="/images/footer%20logo.png" alt="CAPICCI - Events & Happiness" />
            </div>

            <div className="footer-info">
              <p className="sm">Rua Carlos Anjos, Centro Empresarial Rambola, Armazém R/C A, nº 1387-A, Amoreira, 2645-178 Alcabideche</p>
              <p className="sm">+351 919 402 836* | +351 967 144 450* | geral@capicci.pt</p>
              <p className="xs">{t("footerMobile")}</p>
              <Button href={`tel:+${PHONE_NUMBER}`} className="footer-call">
                {t("callUs")}
              </Button>
            </div>
          </div>

          <div className="footer-nav-row">
            <div className="footer-nav footer-nav-left">
              {FOOTER_NAV_LEFT.map(({ label, href }) => (
                <Link href={href} key={label} className="footer-nav-link">
                  <p className="mono sm">{t(label)}</p>
                </Link>
              ))}
            </div>

            <div className="footer-nav footer-nav-right">
              {FOOTER_NAV_RIGHT.map(({ label, href }) => (
                <Link href={href} key={label} className="footer-nav-link">
                  <p className="mono sm">{t(label)}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-contact">
            <div className="footer-socials">
              {FOOTER_SOCIALS.map((name) => (
                <Link href="#" key={name} className="footer-social-link">
                  <p className="mono sm">{name}</p>
                </Link>
              ))}
            </div>
            <p className="sm" id="footer-contact-email">
              geral@capicci.pt
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="sm">{t("footerRights")}</p>
        </div>
      </div>
    </footer>
  );
}
