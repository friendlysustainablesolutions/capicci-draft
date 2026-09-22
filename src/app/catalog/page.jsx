"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Copy from "@/components/Copy/Copy";
import { useLanguage } from "@/providers/LanguageProvider";

import "./catalog.css";

const defaultImages = [
  "/catalog/img1.jpg",
  "/catalog/img2.jpg",
  "/catalog/img3.jpg",
  "/catalog/img4.jpg",
  "/catalog/img5.jpg",
  "/catalog/img6.jpg",
  "/catalog/img7.jpg",
  "/catalog/img8.jpg",
  "/catalog/img9.jpg",
  "/catalog/img10.jpg",
];

const catalogParams = {
  rows: 7,
  columns: 7,
  curvature: 5,
  // Column/row pitch used to be a single `spacing` (8.2) shared by both axes.
  // That matched imageWidth exactly (no horizontal gap) but towered over
  // imageHeight (5.3), leaving a ~2.9-unit dead band of empty canvas between
  // every row -- the "too many gaps" the wall was built with. Each axis now
  // gets its own pitch, just wide enough past its image dimension for a thin
  // seam between tiles.
  columnSpacing: 8.35,
  rowSpacing: 5.45,
  imageWidth: 8.2,
  imageHeight: 5.3,
  depth: 7.5,
  elevation: 0,
  lookAtRange: 20,
  verticalCurvature: 0.5,
};

const MOBILE_BREAKPOINT = 1000;
// Degrees of phone tilt mapped to the full -1..1 parallax range used by the
// desktop mouse-move path -- small enough to react to a natural wrist tilt,
// large enough that jitter while holding the phone still doesn't register.
const TILT_RANGE_DEGREES = 20;

function calculateRotations(x, y) {
  const a = 1 / (catalogParams.depth * catalogParams.curvature);
  const slopeY = -2 * a * x;
  const rotationY = Math.atan(slopeY);

  const maxYDistance = (catalogParams.rows * catalogParams.rowSpacing) / 2;
  const normalizedY = y / maxYDistance;
  const rotationX = normalizedY * catalogParams.verticalCurvature;

  return { rotationX, rotationY };
}

function calculatePosition(row, col) {
  let x = (col - catalogParams.columns / 2) * catalogParams.columnSpacing;
  let y = (row - catalogParams.rows / 2) * catalogParams.rowSpacing;
  let z = (x * x) / (catalogParams.depth * catalogParams.curvature);

  const normalizedY = y / ((catalogParams.rows * catalogParams.rowSpacing) / 2);
  z +=
    Math.abs(normalizedY) * normalizedY * catalogParams.verticalCurvature * 5;

  y += catalogParams.elevation;

  const { rotationX, rotationY } = calculateRotations(x, y);

  return { x, y, z, rotationX, rotationY };
}

function createRoundedRectShape(w, h, r) {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 + r, -h / 2);
  shape.lineTo(w / 2 - r, -h / 2);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  shape.lineTo(w / 2, h / 2 - r);
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  shape.lineTo(-w / 2 + r, h / 2);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2 - r, h / 2);
  shape.lineTo(-w / 2, -h / 2 + r);
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return shape;
}

function buildCatalogGrid(rows, cols, sourceImages) {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < cols; col++) {
      const excluded = new Set();
      if (col > 0) excluded.add(grid[row][col - 1]);
      if (row > 0) excluded.add(grid[row - 1][col]);

      const available = sourceImages
        .map((_, i) => i)
        .filter((i) => !excluded.has(i));

      grid[row][col] = available[Math.floor(Math.random() * available.length)];
    }
  }
  return grid;
}

