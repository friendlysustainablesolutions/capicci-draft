"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import {
  CAPICCI_VIEWBOX,
  CAPICCI_GEOMETRY,
  CAPICCI_LINES,
  CAPICCI_RINGS,
  CAPICCI_ICON,
  CAPICCI_WORD,
  CAPICCI_TAGLINE,
} from "./capicci-logo-data";

import "./Preloader.css";

gsap.registerPlugin(useGSAP);

const PRELOADER_SEEN_KEY = "capicci-preloader-seen";

export let isInitialLoad = true;

// Read at module scope, before React renders, so the hero delay in page.jsx
// agrees with whether the preloader will actually play. Session-scoped: the
// intro runs once per visit, not on every refresh or trip back to the home
// page, but a returning visitor still sees it.
export let hasSeenPreloader = false;

if (typeof window !== "undefined") {
  try {
    hasSeenPreloader = Boolean(
      window.sessionStorage.getItem(PRELOADER_SEEN_KEY),
    );
    if (hasSeenPreloader) {
      isInitialLoad = false;
    } else {
      window.sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
    }
  } catch {
    // sessionStorage unavailable (private mode, blocked storage) -- showing the
    // intro is the harmless fallback.
  }
}

const BLOCK_SIZE_DESKTOP = 120;
const BLOCK_SIZE_MOBILE = 80;
const MOBILE_BREAKPOINT = 1000;

const DELAY = 0.25;
const BLOCKS_OUT = 0.5;
const BLOCK_STAGGER = 0.05;
const GAP_BEFORE_BLOCKS = 0.2;

// The hero on Home (see page.jsx's heroDelay) starts revealing at 5.7s from
// mount and takes ~1.4s, while this preloader's own timeline completes around
// 5.5s. If scroll unlocked the moment the preloader finished, it would be
// possible to scroll past the hero before it has appeared, so this is the
// extra hold added on top of that completion (first load only).
const SCROLL_UNLOCK_EXTRA_HOLD_INITIAL = 1800;

const { iconBottom: ICON_BOTTOM, offscreenY: OFFSCREEN_Y, leaderMergeY: LEADER_MERGE_Y } =
  CAPICCI_GEOMETRY;

