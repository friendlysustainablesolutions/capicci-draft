"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "../Button/Button";
import Copy from "../Copy/Copy";
import { useLanguage } from "@/providers/LanguageProvider";

import "./FeaturedCards.css";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_FEATURED_CARDS_DATA = [
  {
    subtitle: "Lisboa",
    title: "8 Marvila",
    image: "/images/8-marvila.jpg",
  },
  {
    subtitle: "Coimbra",
    title: "Quinta do Campo",
    image: "/images/quinta-do-campo/hero-golden-hour.jpg",
  },
];

export default function FeaturedCards({
  cards = DEFAULT_FEATURED_CARDS_DATA,
  label = "[ ESPAÇOS ]",
  description = "Na CAPICCI – Events & Happiness, sabemos que o local do evento é uma das peças-chave para o seu sucesso, por isso, oferecemos uma seleção de espaços únicos, cada um com o seu próprio charme e características distintas.",
  buttonHref = "/spaces",
  buttonLabel = "Conheça os Nossos Espaços",
}) {
  const { t } = useLanguage();
  const featuredCardsRef = useRef(null);
  const featuredCardsContainerRef = useRef(null);

  useGSAP(
    () => {
      const section = featuredCardsRef.current;
      const cards =
        featuredCardsContainerRef.current?.querySelectorAll(".featured-card");

      if (!section || !cards?.length) return;

      let featuredCardsTrigger;

      function setup() {
        cleanup();

        cards.forEach((card) => gsap.set(card, { clearProps: "all" }));

        if (window.innerWidth < 1000) return;

        const totalCards = cards.length;
        // The first card is already resting in place when the section arrives;
        // scrolling only brings in the ones after it. That's one transition
        // fewer than there are cards, so the pin is a viewport shorter and the
        // timeline starts one card in.
        const scrolledCards = Math.max(1, totalCards - 1);

        const applyProgress = (scrollProgress) => {
          const progress = scrollProgress * scrolledCards + 1;

          cards.forEach((card, i) => {
            const cardProgress = gsap.utils.clamp(0, 1, progress - i);
            const nextCardProgress = gsap.utils.clamp(0, 1, progress - (i + 1));

            gsap.set(card, {
              y: gsap.utils.interpolate("200%", "-50%", cardProgress),
              scale: gsap.utils.interpolate(1, 0.85, nextCardProgress),
              "--overlay-opacity": gsap.utils.interpolate(
                0,
                1,
                nextCardProgress * 0.5,
              ),
            });
          });
        };

        applyProgress(0);

        featuredCardsTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${window.innerHeight * scrolledCards}px`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          onUpdate: (self) => applyProgress(self.progress),
        });
      }

      function cleanup() {
        featuredCardsTrigger?.kill();
        featuredCardsTrigger = null;
      }

      setup();

      let featuredCardsResizeTimer;
      const handleFeaturedCardsResize = () => {
        clearTimeout(featuredCardsResizeTimer);
        featuredCardsResizeTimer = setTimeout(setup, 250);
      };

      window.addEventListener("resize", handleFeaturedCardsResize);

      return () => {
        cleanup();
        clearTimeout(featuredCardsResizeTimer);
        window.removeEventListener("resize", handleFeaturedCardsResize);
      };
    },
    { scope: featuredCardsRef },
  );

  return (
    <section className="featured-cards" ref={featuredCardsRef}>
      <div className="container">
        <div className="featured-cards-wrapper">
          <div className="featured-cards-header">
            <Copy variant="flicker">
              <p className="mono">{t("spacesLabel")}</p>
            </Copy>

            <Copy splitType="words">
              <p className="v2">{t("spacesDescription")}</p>
            </Copy>

            <Copy variant="slide" delay={0.5}>
              <Button href={buttonHref}>{t("spacesButton")}</Button>
            </Copy>
          </div>

          <div
            className="featured-cards-container"
            ref={featuredCardsContainerRef}
          >
            {cards.map((card) => (
              <div className="featured-card" key={card.title}>
                <div className="featured-card-img">
                  <img src={card.image} alt={`${card.subtitle} - ${card.title}`} />
                </div>
                <div className="featured-card-content">
                  <h6 className="subheader">{card.subtitle}</h6>
                  <h5>{card.title}</h5>
                </div>

                {/* Mobile only: on desktop the section CTA sits alongside the
                    cards, but that column is stacked out of view on mobile. */}
                <div className="featured-card-cta">
                  <Button href={card.href ?? buttonHref}>{t("spacesButton")}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
