"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Products", href: "/products" },
  { label: "About",    href: "/about" },
  { label: "Trade",    href: "/trade" },
];

function getPageLabel(pathname: string): string {
  if (pathname === "/") return "Home";
  const match = NAV_LINKS.find(
    (n) => n.href !== "/" && pathname.startsWith(n.href)
  );
  return match?.label ?? "Lusano";
}

function useLATime(): string {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    const update = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        hour:   "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(new Date());
      const h = parts.find((p) => p.type === "hour")?.value   ?? "00";
      const m = parts.find((p) => p.type === "minute")?.value ?? "00";
      setDisplay(`${h} ${m}`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return display;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef     = useRef<HTMLDivElement>(null);
  const pathname    = usePathname();
  const laTime      = useLATime();
  const currentPage = getPageLabel(pathname);

  /* Close when clicking outside */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [menuOpen]);

  const ease = "cubic-bezier(0.16,1,0.3,1)";
  const dur  = "0.38s";

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        style={{ touchAction: "manipulation" }}
      >
        <div className="px-5 md:px-7 h-12 flex items-center justify-between">

          <Link
            href="/"
            className="pointer-events-auto font-heading font-light tracking-[0.07em] text-text-primary hover:text-accent transition-colors duration-200"
            style={{ fontSize: "14px" }}
          >
            lusano
          </Link>

          <div className="flex items-center gap-2 min-w-0">
            {laTime && (
              <span
                className="font-body tabular-nums text-text-secondary/55 hidden sm:block"
                style={{ fontSize: "10px", letterSpacing: "0.07em" }}
              >
                {laTime}
              </span>
            )}
            <span
              className="font-body text-text-secondary/45 hidden sm:block"
              style={{ fontSize: "10px", letterSpacing: "0.06em" }}
            >
              Los Angeles
            </span>
          </div>
        </div>
      </header>

      {/* ── Morphing pill / card ── */}
      <div
        ref={menuRef}
        className="fixed top-2 left-1/2 z-50"
        style={{ transform: "translateX(-50%)" }}
      >
        <div
          style={{
            width:           menuOpen ? "300px" : "220px",
            borderRadius:    menuOpen ? "12px"  : "999px",
            backgroundColor: "rgba(196,168,130,0.22)",
            border:          "1px solid rgba(166,141,116,0.32)",
            overflow:        "hidden",
            transition:      `width ${dur} ${ease}, border-radius ${dur} ${ease}`,
          }}
        >
          {/* ── Top row — always visible ── */}
          <div className="relative flex items-center h-9 px-4">

            {/* Left: hamburger ↔ × */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="text-text-secondary/70 hover:text-text-primary transition-colors flex-shrink-0"
              style={{ lineHeight: 1, fontSize: menuOpen ? "18px" : undefined }}
            >
              {menuOpen ? (
                <span>×</span>
              ) : (
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                  <line x1="0" y1="1"   x2="14" y2="1"   stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="0" y1="5"   x2="14" y2="5"   stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="0" y1="8.5" x2="14" y2="8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              )}
            </button>

            {/* Center: page label */}
            <span
              className="font-heading italic text-text-secondary pointer-events-none"
              style={{
                fontSize:   "13px",
                position:   "absolute",
                left:       "50%",
                transform:  "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              {currentPage}
            </span>

            {/* Right: + */}
            <span
              className="ml-auto text-text-secondary/45 select-none"
              style={{
                fontSize:   "16px",
                lineHeight: 1,
                opacity:    menuOpen ? 1 : 0,
                transition: `opacity 0.2s ease`,
              }}
            >
              +
            </span>
          </div>

          {/* ── Collapsible body — grid-template-rows trick ── */}
          <div
            style={{
              display:          "grid",
              gridTemplateRows: menuOpen ? "1fr" : "0fr",
              transition:       `grid-template-rows ${dur} ${ease}`,
            }}
          >
            <div
              style={{
                overflow:   "hidden",
                opacity:    menuOpen ? 1 : 0,
                transition: `opacity 0.2s ease ${menuOpen ? "0.12s" : "0s"}`,
              }}
            >
              <div style={{ borderTop: "1px solid rgba(166,141,116,0.22)" }} />

              <nav className="flex flex-col px-4">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-3.5 border-b"
                    style={{ borderColor: "rgba(166,141,116,0.18)" }}
                  >
                    <span
                      className="font-body text-text-secondary/40 flex-shrink-0"
                      style={{ fontSize: "10px", letterSpacing: "0.05em", width: "28px" }}
                    >
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                    <span
                      className="font-heading italic font-light text-text-primary leading-none transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                      style={{ fontSize: "18px" }}
                    >
                      {label}
                    </span>
                  </Link>
                ))}
              </nav>

              <div
                className="px-4 py-4 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(166,141,116,0.16)" }}
              >
                <a
                  href="mailto:hello@lusano.com"
                  className="font-body tracking-[0.14em] text-text-secondary hover:text-text-primary transition-colors"
                  style={{ fontSize: "11px" }}
                >
                  em.
                </a>
                <span className="font-heading text-text-secondary/30" style={{ fontSize: "14px" }}>✳</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body tracking-[0.14em] text-text-secondary hover:text-text-primary transition-colors"
                  style={{ fontSize: "11px" }}
                >
                  ig.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