function createImagePlane(row, col, loader, imageIndex, sourceImages) {
  const src = sourceImages[imageIndex];

  const catalogRadius = 0.15;
  const shape = createRoundedRectShape(
    catalogParams.imageWidth,
    catalogParams.imageHeight,
    catalogRadius
  );
  const geometry = new THREE.ShapeGeometry(shape);

  const catalogUvAttr = geometry.attributes.uv;
  for (let i = 0; i < catalogUvAttr.count; i++) {
    const u =
      (catalogUvAttr.getX(i) + catalogParams.imageWidth / 2) /
      catalogParams.imageWidth;
    const v =
      (catalogUvAttr.getY(i) + catalogParams.imageHeight / 2) /
      catalogParams.imageHeight;
    catalogUvAttr.setXY(i, u, v);
  }

  const texture = loader.load(src);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });

  const plane = new THREE.Mesh(geometry, material);
  const { x, y, z, rotationX, rotationY } = calculatePosition(row, col);

  plane.position.set(x, y, z);
  plane.rotation.x = rotationX;
  plane.rotation.y = rotationY;

  plane.userData = {
    imageIndex,
    imageSrc: src,
    basePosition: { x, y, z },
    baseRotation: { x: rotationX, y: rotationY, z: 0 },
    parallaxFactor: Math.random() * 0.5 + 0.5,
    randomOffset: {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random() * 2 - 1,
    },
    rotationModifier: {
      x: Math.random() * 0.15 - 0.075,
      y: Math.random() * 0.15 - 0.075,
      z: Math.random() * 0.2 - 0.1,
    },
    phaseOffset: Math.random() * Math.PI * 2,
  };

  return plane;
}

