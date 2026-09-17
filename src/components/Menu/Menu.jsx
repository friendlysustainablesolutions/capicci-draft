"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/providers/LanguageProvider";

import "./Menu.css";

gsap.registerPlugin(useGSAP);

const MENU_PRIMARY_LINKS = [
  { href: "/about", label: "about" },
  { href: "/catering", label: "catering" },
  { href: "/events", label: "events" },
  { href: "/weddings", label: "weddings" },
  { href: "/decoration", label: "decoration" },
  { href: "/gallery", label: "gallery" },
  { href: "/spaces", label: "spaces" },
  { href: "/contacts", label: "contacts" },
];

const MENU_SOCIAL_ICONS = [
  { href: "#", label: "Instagram", icon: "/images/icons/instagram.png" },
  { href: "#", label: "Facebook", icon: "/images/icons/facebook.png" },
];

function MenuLineLink({ href, label, className = "", onClick }) {
  return (
    <Link href={href} className={className} onClick={onClick}>
      <span className="menu-line-mask">
        <span className="menu-line">{label}</span>
      </span>
    </Link>
  );
}

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const menuOpenTlRef = useRef(null);
  const menuCloseTlRef = useRef(null);
  const lenis = useLenis();
  const pathname = usePathname();
  const { t } = useLanguage();

  useGSAP(
    () => {
      gsap.set(".menu-panel", {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
        pointerEvents: "none",
        visibility: "hidden",
      });
      gsap.set(".menu-toggle-word", { yPercent: 0 });
      gsap.set(".menu-close-word", { yPercent: 100 });
      gsap.set(".menu-line", { yPercent: 100 });

      menuOpenTlRef.current = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .set(".menu-panel", { visibility: "visible", pointerEvents: "none" }, 0)
        .to(".menu-toggle-word", { yPercent: -100, duration: 0.5 }, 0)
        .to(".menu-close-word", { yPercent: 0, duration: 0.5 }, 0)
        .to(
          ".menu-panel",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.7,
          },
          0,
        )
        .set(".menu-panel", { pointerEvents: "all" }, 0.7)
        .to(".menu-line", { yPercent: 0, duration: 0.65, stagger: 0.04 }, 0.1);

      menuCloseTlRef.current = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .set(".menu-panel", { pointerEvents: "none" }, 0)
        .to(".menu-toggle-word", { yPercent: 0, duration: 0.6 }, 0)
        .to(".menu-close-word", { yPercent: 100, duration: 0.6 }, 0)
        .to(
          ".menu-panel",
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
            duration: 0.65,
          },
          0.06,
        )
        .set(".menu-panel", { visibility: "hidden" }, 0.71)
        .set(".menu-line", { yPercent: 100 }, 0.75);
    },
    { scope: menuRef },
  );

  useEffect(() => {
    if (!isOpen) return;

    menuOpenTlRef.current?.pause();
    menuCloseTlRef.current?.pause(0);

    gsap.set(".menu-panel", {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
      pointerEvents: "none",
      visibility: "hidden",
    });
    gsap.set(".menu-toggle-word", { yPercent: 0 });
    gsap.set(".menu-close-word", { yPercent: 100 });
    gsap.set(".menu-line", { yPercent: 100 });

    lenis?.start();
    setIsOpen(false);
  }, [pathname]);

  const handleClose = () => {
    if (isOpen) {
      lenis?.start();
      menuOpenTlRef.current?.pause();
      menuCloseTlRef.current?.play(0);
      setIsOpen(false);
    }
  };

  const handleLinkClick = (href) => {
    if (href === pathname) {
      handleClose();
    }
  };

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;

      if (next) {
        lenis?.stop();
        menuCloseTlRef.current?.pause(0);
        gsap.set(".menu-line", { yPercent: 100 });
        menuOpenTlRef.current?.play(0);
      } else {
        lenis?.start();
        menuOpenTlRef.current?.pause();
        menuCloseTlRef.current?.play(0);
      }

      return next;
    });
  };

  return (
    <div className="menu-container">
      <div className="menu" ref={menuRef}>
        <div className="menu-rail">
          <div className="menu-box menu-rail-box">
            <Link
              href="/"
              className="menu-logo"
              onClick={() => handleLinkClick("/")}
            >
              <img src="/images/logo nobg capici.png" alt={t("home")} />
            </Link>

            <button
              type="button"
              className="menu-toggle"
              onClick={handleToggle}
              aria-expanded={isOpen}
              aria-controls="main-menu-panel"
            >
              <span className="menu-toggle-mask">
                <p className="mono sm menu-toggle-word">{t("menu")}</p>
                <p className="mono sm menu-close-word">{t("close")}</p>
              </span>
            </button>
          </div>
        </div>

        <aside id="main-menu-panel" className="menu-panel">
          <div className="menu-panel-top">
            <p className="mono sm">CAPICCI – Events & Happiness</p>
          </div>

          <nav className="menu-panel-nav" aria-label={t("navPages")}>
            {MENU_PRIMARY_LINKS.map((link) => (
              <MenuLineLink
                key={link.href}
                href={link.href}
                label={t(link.label)}
                className="menu-link menu-link-main"
                onClick={() => handleLinkClick(link.href)}
              />
            ))}
          </nav>

          <div className="menu-panel-footer">
            <div className="menu-panel-footer-col menu-panel-socials">
              {MENU_SOCIAL_ICONS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="menu-social-icon"
                  aria-label={social.label}
                  onClick={() => handleLinkClick(social.href)}
                >
                  {/* Same mask/line structure as the text links so these ride
                      the existing staggered reveal. */}
                  <span className="menu-line-mask">
                    <span className="menu-line">
                      <img src={social.icon} alt="" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>

            <div className="menu-panel-footer-col menu-panel-contact">
              <MenuLineLink
                href="/contacts"
                label={t("contactHeading")}
                className="menu-link menu-link-footer"
                onClick={() => handleLinkClick("/contacts")}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
