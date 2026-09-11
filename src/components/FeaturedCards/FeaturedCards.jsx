"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "../Button/Button";
import Copy from "../Copy/Copy";

import "./FeaturedCards.css";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_FEATURED_CARDS_DATA = [
  {
    subtitle: "Lisboa",
    title: "8 Marvila",
    image: "/images/8-marvila.jpg",
  },
  {
    subtitle: "Alenquer",
    title: "Quinta Aba da Serra",
    image: "/images/quinta-aba-da-serra.jpg",
  },
  {
    subtitle: "Coimbra",
    title: "Quinta do Campo",
    image: "/images/casamento_quinta_do_campo.jpg",
  },
];

export default function FeaturedCards({
  cards = DEFAULT_FEATURED_CARDS_DATA,
  label = "[ ESPAÇOS ]",
  description = "Na CAPICCI – Events & Happiness, sabemos que o local do evento é uma das peças-chave para o seu sucesso, por isso, oferecemos uma seleção de espaços únicos, cada um com o seu próprio charme e características distintas.",
  buttonHref = "/spaces",
  buttonLabel = "Conheça os Nossos Espaços",
}) {
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

        featuredCardsTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${window.innerHeight * totalCards}px`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress * totalCards;

            cards.forEach((card, i) => {
              const cardProgress = gsap.utils.clamp(0, 1, progress - i);
              const nextCardProgress = gsap.utils.clamp(
                0,
                1,
                progress - (i + 1),
              );

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
          },
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
              <p className="mono">{label}</p>
            </Copy>

            <Copy splitType="words">
              <p className="v2">{description}</p>
            </Copy>

            <Copy variant="slide" delay={0.5}>
              <Button href={buttonHref}>{buttonLabel}</Button>
            </Copy>
          </div>

          <div
            className="featured-cards-container"
            ref={featuredCardsContainerRef}
          >
            {cards.map((card) => (
              <div className="featured-card" key={card.title}>
                <div className="featured-card-img">
                  <img src={card.image} alt="" />
                </div>
                <div className="featured-card-content">
                  <h6 className="subheader">{card.subtitle}</h6>
                  <h5>{card.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