export default function CatalogPage({
  eyebrow = "CAPICCI - Events & Happiness",
  title = "Galeria",
}) {
  const { t } = useLanguage();
const catalogSectionRef = useRef(null);
const catalogCanvasRef = useRef(null);
const catalogHeaderRef = useRef(null);

  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  // iOS gates deviceorientation behind a tap; this prompt only ever appears
  // there. The function it calls lives inside the Three.js effect below, so
  // it's handed over through a ref rather than being redeclared here.
  const [showTiltPrompt, setShowTiltPrompt] = useState(false);
  const enableTiltRef = useRef(null);

  // Fetch images from /public/images/galeria
  useEffect(() => {
    async function fetchGaleriaImages() {
      try {
        const res = await fetch(`/api/gallery?folder=galeria`);
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          setGalleryImages(data.images.map((item) => item.src));
        } else {
          setGalleryImages(defaultImages);
        }
      } catch (error) {
        console.error("Failed to load galeria images:", error);
        setGalleryImages(defaultImages);
      }
    }

    fetchGaleriaImages();
  }, []);

  useEffect(() => {
    if (galleryImages.length === 0) return;

    const catalogSection = catalogSectionRef.current;
    const catalogCanvas = catalogCanvasRef.current;
    const catalogHeader = catalogHeaderRef.current;
    if (!catalogCanvas || !catalogSection) return;

    // Use actual container bounding rectangle to avoid overflow gaps
    const getContainerBounds = () => {
      const rect = catalogSection.getBoundingClientRect();
      return {
        width: rect.width || window.innerWidth,
        height: rect.height || window.innerHeight,
      };
    };

    let { width, height } = getContainerBounds();

    const catalogScene = new THREE.Scene();
    const catalogCamera = new THREE.PerspectiveCamera(
      25,
      width / height,
      0.1,
      1000
    );
    catalogCamera.position.set(0, 0, 40);

    const catalogRenderer = new THREE.WebGLRenderer({
      canvas: catalogCanvas,
      antialias: true,
      alpha: true,
    });
    catalogRenderer.setSize(width, height);
    catalogRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    catalogRenderer.setClearColor(0x000000, 0);
    catalogRenderer.outputColorSpace = THREE.SRGBColorSpace;

    const catalogLoader = new THREE.TextureLoader();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const catalogGrid = buildCatalogGrid(
      catalogParams.rows,
      catalogParams.columns,
      galleryImages
    );
    const catalogPlanes = [];

    for (let row = 0; row < catalogParams.rows; row++) {
      for (let col = 0; col < catalogParams.columns; col++) {
        const plane = createImagePlane(
          row,
          col,
          catalogLoader,
          catalogGrid[row][col],
          galleryImages
        );
        catalogPlanes.push(plane);
        catalogScene.add(plane);
      }
    }

    let catalogMouseX = 0;
    let catalogMouseY = 0;
    let catalogTargetX = 0;
    let catalogTargetY = 0;
    const catalogLookAt = new THREE.Vector3(0, 0, 0);

    let catalogHeaderRotX = 0;
    let catalogHeaderRotY = 0;
    let catalogHeaderTransZ = 0;

    let clickStartX = 0;
    let clickStartY = 0;
    // First reading becomes the neutral pose so the effect responds to tilt
    // *from however the phone is being held*, not to its absolute angle in
    // space (lying flat vs. held upright would otherwise read completely
    // differently).
    let orientationBaseBeta = null;
    let orientationBaseGamma = null;

    function isMobile() {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }

    function updateFromNormalized(nx, ny) {
      catalogMouseX = Math.max(-1, Math.min(1, nx));
      catalogMouseY = Math.max(-1, Math.min(1, ny));

      catalogHeaderRotX = -catalogMouseY * 30;
      catalogHeaderRotY = catalogMouseX * 30;
      catalogHeaderTransZ = Math.abs(catalogMouseX * catalogMouseY) * 50;
    }

    function catalogOnMouseMove(e) {
      if (isMobile()) return;

      const bounds = getContainerBounds();
      const nx = (e.clientX - bounds.width / 2) / (bounds.width / 2);
      const ny = (e.clientY - bounds.height / 2) / (bounds.height / 2);
      updateFromNormalized(nx, ny);
    }

    function onPointerDown(e) {
      clickStartX = e.clientX;
      clickStartY = e.clientY;
    }

    function onPointerUp(e) {
      const dist = Math.hypot(e.clientX - clickStartX, e.clientY - clickStartY);
      if (dist > 6) return; // Prevent triggering click during drag

      const bounds = getContainerBounds();
      const rect = catalogCanvas.getBoundingClientRect();
      const canvasX = e.clientX - rect.left;
      const canvasY = e.clientY - rect.top;

      mouse.x = (canvasX / bounds.width) * 2 - 1;
      mouse.y = -(canvasY / bounds.height) * 2 + 1;

      raycaster.setFromCamera(mouse, catalogCamera);
      const intersects = raycaster.intersectObjects(catalogPlanes);

      if (intersects.length > 0) {
        const clickedPlane = intersects[0].object;
        setSelectedIndex(clickedPlane.userData.imageIndex);
      }
    }

    // Drives the same parallax the desktop mouse-move path does, but from the
    // phone's tilt instead of a drag -- which also means touch gestures are
    // never captured here, so the page scrolls normally over this section on
    // mobile (the previous drag-to-rotate implementation called
    // preventDefault on every touchmove, which trapped the scroll entirely).
    function catalogOnDeviceOrientation(e) {
      if (e.beta === null || e.gamma === null) return;

      if (orientationBaseBeta === null) {
        orientationBaseBeta = e.beta;
        orientationBaseGamma = e.gamma;
        return;
      }

      const nx = (e.gamma - orientationBaseGamma) / TILT_RANGE_DEGREES;
      const ny = (e.beta - orientationBaseBeta) / TILT_RANGE_DEGREES;
      updateFromNormalized(nx, ny);
    }

    function catalogOnResize() {
      const newBounds = getContainerBounds();
      catalogCamera.aspect = newBounds.width / newBounds.height;
      catalogCamera.updateProjectionMatrix();
      catalogRenderer.setSize(newBounds.width, newBounds.height);
    }

    window.addEventListener("mousemove", catalogOnMouseMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", catalogOnResize);

    function enableTiltParallax() {
      orientationBaseBeta = null;
      orientationBaseGamma = null;
      window.addEventListener("deviceorientation", catalogOnDeviceOrientation);
    }

    // iOS 13+ only grants motion access from inside a user-gesture handler,
    // so there the wall waits for a tap on the on-screen prompt before ever
    // subscribing. Other mobile browsers dispatch deviceorientation with no
    // permission step, so it's enabled immediately there.
    function requestTiltPermission() {
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
          .then((state) => {
            if (state === "granted") enableTiltParallax();
          })
          .catch(() => {})
          .finally(() => setShowTiltPrompt(false));
      } else {
        enableTiltParallax();
        setShowTiltPrompt(false);
      }
    }

    enableTiltRef.current = requestTiltPermission;

    if (isMobile() && typeof window.DeviceOrientationEvent !== "undefined") {
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        setShowTiltPrompt(true);
      } else {
        enableTiltParallax();
      }
    }

    let catalogRafId;

    function catalogAnimate() {
      catalogRafId = requestAnimationFrame(catalogAnimate);

      if (catalogHeader) {
        catalogHeader.style.transform = `
          translate(-50%, -50%)
          perspective(1000px)
          rotateX(${catalogHeaderRotX}deg)
          rotateY(${catalogHeaderRotY}deg)
          translateZ(${catalogHeaderTransZ}px)
        `;
      }

      catalogTargetX += (catalogMouseX - catalogTargetX) * 0.05;
      catalogTargetY += (catalogMouseY - catalogTargetY) * 0.05;

      catalogLookAt.x = catalogTargetX * catalogParams.lookAtRange;
      catalogLookAt.y = -catalogTargetY * catalogParams.lookAtRange;
      catalogLookAt.z =
        (catalogLookAt.x * catalogLookAt.x) /
        (catalogParams.depth * catalogParams.curvature);

      const catalogTime = performance.now() * 0.001;

      catalogPlanes.forEach((plane) => {
        const {
          basePosition,
          baseRotation,
          parallaxFactor,
          randomOffset,
          rotationModifier,
          phaseOffset,
        } = plane.userData;

        const mouseDistance = Math.sqrt(
          catalogTargetX * catalogTargetX + catalogTargetY * catalogTargetY
        );
        const parallaxX = catalogTargetX * parallaxFactor * 3 * randomOffset.x;
        const parallaxY = catalogTargetY * parallaxFactor * 3 * randomOffset.y;
        const oscillation =
          Math.sin(catalogTime + phaseOffset) * mouseDistance * 0.1;

        plane.position.x =
          basePosition.x + parallaxX + oscillation * randomOffset.x;
        plane.position.y =
          basePosition.y + parallaxY + oscillation * randomOffset.y;
        plane.position.z =
          basePosition.z + oscillation * randomOffset.z * parallaxFactor;

        plane.rotation.x =
          baseRotation.x +
          catalogTargetY * rotationModifier.x * mouseDistance +
          oscillation * rotationModifier.x * 0.2;

        plane.rotation.y =
          baseRotation.y +
          catalogTargetX * rotationModifier.y * mouseDistance +
          oscillation * rotationModifier.y * 0.2;

        plane.rotation.z =
          baseRotation.z +
          catalogTargetX * catalogTargetY * rotationModifier.z * 2 +
          oscillation * rotationModifier.z * 0.3;
      });

      catalogCamera.lookAt(catalogLookAt);
      catalogRenderer.render(catalogScene, catalogCamera);
    }

    catalogAnimate();

    return () => {
      cancelAnimationFrame(catalogRafId);
      window.removeEventListener("mousemove", catalogOnMouseMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", catalogOnResize);
      window.removeEventListener("deviceorientation", catalogOnDeviceOrientation);
      enableTiltRef.current = null;

      catalogPlanes.forEach((plane) => {
        plane.geometry.dispose();
        plane.material.map?.dispose();
        plane.material.dispose();
      });
      catalogRenderer.dispose();
    };
  }, [galleryImages]);

  // Modal navigation handlers
  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section ref={catalogSectionRef} className="catalog">
      <canvas ref={catalogCanvasRef} className="catalog-canvas" />

      <nav className="catalog-nav">
        <Copy variant="flicker" delay={0.85} animateOnScroll={false}>
          <p className="mono sm">{eyebrow}</p>
        </Copy>
        <Copy variant="flicker" delay={0.85} animateOnScroll={false}>
          <p className="mono sm">{title}</p>
        </Copy>
      </nav>

      {/* Center Copy with high contrast and shadow styling */}
      <div
        ref={catalogHeaderRef}
        className="catalog-header catalog-quote"
      >
        <p className="quote-line">
          REVIVA AS <span className="highlight">NOSSAS</span>
        </p>
        <p className="quote-line">MEMÓRIAS</p>
      </div>

      {showTiltPrompt && (
        <button
          type="button"
          className="catalog-tilt-prompt"
          onClick={() => enableTiltRef.current?.()}
        >
          <p className="mono sm">{t("catalogTiltHint")}</p>
        </button>
      )}

      {/* Lightbox Modal & Carousel */}
      {selectedIndex !== null && (
        <div className="catalog-modal" onClick={() => setSelectedIndex(null)}>
          <div
            className="catalog-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <button
              className="modal-nav-btn prev"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              ‹
            </button>

            <img
              src={galleryImages[selectedIndex]}
              alt={`Gallery Image ${selectedIndex + 1}`}
              className="modal-image"
            />

            <button
              className="modal-nav-btn next"
              onClick={handleNext}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}