"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";

export default function SpacesPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>Spaces</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-wrapper">
            <Copy splitType="words">
              <p className="lg">
                We are responsible for event management at warehouses 8 and 80 in Marvila, where our catering is exclusive. These renovated industrial spaces offer a unique setting for events of different sizes.
              </p>
            </Copy>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Warehouse 8</h6>
              </Copy>
              <p className="md">
                An industrial space with over 1000m², ideal for large corporate events, conferences and company parties. Its original architecture, with high ceilings and industrial elements, creates a unique and memorable environment.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Warehouse 80</h6>
              </Copy>
              <p className="md">
                A more intimate space, perfect for private events, themed dinners and special celebrations. With careful lighting and a welcoming atmosphere, it offers the ideal setting for unique moments.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Location</h6>
              </Copy>
              <p className="md">
                Located in Marvila, Lisbon, warehouses 8 and 80 benefit from a privileged location, with easy access and available parking. Their proximity to central Lisbon makes them a convenient choice for national and international events.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Included Services</h6>
              </Copy>
              <p className="md">
                When you choose our spaces, you benefit from our exclusive catering, event coordination service, technical support and audio-visual equipment. We take care of all the details to ensure the success of your event.
              </p>
            </div>

            <div className="cta-section">
              <Button href="/contacts" label="Schedule Visit" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}