"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";

export default function DecorationPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>Decoration & Rental</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-wrapper">
            <Copy splitType="words">
              <p className="lg">
                Our decoration comes from materials that have been acquired over several years and allow us to obtain a unique and original aesthetic, offering the possibility to personalize each space to reflect your essence.
              </p>
            </Copy>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Equipment Rental</h6>
              </Copy>
              <p className="md">
                We offer a wide range of materials for rent, from furniture to tableware, cutlery, glasses and decorative elements. Our catalog includes exclusive pieces that have been carefully selected over the years, ensuring quality and originality.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Decoration Design</h6>
              </Copy>
              <p className="md">
                Our design team creates personalized decorations for each event, taking into account the theme, location and preferences of our clients. From weddings to corporate events, we transform spaces into unique and memorable environments.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Complete Service</h6>
              </Copy>
              <p className="md">
                We offer a complete service that includes transportation, assembly and disassembly of all materials. Our team ensures that everything is ready on time and in perfect condition, so you can enjoy the event without worries.
              </p>
            </div>

            <div className="cta-section">
              <Button href="/contacts" label="View Catalog" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}