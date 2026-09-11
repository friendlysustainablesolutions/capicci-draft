"use client";

import { useState } from "react";
import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";

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
  const [isVideoTwoMuted, setIsVideoTwoMuted] = useState(true);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>Eventos</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="events-showcase">
        <div className="container">
          <div className="events-video-wrap">
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/images/events/events_video.mp4" type="video/mp4" />
            </video>
            <div className="events-video-caption">
              <p className="mono sm">[ EVENTOS CAPICCI ]</p>
              <p className="v2">Pensados ao detalhe.</p>
            </div>
          </div>

          <div className="events-intro">
            <Copy splitType="words">
              <h3 className="v2">Do conceito à concretização.</h3>
            </Copy>
            <p className="md">
              Cada projeto é uma oportunidade de criar algo extraordinário, com planeamento, produção, decoração, catering e logística integrados.
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
                aria-label={isVideoTwoMuted ? "Ligar som do vídeo" : "Desligar som do vídeo"}
                aria-pressed={!isVideoTwoMuted}
              >
                {isVideoTwoMuted ? "Ligar som" : "Desligar som"}
              </button>
            </div>
            <div className="events-secondary-video-copy">
              <Copy splitType="words">
                <p className="mono">[ PRODUÇÃO ]</p>
                <h4 className="v2">A energia acontece no terreno.</h4>
              </Copy>
              <p className="md">
                Uma equipa experiente acompanha cada momento para que a experiência final seja fluida, envolvente e memorável.
              </p>
            </div>
          </div>

          <div className="events-image-row">
            {eventImages.slice(0, 3).map((image, index) => (
              <div className={`events-image-card events-image-card-${index + 1}`} key={image.src}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>

          <div className="events-story-grid">
            <div className="events-story-image">
              <img src={eventImages[3].src} alt={eventImages[3].alt} />
            </div>
            <div className="events-story-copy">
              <Copy splitType="words">
                <p className="mono">[ EXPERIÊNCIAS ÚNICAS ]</p>
                <h4 className="v2">A mesma atenção a cada escala.</h4>
              </Copy>
              <p className="md">
                Do evento corporativo à celebração particular, adaptamos cada solução ao espaço, ao público e ao objetivo do projeto, sempre com elevados padrões de qualidade.
              </p>
            </div>
          </div>

          <div className="events-mosaic">
            {eventImages.slice(4).map((image) => (
              <div className="events-mosaic-item" key={image.src}>
                <img src={image.src} alt={image.alt} />
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
                Acreditamos que cada projeto é uma oportunidade de criar algo extraordinário e a nossa paixão por eventos reflete-se em cada detalhe, desde a sua conceção à sua execução, criando experiências únicas para os mais diversos tipos de eventos.
              </p>
            </Copy>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Alcance</h6>
              </Copy>
              <p className="md">
                O nosso portfólio abrange uma vasta gama de eventos, desde pequenas celebrações até eventos de grande dimensão para grandes marcas internacionais, refletindo a nossa capacidade de adaptar cada evento a diferentes estilos, sempre com a mesma atenção aos detalhes e elevados padrões de qualidade.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Logística Integrada</h6>
              </Copy>
              <p className="md">
                Com uma equipa qualificada e experiente, simplificamos a nossa presença no terreno para assegurar um evento sem sobressaltos. Oferecemos serviços de planeamento, decoração, catering, produção e logística de forma integrada.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Aplicações</h6>
              </Copy>
              <p className="md">
                Seja um casamento de sonho, uma festa de aniversário, um evento corporativo ou uma celebração especial, a CAPICCI dedica-se a cada detalhe para que o seu evento seja inesquecível.
              </p>
            </div>

            <div className="cta-section">
              <Button href="/contacts" label="Planear o seu evento" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}