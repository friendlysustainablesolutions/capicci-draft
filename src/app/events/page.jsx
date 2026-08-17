"use client";

import Copy from "@/components/Copy/Copy";
import Button from "@/components/Button/Button";

export default function EventsPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>Events</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-wrapper">
            <Copy splitType="words">
              <p className="lg">
                CAPICCI – Events & Happiness specializes in event organization and management, offering complete solutions to make every celebration a unique and memorable experience.
              </p>
            </Copy>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Corporate Events</h6>
              </Copy>
              <p className="md">
                We organize excellent corporate events, from conferences and seminars to product launches and company parties. Our team ensures impeccable management, taking care of every detail for the success of your event.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Private Celebrations</h6>
              </Copy>
              <p className="md">
                Whether it's a birthday, baptism, party committee or any other private celebration, we take care of every detail so you can enjoy the moment with your family and friends. From concept to execution, we guarantee an event tailored to your needs.
              </p>
            </div>

            <div className="content-section">
              <Copy splitType="words">
                <h6 className="v2">Space Management</h6>
              </Copy>
              <p className="md">
                We are responsible for event management at warehouses 8 and 80 in Marvila, where our catering is exclusive. These renovated industrial spaces offer a unique setting for events of different sizes.
              </p>
            </div>

            <div className="cta-section">
              <Button href="/contacts" label="Plan Your Event" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}