"use client";

import Copy from "@/components/Copy/Copy";

const galleryImages = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
  "/images/img6.jpg",
  "/images/img7.jpg",
  "/images/img8.jpg",
  "/images/img9.jpg",
  "/images/img10.jpg",
];

export default function GalleryPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <Copy animateOnScroll={false} delay={0.3}>
              <h1 className="subheader">CAPICCI</h1>
              <h1>Gallery</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-wrapper">
            <Copy splitType="words">
              <p className="lg">
                Explore our event gallery and discover how we transform moments into unforgettable memories.
              </p>
            </Copy>

            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <div className="gallery-item" key={index}>
                  <img src={image} alt={`Event ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}