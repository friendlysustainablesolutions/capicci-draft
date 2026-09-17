"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import { LanguageProvider } from "./providers/LanguageProvider";
import TransitionProvider from "./providers/TransitionProvider";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = 1000;
const FOOTER_EXCLUDED_ROUTES = ["/catalog", "/chronicles"];

const LENIS_EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const LENIS_SHARED = {
  easing: LENIS_EASING,
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  infinite: false,
  wheelMultiplier: 1,
  orientation: "vertical",
  smoothWheel: true,
  syncTouch: true,
};

const LENIS_MOBILE = {
  ...LENIS_SHARED,
  duration: 0.8,
  smoothTouch: true,
  touchMultiplier: 1.5,
  lerp: 0.09,
};

const LENIS_DESKTOP = {
  ...LENIS_SHARED,
  duration: 1.2,
  smoothTouch: false,
  touchMultiplier: 2,
  lerp: 0.1,
};

// Lenis performs the actual scrolling, so ScrollTrigger has to be told when
// that happens -- otherwise pinned sections (Showreel, FeaturedCards) measure
// against a scroll position they never see updated, and a refresh can leave
// the page somewhere unexpected. Rendered inside ReactLenis so useLenis()
// re-runs this whenever the instance is recreated (e.g. the mobile/desktop
// option switch).
function LenisScrollTriggerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => lenis.off("scroll", ScrollTrigger.update);
  }, [lenis]);

  return null;
}

export default function ClientLayout({ children }) {
  const pageRef = useRef(null);
  const pageWrapperRef = useRef(null);
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lenisOptions = isMobile ? LENIS_MOBILE : LENIS_DESKTOP;
  const showFooter = !FOOTER_EXCLUDED_ROUTES.includes(pathname);

  return (
    <LanguageProvider>
      <TransitionProvider>
        <ReactLenis root options={lenisOptions}>
          <LenisScrollTriggerSync />
          <div className="page" ref={pageRef}>
            <Menu />
            <LanguageSelector />
            <CookieConsent />
            <div className="page-wrapper" ref={pageWrapperRef}>
              {children}
              {showFooter && <Footer />}
            </div>
          </div>
        </ReactLenis>
      </TransitionProvider>
    </LanguageProvider>
  );
}