export default function Preloader() {
  const wrapperRef = useRef(null);
  // Still rendered when the intro has already played, so this first pass
  // matches the server HTML and hydration stays clean. CSS driven by the
  // pre-paint script in layout.js keeps it invisible, and the effect below
  // unmounts it.
  const [showPreloader, setShowPreloader] = useState(
    isInitialLoad || hasSeenPreloader,
  );
  const [loaderAnimating, setLoaderAnimating] = useState(isInitialLoad);
  const wasInitialLoadRef = useRef(isInitialLoad);
  const lenis = useLenis();

  useEffect(() => {
    if (hasSeenPreloader) setShowPreloader(false);
  }, []);

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;

    if (loaderAnimating) {
      lenis.stop();
      return;
    }

    if (!wasInitialLoadRef.current) {
      lenis.start();
      return;
    }

    const timer = setTimeout(() => lenis.start(), SCROLL_UNLOCK_EXTRA_HOLD_INITIAL);
    return () => clearTimeout(timer);
  }, [lenis, loaderAnimating]);

  useGSAP(
    () => {
      if (!showPreloader || hasSeenPreloader) return;

      const root = wrapperRef.current;
      const blocksEl = root.querySelector(".preloader-blocks");
      const svgEl = root.querySelector(".preloader-svg");
      const leaders = gsap.utils.toArray(root.querySelectorAll(".capicci-leader"));
      const wordPieces = gsap.utils.toArray(root.querySelectorAll(".capicci-word .capicci-piece"));
      const taglinePieces = gsap.utils.toArray(
        root.querySelectorAll(".capicci-tagline .capicci-piece"),
      );
      const rectEls = CAPICCI_LINES.map((_, i) =>
        root.querySelector(`#capicci-clip-line${i + 1}-rect`),
      );
      const lineCircleEls = CAPICCI_LINES.map((_, i) =>
        root.querySelector(`#capicci-clip-line${i + 1}-circle`),
      );
      const ringCircleEls = CAPICCI_RINGS.map((_, i) =>
        root.querySelector(`#capicci-clip-ring${i + 1}-circle`),
      );
      if (!root || !blocksEl || !svgEl) return;

      // ---- grid outro setup (unchanged from the original preloader) ----
      const blockSize =
        window.innerWidth < MOBILE_BREAKPOINT ? BLOCK_SIZE_MOBILE : BLOCK_SIZE_DESKTOP;

      const cols = Math.ceil(window.innerWidth / blockSize);
      const rows = Math.ceil(window.innerHeight / blockSize);

      blocksEl.innerHTML = "";
      blocksEl.style.setProperty("--preloader-columns", String(cols));
      blocksEl.style.setProperty("--preloader-block-size", `${blockSize}px`);

      const cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = document.createElement("div");
          cell.className = "preloader-cell";
          blocksEl.appendChild(cell);
          cells.push(cell);
        }
      }
      gsap.set(cells, { scale: 1.05, transformOrigin: "50% 50%" });

      // ---- logo intro ----
      // Every animated value below is a real GSAP tween on the actual DOM
      // elements (via GSAP's `attr` property), so useGSAP's automatic
      // cleanup can track and revert it correctly.

      const GRID = 10;
      function primeSnake(pieces) {
        pieces.forEach((el, i) => {
          const dir = i % 2 === 0 ? -1 : 1;
          gsap.set(el, { x: dir * GRID, y: OFFSCREEN_Y, opacity: 1 });
        });
      }

      gsap.set(svgEl, { visibility: "visible" });

      // initial state for every animated clip/leader element
      gsap.set(leaders, { attr: { y: OFFSCREEN_Y, height: 0 } });
      gsap.set(rectEls, { attr: { y: ICON_BOTTOM, height: 2 } });
      gsap.set(lineCircleEls, { attr: { r: 0 } });
      gsap.set(ringCircleEls, { attr: { r: 0 } });
      primeSnake(wordPieces);
      primeSnake(taglinePieces);

      function snakeIn(tl, pieces, startTime, stagger, riseDur, turnDur) {
        pieces.forEach((el, i) => {
          const t0 = startTime + i * stagger;
          tl.to(el, { y: 0, duration: riseDur, ease: "none" }, t0).to(
            el,
            { x: 0, duration: turnDur, ease: "none" },
            t0 + riseDur,
          );
        });
        return startTime + (pieces.length - 1) * stagger + riseDur + turnDur;
      }

      const tl = gsap.timeline({
        delay: DELAY,
        onComplete: () => {
          setLoaderAnimating(false);
          setTimeout(() => setShowPreloader(false), 100);
        },
      });

      // Phase 0: the 3 centre lines travel up from off-canvas, tucking into
      // the icon's solid straight zone (LEADER_MERGE_Y, not just
      // ICON_BOTTOM -- the real path tapers slightly right at its bottom
      // tip, so stopping exactly at ICON_BOTTOM leaves a hairline gap there)
      tl.to(
        leaders,
        {
          attr: { y: LEADER_MERGE_Y, height: OFFSCREEN_Y - LEADER_MERGE_Y },
          duration: 0.55,
          ease: "none",
        },
        0,
      );

      // Phase 1: each of the 3 lines rises as far as its OWN geometry
      // safely allows -- lines 1 and 2 travel almost to the peak, line 3
      // stops a bit sooner since its real straight run is shorter
      tl.to(
        rectEls,
        {
          attr: {
            y: (i) => CAPICCI_LINES[i].safeTop,
            height: (i) => ICON_BOTTOM + 2 - CAPICCI_LINES[i].safeTop,
          },
          duration: 0.45,
          ease: "none",
        },
        0.55,
      );

      // Phase 2: each line's curve grows from its own tip point (where its
      // straight run ends) -- gap-free by construction, all three starting
      // at the same moment
      tl.to(
        lineCircleEls,
        {
          attr: { r: (i) => CAPICCI_LINES[i].maxR },
          duration: 0.9,
          ease: "power2.out",
        },
        1.0,
      );

      // Gold rings: same growing-circle draw, anchored at each ring's own
      // bottom point (rings have no straight segment to lead in with).
      // Staggered outer-to-inner, starting once the dark curves are mostly
      // drawn in. Each ring has its own start time/duration, so these are
      // 3 separate tweens rather than one batched call.
      tl.to(
        ringCircleEls[0],
        { attr: { r: CAPICCI_RINGS[0].maxR }, duration: 0.55, ease: "power2.out" },
        1.5,
      )
        .to(
          ringCircleEls[1],
          { attr: { r: CAPICCI_RINGS[1].maxR }, duration: 0.5, ease: "power2.out" },
          1.58,
        )
        .to(
          ringCircleEls[2],
          { attr: { r: CAPICCI_RINGS[2].maxR }, duration: 0.4, ease: "power2.out" },
          1.66,
        );

      // Icon fully formed: retract the leader lines up into it (y is
      // already at LEADER_MERGE_Y, so only height needs to shrink to 0)
      tl.to(
        leaders,
        {
          attr: { height: 0 },
          duration: 0.4,
          ease: "power2.in",
        },
        2.0,
      );

      // Wordmark + tagline: Snake-style grid movement -- each stroke rises
      // then makes one sharp turn sideways into its final slot
      const wordEnd = snakeIn(tl, wordPieces, 2.2, 0.02, 0.32, 0.14);
      snakeIn(tl, taglinePieces, wordEnd - 0.2, 0.012, 0.22, 0.1);

      // Hold briefly, then hide the logo and play the existing blocks outro
      tl.to({}, { duration: 0.3 })
        .set(svgEl, { visibility: "hidden" })
        .fromTo(
          cells,
          { scale: 1.05 },
          {
            scale: 0,
            duration: BLOCKS_OUT,
            ease: "power2.inOut",
            stagger: {
              grid: [rows, cols],
              from: "center",
              each: BLOCK_STAGGER,
            },
          },
          `+=${GAP_BEFORE_BLOCKS}`,
        );
    },
    { scope: wrapperRef, dependencies: [showPreloader] },
  );

  if (!showPreloader) return null;

  return (
    <div className="preloader" ref={wrapperRef}>
      <div className="preloader-blocks" aria-hidden />
      <div className="preloader-inner">
        <svg
          className="preloader-svg"
          viewBox={CAPICCI_VIEWBOX}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {CAPICCI_LINES.map((line, i) => (
              <clipPath key={i} id={`capicci-clip-line${i + 1}`} clipPathUnits="userSpaceOnUse">
                <rect
                  id={`capicci-clip-line${i + 1}-rect`}
                  x={line.rectX}
                  width={line.rectW}
                  y={ICON_BOTTOM}
                  height={0}
                />
                <circle
                  id={`capicci-clip-line${i + 1}-circle`}
                  cx={line.tipX}
                  cy={line.tipY}
                  r={0}
                />
              </clipPath>
            ))}
            {CAPICCI_RINGS.map((ring, i) => (
              <clipPath key={i} id={`capicci-clip-ring${i + 1}`} clipPathUnits="userSpaceOnUse">
                <circle
                  id={`capicci-clip-ring${i + 1}-circle`}
                  cx={ring.tipX}
                  cy={ring.tipY}
                  r={0}
                />
              </clipPath>
            ))}
          </defs>

          <g className="capicci-leaders">
            {CAPICCI_LINES.map((line, i) => (
              <rect
                key={i}
                className="capicci-leader"
                fill="#2f2d2e"
                x={line.rectX}
                width={line.rectW}
                y={ICON_BOTTOM}
                height={0}
              />
            ))}
          </g>

          <g className="capicci-icon">
            <g clipPath="url(#capicci-clip-line1)">
              <path d={CAPICCI_ICON.outerCircle.d} fill={CAPICCI_ICON.outerCircle.fill} />
            </g>
            <path
              clipPath="url(#capicci-clip-line2)"
              d={CAPICCI_ICON.pmarkOuter.d}
              fill={CAPICCI_ICON.pmarkOuter.fill}
            />
            <path
              clipPath="url(#capicci-clip-line3)"
              d={CAPICCI_ICON.pmarkInner.d}
              fill={CAPICCI_ICON.pmarkInner.fill}
            />
            {CAPICCI_ICON.rings.map((ring, i) => (
              <g key={i} clipPath={`url(#capicci-clip-ring${i + 1})`}>
                <path d={ring.d} fill={ring.fill} />
              </g>
            ))}
          </g>

          <g className="capicci-word">
            {CAPICCI_WORD.map((letter, li) => (
              <g className="capicci-letter" key={li}>
                {letter.map((p, pi) => (
                  <path key={pi} className="capicci-piece" d={p.d} fill={p.fill} />
                ))}
              </g>
            ))}
          </g>

          <g className="capicci-tagline">
            {CAPICCI_TAGLINE.map((p, i) => (
              <g className="capicci-piece" key={i}>
                <path d={p.d} fill={p.fill} />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
