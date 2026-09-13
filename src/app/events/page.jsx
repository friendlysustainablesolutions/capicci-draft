"use client";

import { useRef, useState } from "react";
import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/providers/LanguageProvider";

import "./events.css";

const eventImages = [
  { src: "/images/events/events_1.jpg", alt: "Evento CAPICCI" },
  { src: "/images/events/events_2.jpg", alt: "Experiência de evento CAPICCI" },
  { src: "/images/events/events_3.jpg", alt: "Produção de evento CAPICCI" },
  { src: "/images/events/events_4.jpg", alt: "Ambiente de evento CAPICCI" },
  { src: "/images/events/events_6.jpg", alt: "Celebração CAPICCI" },
  { src: "/images/events/events_7.jpg", alt: "Montagem de evento CAPICCI" },
  { src: "/images/events/events_8.jpg", alt: "Evento corporativo CAPICCI" },
  { src: "/images/events/events_9.jpg", alt: "Evento particular CAPICCI" },
];

export default function EventsPage() {
  const { t } = useLanguage();
  const [isVideoTwoMuted, setIsVideoTwoMuted] = useState(true);
  const eventsHeroRef = useRef(null);
  const eventsHeroVideoRef = useRef(null);
  const eventsHeroHeaderRef = useRef(null);

  useLenis((lenis) => {
    const video = eventsHeroVideoRef.current;
    const header = eventsHeroHeaderRef.current;
    const hero = eventsHeroRef.current;
    if (!video || !header || !hero) return;

    const isMobile = window.innerWidth <= 700;
    const heroDistance = window.innerHeight * 2.15;
    const startWidth = window.innerWidth;
    const targetWidth = isMobile
      ? window.innerWidth - 24
      : Math.min(window.innerWidth - 24, 960);
    const startHeight = window.innerHeight;
    const targetHeight = isMobile
      ? window.innerWidth * 0.52
      : Math.max(700, Math.min(window.innerHeight * 0.86, 820));
    const localScroll = Math.max(0, -hero.getBoundingClientRect().top);
    const progress = Math.max(0, Math.min(1, localScroll / heroDistance));
    const videoProgress = Math.max(0, Math.min(1, (progress - 0.3) / 0.48));
    const revealProgress = Math.max(0, Math.min(1, (videoProgress - 0.08) / 0.55));

    video.style.width = `${startWidth + (targetWidth - startWidth) * videoProgress}px`;
    video.style.height = `${startHeight + (targetHeight - startHeight) * videoProgress}px`;
    video.style.borderRadius = `${12 * videoProgress}px`;
    video.style.transform = `translateY(${window.innerHeight * 0.34 * videoProgress}px)`;
    header.style.transform = `translateY(${(isMobile ? 18 : 28) * (1 - revealProgress)}px)`;
    header.style.opacity = `${revealProgress}`;
  });

  return (
    <>
      <section className="events-hero" ref={eventsHeroRef}>
        <div className="events-hero-header" ref={eventsHeroHeaderRef}>
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>{t("eventTitle")}</h1>
            </Copy>
          </div>
        </div>
        <div className="events-hero-video-wrap" ref={eventsHeroVideoRef}>
          <video autoPlay muted loop playsInline preload="metadata">
            <source src="/images/events/events_video.mp4" type="video/mp4" />
          </video>
          <div className="events-video-caption">
            <p className="mono sm">{t("eventCaptionLabel")}</p>
            <p className="v2">{t("eventsCaption")}</p>
          </div>
        </div>
      </section>

      <section className="events-showcase">
        <div className="container">

          <div className="events-intro">
            <Copy splitType="words">
              <h3 className="v2">{t("eventIntroTitle")}</h3>
            </Copy>
            <p className="md">
              {t("eventIntro")}
            </p>
          </div>

          <div className="events-secondary-video">
            <div className="events-secondary-video-media">
              <video autoPlay muted={isVideoTwoMuted} loop playsInline preload="metadata">
                <source src="/images/events/events_video_2.mp4" type="video/mp4" />
              </video>
              <button
                type="button"
                className="events-video-sound-button"
                onClick={() => setIsVideoTwoMuted((isMuted) => !isMuted)}
                aria-label={isVideoTwoMuted ? t("soundOn") : t("soundOff")}
                aria-pressed={!isVideoTwoMuted}
              >
                {isVideoTwoMuted ? t("soundOn") : t("soundOff")}
              </button>
            </div>
            <div className="events-secondary-video-copy">
              <Copy splitType="words">
                <p className="mono">{t("production")}</p>
                <h4 className="v2">{t("productionTitle")}</h4>
              </Copy>
              <p className="md">
                {t("productionCopy")}
              </p>
            </div>
          </div>

          <div className="events-image-row">
            {eventImages.slice(0, 3).map((image, index) => (
              <div className={`events-image-card events-image-card-${index + 1}`} key={image.src}>
                <img src={image.src} alt={t("imageAlt")} />
              </div>
            ))}
          </div>

          <div className="events-story-grid">
            <div className="events-story-image">
              <img src={eventImages[3].src} alt={t("imageAlt")} />
            </div>
            <div className="events-story-copy">
              <Copy splitType="words">
                <p className="mono">{t("unique")}</p>
                <h4 className="v2">{t("scaleTitle")}</h4>
              </Copy>
              <p className="md">
                {t("scaleCopy")}
              </p>
            </div>
          </div>

          <div className="events-mosaic">
            {eventImages.slice(4).map((image) => (
              <div className="events-mosaic-item" key={image.src}>
                <img src={image.src} alt={t("imageAlt")} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-wrapper">
            <Copy splitType="words">
              <p className="lg">
                {t("eventLead")}
              </p>
            </Copy>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">{t("reach")}</h6>
              </Copy>
              <p className="md">
                {t("reachCopy")}
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">{t("logistics")}</h6>
              </Copy>
              <p className="md">
                {t("logisticsCopy")}
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">{t("applications")}</h6>
              </Copy>
              <p className="md">
                {t("applicationsCopy")}
              </p>
            </div>

            <div className="cta-section">
              <Button href="/contacts" label={t("planEvent")} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}