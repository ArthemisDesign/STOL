"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import { useLanguage } from "@/context/LanguageContext";

/* ─── Zoom constants ──────────────────────────────────────────────────────── */
const INIT_SCALE = 0.50;
const MIN_SCALE  = 0.32;
const MAX_SCALE  = 1.45;

/*
 * ─── Tile layout ────────────────────────────────────────────────────────────
 *
 * The 15 products are placed inside one TILE_W × TILE_H "tile".
 * That tile repeats infinitely in all four directions.
 *
 * Positions are randomised on every page load (client-side only).
 * BASE_CARDS holds only the card sizes; x/y are generated at mount.
 */
const TILE_W = 3400;
const TILE_H = 2700;

const BASE_CARDS: Array<{ id: number; w: number }> = [
  { id: 1,  w: 310 }, { id: 2,  w: 330 }, { id: 3,  w: 270 },
  { id: 4,  w: 300 }, { id: 5,  w: 285 }, { id: 6,  w: 280 },
  { id: 7,  w: 285 }, { id: 8,  w: 265 }, { id: 9,  w: 265 },
  { id: 10, w: 305 }, { id: 11, w: 285 }, { id: 12, w: 305 },
  { id: 13, w: 280 }, { id: 14, w: 265 }, { id: 15, w: 305 },
];

type TileCard = { id: number; x: number; y: number; w: number };

/**
 * Scatter 15 cards randomly inside the tile, avoiding overlaps.
 * Called once per page load (inside useEffect, client-side only).
 */
function generateTilePositions(): TileCard[] {
  const EDGE  = 200; // min distance from tile border
  const GAP   = 110; // guaranteed gap between any two cards
  const TRIES = 800; // attempts per card before skipping

  const placed: TileCard[] = [];

  const order = [...BASE_CARDS].sort(() => Math.random() - 0.5);

  for (const card of order) {
    const xMax = TILE_W - card.w - EDGE;
    const yMax = TILE_H - card.w - EDGE;
    let chosen: { x: number; y: number } | null = null;

    for (let t = 0; t < TRIES; t++) {
      const x = Math.round(EDGE + Math.random() * (xMax - EDGE));
      const y = Math.round(EDGE + Math.random() * (yMax - EDGE));

      const clash = placed.some(p =>
        x < p.x + p.w + GAP &&
        x + card.w + GAP > p.x &&
        y < p.y + p.w + GAP &&
        y + card.w + GAP > p.y
      );

      if (!clash) { chosen = { x, y }; break; }
    }

    // Only place if a non-overlapping spot was found
    if (chosen) placed.push({ id: card.id, x: chosen.x, y: chosen.y, w: card.w });
  }

  return placed;
}

/* ─── Tile range type ─────────────────────────────────────────────────────── */
interface TileRange { c1: number; c2: number; r1: number; r2: number }

