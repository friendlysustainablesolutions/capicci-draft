"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "../Copy/Copy";

import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Catering",
    description: "Our catering is versatile and aligned with the latest gastronomic trends. Our menus combine trust with quality and can be adapted to your tastes and needs, whether traditional or alternative, vegetarian, vegan and/or gluten-free."
  },
  {
    title: "Decoration & Equipment Rental",
    description: "Our decoration comes from materials that have been acquired over several years and allow us to obtain a unique and original aesthetic, offering the possibility to personalize each space to reflect your essence."
  },
  {
    title: "Graphic Design",
    description: "We present creative design proposals, helping to develop your visual identity, whether it's a brand, an event, product or simply graphic materials such as invitations and brochures. We work with a network of professionals specialized in graphic design, ensuring a result that conveys your essence."
  }
];

export default function About() {
  const aboutRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".about-service-card");
      if (!cards.length) return;

      gsap.set(cards, { y: 300, opacity: 0 });

      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".about-services-grid",
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: aboutRef },
  );

  return (
    <section className="about" ref={aboutRef}>
      <div className="container">
        <div className="about-wrapper">
          <div className="about-intro">
            <Copy variant="flicker">
              <p className="mono about-label">[ ABOUT ]</p>
            </Copy>

            <Copy splitType="words">
              <h5 className="v2 about-title">
                CAPICCI – Events & Happiness is a young event company that now appears with a renewed image, but with a team of professionals with over 25 years of experience in the event sector.
              </h5>
            </Copy>
          </div>

          <div className="about-services">
            <div className="about-services-left">
              <div className="about-services-left-header">
                <Copy splitType="words">
                  <h6 className="v2">
                    Complete Solutions
                  </h6>
                </Copy>
              </div>

              <div className="about-services-left-copy">
                <div className="about-services-image">
                  <img src="/images/img4.jpg" alt="" />
                </div>

                <p className="about-services-copy">
                  Our deep knowledge of the market, combined with a solid network of trusted partners and suppliers, fostered over decades of joint projects, guarantees us the ability to understand and realize your event, whether corporate or private. We offer complete solutions for your event or just isolated services, such as Catering, Decoration, Equipment Rental and Graphic Design:
                </p>
              </div>
            </div>

            <div className="about-services-right">
              <Copy splitType="words">
                <h6 className="v2">Services</h6>
              </Copy>

              <div className="about-services-grid">
                {services.map((service, id) => (
                  <div className="about-service-card" key={service.title}>
                    <p className="mono sm">0{id + 1}</p>
                    <p className="md">{service.title}</p>
                    <p className="sm service-description">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-footer">
            <p className="sm">
              We are also responsible for event management at warehouses 8 and 80 in Marvila, where our catering is exclusive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
