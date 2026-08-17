"use client";

import About from "@/components/About/About";
import Copy from "@/components/Copy/Copy";

export default function AboutPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>About Us</h1>
            </Copy>
          </div>
        </div>
      </section>

      <About />
    </>
  );
}