/* ─── Calculate visible tile range from current transform ─────────────────── */
function calcTiles(tx: number, ty: number, s: number): TileRange {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // One tile's worth of buffer on every side
  const cxMin = (-tx / s) - TILE_W;
  const cxMax = ((vw - tx) / s) + TILE_W;
  const cyMin = (-ty / s) - TILE_H;
  const cyMax = ((vh - ty) / s) + TILE_H;

  return {
    c1: Math.max(-10, Math.floor(cxMin / TILE_W)),
    c2: Math.min(10,  Math.ceil(cxMax  / TILE_W)),
    r1: Math.max(-8,  Math.floor(cyMin / TILE_H)),
    r2: Math.min(8,   Math.ceil(cyMax  / TILE_H)),
  };
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function HomeCanvas() {
  const { T: tl, locale } = useLanguage();
  const CATS = tl.canvas.filters;
  const [active, setActive] = useState<string>(CATS[0]);

  /* Reset to "All" equivalent whenever language changes */
  useEffect(() => { setActive(CATS[0]); }, [CATS]);
  const [mounted,    setMounted]   = useState(false);
  const [grabbing,   setGrabbing]  = useState(false);
  const toDisplayPct = (s: number) =>
    Math.round(((s - MIN_SCALE) / (MAX_SCALE - MIN_SCALE)) * 100);

  const [zoomPct,    setZoomPct]   = useState(toDisplayPct(INIT_SCALE));
  const [tiles,      setTiles]     = useState<TileRange>({ c1: -2, c2: 2, r1: -2, r2: 2 });
  /* Randomised on every mount – empty until useEffect fires */
  const [tileCards,  setTileCards] = useState<TileCard[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLDivElement>(null);

  /* Mutable transform – updated every frame without touching React state */
  const T = useRef({ x: 0, y: 0, s: INIT_SCALE });

  /* Apply CSS transform to the canvas div directly */
  const commit = useCallback(() => {
    if (!canvasRef.current) return;
    const { x, y, s } = T.current;
    canvasRef.current.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
  }, []);

  /* Recalculate which tiles to render and update React state (only if changed) */
  const syncTiles = useCallback(() => {
    const next = calcTiles(T.current.x, T.current.y, T.current.s);
    setTiles(prev =>
      prev.c1 === next.c1 && prev.c2 === next.c2 &&
      prev.r1 === next.r1 && prev.r2 === next.r2
        ? prev   // bail out – no re-render
        : next
    );
  }, []);

  /* ── Mount: randomise card positions, center viewport ── */
  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    /* Randomise once per page load */
    setTileCards(generateTilePositions());

    /*
     * With transform-origin:0,0 and scale s, canvas point (cx,cy) maps to
     * viewport (tx + cx*s, ty + cy*s).  Set (tx,ty) so tile-origin (0,0)
     * centres in the viewport.
     */
    T.current = { x: vw / 2, y: vh / 2, s: INIT_SCALE };
    commit();
    syncTiles();
    setMounted(true);
  }, [commit, syncTiles]);

  /* ── Zoom inertia ── */
  const zoomVel   = useRef(0);           // log-scale zoom speed (units/frame)
  const zoomMouse = useRef({ x: 0, y: 0 }); // cursor pos at last wheel event
  const zoomRaf   = useRef<number | null>(null);

  /*
   * Friction per frame for zoom coast.
   * 0.82 ≈ ~0.35 s of perceptible coast – shorter than pan so it feels snappy.
   */
  const ZOOM_FRICTION = 0.82;

  const startZoomInertia = useCallback(() => {
    if (zoomRaf.current) cancelAnimationFrame(zoomRaf.current);

    const animate = () => {
      zoomVel.current *= ZOOM_FRICTION;

      if (Math.abs(zoomVel.current) < 0.0003) {
        syncTiles();
        setZoomPct(toDisplayPct(T.current.s));
        zoomRaf.current = null;
        return;
      }

      const factor = Math.exp(zoomVel.current);
      const newS   = Math.max(MIN_SCALE, Math.min(MAX_SCALE, T.current.s * factor));
      const ratio  = newS / T.current.s;
      const { x: mx, y: my } = zoomMouse.current;

      T.current.x = mx - (mx - T.current.x) * ratio;
      T.current.y = my - (my - T.current.y) * ratio;
      T.current.s = newS;

      commit();
      setZoomPct(toDisplayPct(newS));

      zoomRaf.current = requestAnimationFrame(animate);
    };

    zoomRaf.current = requestAnimationFrame(animate);
  }, [commit, syncTiles]);

  /* Cancel zoom RAF on unmount */
  useEffect(() => () => { if (zoomRaf.current) cancelAnimationFrame(zoomRaf.current); }, []);

  /* ── Wheel / pinch zoom ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();

      /* Remember cursor so inertia zooms towards the same point */
      zoomMouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      /* Accumulate log-scale velocity; clamp to prevent runaway */
      const delta = e.ctrlKey ? -e.deltaY * 0.015 : -e.deltaY * 0.0012;
      zoomVel.current  = Math.max(-0.18, Math.min(0.18, zoomVel.current + delta));

      startZoomInertia();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [startZoomInertia]);

  /* ── Pan + pinch-to-zoom (pointer events, works on desktop & mobile) ── */

  /*
   * activePointers tracks every finger / mouse button currently down.
   * 1 pointer  → pan
   * 2 pointers → pinch-zoom + simultaneous pan
   */
  const activePointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchDist      = useRef(0);   // distance between two fingers last frame
  const pinchMid       = useRef({ x: 0, y: 0 }); // midpoint last frame

  const dragging    = useRef(false);
  const lastPtr     = useRef({ x: 0, y: 0 });
  const moveDist    = useRef(0);
  const didDrag     = useRef(false);
  const tileTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const vel         = useRef({ x: 0, y: 0 });
  const ptrHistory  = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const rafId       = useRef<number | null>(null);

  const FRICTION = 0.93;

  const stopInertia = useCallback(() => {
    if (rafId.current !== null) { cancelAnimationFrame(rafId.current); rafId.current = null; }
  }, []);

  const startInertia = useCallback(() => {
    stopInertia();
    const animate = () => {
      vel.current.x *= FRICTION;
      vel.current.y *= FRICTION;
      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      if (speed < 0.04) { syncTiles(); rafId.current = null; return; }
      T.current.x += vel.current.x * 16;
      T.current.y += vel.current.y * 16;
      commit();
      if (!tileTimer.current) {
        tileTimer.current = setTimeout(() => { syncTiles(); tileTimer.current = null; }, 120);
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
  }, [commit, stopInertia, syncTiles]);

  useEffect(() => stopInertia, [stopInertia]);

  /* ── helpers ── */
  function getPinchInfo(pts: Map<number, { x: number; y: number }>) {
    const [a, b] = Array.from(pts.values());
    return {
      dist: Math.hypot(b.x - a.x, b.y - a.y),
      mid:  { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
    };
  }

  const throttleSync = () => {
    if (!tileTimer.current) {
      tileTimer.current = setTimeout(() => { syncTiles(); tileTimer.current = null; }, 120);
    }
  };

  /* ── Pointer down ── */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    stopInertia();
    didDrag.current = false;

    if (activePointers.current.size === 1) {
      /* Single finger / mouse – start pan */
      dragging.current   = true;
      lastPtr.current    = { x: e.clientX, y: e.clientY };
      moveDist.current   = 0;
      vel.current        = { x: 0, y: 0 };
      ptrHistory.current = [{ x: e.clientX, y: e.clientY, t: performance.now() }];
      setGrabbing(true);
    } else if (activePointers.current.size === 2) {
      /* Second finger arrived – switch to pinch mode */
      dragging.current = false;
      const { dist, mid } = getPinchInfo(activePointers.current);
      pinchDist.current = dist;
      pinchMid.current  = mid;
    }
  };

  /* ── Pointer move ── */
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activePointers.current.has(e.pointerId)) return;
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.current.size === 2) {
      /* ── Pinch: zoom towards midpoint + pan with midpoint movement ── */
      const { dist, mid } = getPinchInfo(activePointers.current);

      const scaleFactor = dist / (pinchDist.current || dist);
      const newS = Math.max(MIN_SCALE, Math.min(MAX_SCALE, T.current.s * scaleFactor));
      const ratio = newS / T.current.s;

      /* Pan from midpoint delta + zoom towards midpoint */
      const dx = mid.x - pinchMid.current.x;
      const dy = mid.y - pinchMid.current.y;
      T.current.x = mid.x - (mid.x - T.current.x) * ratio + dx;
      T.current.y = mid.y - (mid.y - T.current.y) * ratio + dy;
      T.current.s = newS;

      pinchDist.current = dist;
      pinchMid.current  = mid;

      commit();
      setZoomPct(toDisplayPct(newS));
      didDrag.current = true;
      throttleSync();

    } else if (activePointers.current.size === 1 && dragging.current) {
      /* ── Single-finger pan ── */
      const dx = e.clientX - lastPtr.current.x;
      const dy = e.clientY - lastPtr.current.y;
      lastPtr.current   = { x: e.clientX, y: e.clientY };
      moveDist.current += Math.abs(dx) + Math.abs(dy);
      if (moveDist.current > 4) didDrag.current = true;

      T.current.x += dx;
      T.current.y += dy;
      commit();

      const now = performance.now();
      ptrHistory.current.push({ x: e.clientX, y: e.clientY, t: now });
      ptrHistory.current = ptrHistory.current.filter(p => now - p.t <= 80);
      throttleSync();
    }
  };

  /* ── Pointer up / cancel ── */
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    activePointers.current.delete(e.pointerId);
    if (tileTimer.current) { clearTimeout(tileTimer.current); tileTimer.current = null; }

    if (activePointers.current.size === 0) {
      /* All fingers lifted */
      dragging.current = false;
      setGrabbing(false);

      /* Launch pan inertia from velocity history */
      const h = ptrHistory.current;
      if (h.length >= 2) {
        const oldest = h[0];
        const newest = h[h.length - 1];
        const dt = newest.t - oldest.t;
        if (dt > 0) {
          vel.current.x = (newest.x - oldest.x) / dt;
          vel.current.y = (newest.y - oldest.y) / dt;
        }
      }
      startInertia();

    } else if (activePointers.current.size === 1) {
      /* One finger still down – switch back to pan */
      const [remaining] = Array.from(activePointers.current.values());
      dragging.current   = true;
      lastPtr.current    = { x: remaining.x, y: remaining.y };
      moveDist.current   = 0;
      vel.current        = { x: 0, y: 0 };
      ptrHistory.current = [{ x: remaining.x, y: remaining.y, t: performance.now() }];
    }

    syncTiles();
  };

  /* ── Card instances for all visible tiles ── */
  const cardInstances = useMemo(() => {
    if (tileCards.length === 0) return [];

    const result: Array<{
      key:      string;
      x:        number;
      y:        number;
      w:        number;
      img:      string;
      slug:     string;
      name:     string;
      category: string;
    }> = [];

    for (let col = tiles.c1; col <= tiles.c2; col++) {
      for (let row = tiles.r1; row <= tiles.r2; row++) {
        for (const card of tileCards) {
          const p = products.find(pr => pr.id === card.id);
          if (!p) continue;
          result.push({
            key:      `${col}:${row}:${card.id}`,
            x:        card.x + col * TILE_W,
            y:        card.y + row * TILE_H,
            w:        card.w,
            img:      p.images[0],
            slug:     p.slug,
            name:     p.translations[locale].name,
            category: p.category,
          });
        }
      }
    }
    return result;
  }, [tiles, tileCards]);

  /* ─── Render ──────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Canvas viewport ── */}
      <div
        ref={containerRef}
        className={`fixed inset-0 z-0 overflow-hidden bg-grid transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ cursor: grabbing ? "grabbing" : "crosshair", touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Concrete texture overlay */}
        <div className="concrete-texture" />

        {/* Canvas layer — transform is applied here */}
        <div
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: "0 0",
            willChange: "transform",
          }}
        >
          {cardInstances.map(({ key, x, y, w, img, slug, name, category }) => {
            const catValue = tl.canvas.catMap[active] ?? active.toLowerCase();
            const visible  = catValue === "all" || category === catValue;
            return (
              <div
                key={key}
                className="canvas-card"
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: w,
                  height: w,
                  opacity: visible ? 1 : 0,
                  transition: "opacity 0.35s ease-in-out, transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94)",
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                {/* Inner clip — keeps the image inside the card boundary */}
                <div style={{ width: "100%", height: "100%", overflow: "hidden", backgroundColor: "#C8C4BE" }}>
                  <Link
                    href={`/products/${slug}`}
                    onClick={e => { if (didDrag.current) e.preventDefault(); }}
                    draggable={false}
                    style={{ display: "block", width: "100%", height: "100%" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={name}
                      loading="lazy"
                      draggable={false}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                    />
                  </Link>
                </div>

                {/* Product name — fades in on hover */}
                <div className="canvas-card-name">
                  <span
                    className="font-heading text-text-primary"
                    style={{ fontSize: "12px", letterSpacing: "0.02em", lineHeight: 1.3 }}
                  >
                    {name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Viewport crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="font-body font-light select-none"
            style={{ fontSize: "22px", lineHeight: 1, color: "rgba(255,240,210,0.10)" }}
          >
            +
          </span>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-5 pb-20 md:pb-5 pointer-events-none" style={{ touchAction: "manipulation" }}>
        <div className="relative flex items-end justify-between">

          {/* Zoom percentage */}
          <span
            className="font-body tabular-nums select-none"
            style={{ fontSize: "11px", letterSpacing: "0.08em", color: "rgba(160,150,140,0.55)" }}
          >
            {zoomPct}%
          </span>

          {/* Category filter — centered */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center pointer-events-auto">
            {CATS.map((cat, i) => {
              const isActive = cat === active;
              return (
                <span key={cat} className="flex items-center">
                  {i > 0 && (
                    <span
                      className="font-heading text-text-secondary/25 mx-2 select-none"
                      style={{ fontSize: "14px" }}
                    >
                      /
                    </span>
                  )}
                  <button
                    onClick={() => setActive(cat)}
                    className={`font-heading leading-none transition-all duration-200 ${
                      isActive
                        ? "text-text-primary"
                        : "text-text-secondary/45 hover:text-text-secondary"
                    }`}
                    style={{ fontSize: isActive ? "15px" : "14px" }}
                  >
                    {cat}
                  </button>
                </span>
              );
            })}
          </div>

          {/* Spacer */}
          <span className="opacity-0 pointer-events-none" style={{ fontSize: "11px" }}>
            00%
          </span>
        </div>
      </div>
    </>
  );
}
