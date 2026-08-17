"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";

export default function WeddingsPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>Weddings</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-wrapper">
            <Copy splitType="words">
              <p className="lg">
                The most important day of your life deserves to be celebrated with perfection. CAPICCI – Events & Happiness is dedicated to creating unique weddings, where every detail is carefully planned to reflect the essence of the couple.
              </p>
            </Copy>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Complete Planning</h6>
              </Copy>
              <p className="md">
                From the first contact to the big day, we accompany the couple through every stage of the process. We help with venue selection, budget definition, supplier selection and coordination of all services to ensure a stress-free wedding.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Wedding Catering</h6>
              </Copy>
              <p className="md">
                Our wedding catering is celebrated for its quality and creativity. We develop personalized menus that delight guests, from the welcome cocktail to the gala dinner, always with fresh ingredients and impeccable presentation.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Decoration and Styling</h6>
              </Copy>
              <p className="md">
                With our extensive experience in decoration and equipment rental, we create unique environments for each wedding. From classic and elegant decorations to more modern and creative concepts, we transform spaces into dream settings.
              </p>
            </div>

            <div className="cta-section">
              <Button href="/contacts" label="Start Planning" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}