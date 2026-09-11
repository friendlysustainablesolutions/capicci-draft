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

export let isInitialLoad = true;

const BLOCK_SIZE_DESKTOP = 120;
const BLOCK_SIZE_MOBILE = 80;
const MOBILE_BREAKPOINT = 1000;

const DELAY = 0.25;
const BLOCKS_OUT = 0.5;
const BLOCK_STAGGER = 0.05;
const GAP_BEFORE_BLOCKS = 0.2;

const { iconBottom: ICON_BOTTOM, offscreenY: OFFSCREEN_Y, leaderMergeY: LEADER_MERGE_Y } =
  CAPICCI_GEOMETRY;

export default function Preloader() {
  const wrapperRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(isInitialLoad);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (loaderAnimating) {
      if (lenis) lenis.stop();
    } else {
      if (lenis) lenis.start();
    }
  }, [lenis, loaderAnimating]);

  useGSAP(
    () => {
      if (!showPreloader) return;

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

      // ---- logo intro state ----
      const state = {
        leaderTop: OFFSCREEN_Y,
        leaderBottom: OFFSCREEN_Y,
        bandTop0: ICON_BOTTOM,
        bandTop1: ICON_BOTTOM,
        bandTop2: ICON_BOTTOM,
        r0: 0,
        r1: 0,
        r2: 0,
        ringR0: 0,
        ringR1: 0,
        ringR2: 0,
      };

      function renderLeaders() {
        leaders.forEach((el) => {
          el.setAttribute("y", state.leaderTop);
          el.setAttribute("height", Math.max(0, state.leaderBottom - state.leaderTop));
        });
      }

      function renderRects() {
        const tops = [state.bandTop0, state.bandTop1, state.bandTop2];
        rectEls.forEach((el, i) => {
          el.setAttribute("y", tops[i]);
          el.setAttribute("height", Math.max(0, ICON_BOTTOM + 2 - tops[i]));
        });
      }

      function renderLineCircles() {
        const radii = [state.r0, state.r1, state.r2];
        lineCircleEls.forEach((el, i) => el.setAttribute("r", radii[i]));
      }

      function renderRingCircles() {
        const radii = [state.ringR0, state.ringR1, state.ringR2];
        ringCircleEls.forEach((el, i) => el.setAttribute("r", radii[i]));
      }

      const GRID = 10;
      function primeSnake(pieces) {
        pieces.forEach((el, i) => {
          const dir = i % 2 === 0 ? -1 : 1;
          gsap.set(el, { x: dir * GRID, y: OFFSCREEN_Y, opacity: 1 });
        });
      }

      gsap.set(svgEl, { visibility: "visible" });
      gsap.set(leaders, { opacity: 1 });
      primeSnake(wordPieces);
      primeSnake(taglinePieces);
      renderLeaders();
      renderRects();
      renderLineCircles();
      renderRingCircles();

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
        state,
        {
          leaderTop: LEADER_MERGE_Y,
          leaderBottom: OFFSCREEN_Y,
          duration: 0.55,
          ease: "none",
          onUpdate: renderLeaders,
        },
        0,
      );

      // Phase 1: each of the 3 lines rises as far as its OWN geometry
      // safely allows -- lines 1 and 2 travel almost to the peak, line 3
      // stops a bit sooner since its real straight run is shorter
      tl.to(
        state,
        {
          bandTop0: CAPICCI_LINES[0].safeTop,
          bandTop1: CAPICCI_LINES[1].safeTop,
          bandTop2: CAPICCI_LINES[2].safeTop,
          duration: 0.45,
          ease: "none",
          onUpdate: renderRects,
        },
        0.55,
      );

      // Phase 2: each line's curve grows from its own tip point (where its
      // straight run ends) -- gap-free by construction, all three starting
      // at the same moment
      tl.to(
        state,
        {
          r0: CAPICCI_LINES[0].maxR,
          r1: CAPICCI_LINES[1].maxR,
          r2: CAPICCI_LINES[2].maxR,
          duration: 0.9,
          ease: "power2.out",
          onUpdate: renderLineCircles,
        },
        1.0,
      );

      // Gold rings: same growing-circle draw, anchored at each ring's own
      // bottom point (rings have no straight segment to lead in with).
      // Staggered outer-to-inner, starting once the dark curves are mostly
      // drawn in.
      tl.to(
        state,
        {
          ringR0: CAPICCI_RINGS[0].maxR,
          duration: 0.55,
          ease: "power2.out",
          onUpdate: renderRingCircles,
        },
        1.5,
      )
        .to(
          state,
          {
            ringR1: CAPICCI_RINGS[1].maxR,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: renderRingCircles,
          },
          1.58,
        )
        .to(
          state,
          {
            ringR2: CAPICCI_RINGS[2].maxR,
            duration: 0.4,
            ease: "power2.out",
            onUpdate: renderRingCircles,
          },
          1.66,
        );

      // Icon fully formed: retract the leader lines up into it
      tl.to(
        state,
        {
          leaderBottom: LEADER_MERGE_Y,
          duration: 0.4,
          ease: "power2.in",
          onUpdate: renderLeaders,
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
