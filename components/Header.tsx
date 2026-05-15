"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

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

/* Position of the floating card, derived from the trigger button */
interface CardPos { top: number; left: number }

export default function Header() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [cardPos,  setCardPos]    = useState<CardPos>({ top: 52, left: 20 });
  const buttonRef  = useRef<HTMLButtonElement>(null);
  const pathname   = usePathname();
  const laTime     = useLATime();
  const currentPage = getPageLabel(pathname);

  /* Measure the button and open the menu positioned at its left edge */
  const openMenu = () => {
    if (buttonRef.current) {
      const r = buttonRef.current.getBoundingClientRect();
      setCardPos({ top: r.bottom + 6, left: r.left });
    }
    setMenuOpen(true);
  };

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ touchAction: "manipulation" }}
      >
        <div className="px-5 md:px-7 h-12 flex items-center justify-between">

          {/* Left: lowercase wordmark */}
          <Link
            href="/"
            className="font-heading font-light tracking-[0.07em] text-text-primary hover:text-accent transition-colors duration-200"
            style={{ fontSize: "14px" }}
          >
            lusano
          </Link>

          {/* Center: pill button — shape & colour match the original */}
          <button
            ref={buttonRef}
            onClick={openMenu}
            aria-label="Open navigation"
            className="flex items-center gap-2.5 px-5 py-2 transition-all duration-200 group"
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(166,141,116,0.32)",
              /* Warm tan pill — matches the original screenshot */
              backgroundColor: "rgba(196,168,130,0.22)",
            }}
          >
            <svg
              width="14" height="9" viewBox="0 0 14 9" fill="none"
              className="text-text-secondary/70 group-hover:text-text-secondary transition-colors flex-shrink-0"
            >
              <line x1="0" y1="1"   x2="14" y2="1"   stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              <line x1="0" y1="5"   x2="14" y2="5"   stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              <line x1="0" y1="8.5" x2="14" y2="8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            <span
              className="font-heading italic text-text-secondary"
              style={{ fontSize: "13px" }}
            >
              {currentPage}
            </span>
          </button>

          {/* Right: LA time + city */}
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

      {/* ── Floating nav card ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Invisible full-screen backdrop — click outside to close */}
            <div
              className="fixed inset-0 z-[99]"
              onClick={() => setMenuOpen(false)}
            />

            {/* The card — anchored to button's left edge */}
            <motion.div
              key="nav-card"
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{    opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-[100] flex flex-col overflow-hidden"
              style={{
                top:    cardPos.top,
                left:   cardPos.left,
                width:  "min(84vw, 400px)",
                maxHeight: "calc(100vh - 72px)",
                borderRadius: "10px",
                backgroundColor: "#F0EBE4",
                backgroundImage:
                  "linear-gradient(rgba(166,141,116,0.13) 1px, transparent 1px)," +
                  "linear-gradient(90deg, rgba(166,141,116,0.13) 1px, transparent 1px)",
                backgroundSize: "38px 38px",
                border: "1px solid rgba(166,141,116,0.26)",
                boxShadow: "0 6px 24px rgba(26,26,26,0.10)",
              }}
            >
              {/* Top row: × · page name */}
              <div
                className="relative flex items-center h-11 px-4 flex-shrink-0 border-b"
                style={{ borderColor: "rgba(166,141,116,0.18)" }}
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-text-secondary/55 hover:text-text-primary transition-colors"
                  style={{ fontSize: "18px", lineHeight: 1 }}
                >
                  ×
                </button>
                <span
                  className="font-heading italic text-text-secondary absolute left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ fontSize: "13px" }}
                >
                  {currentPage}
                </span>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col px-4 overflow-y-auto">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.03 + i * 0.05,
                      duration: 0.24,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline gap-4 py-3.5 border-b"
                      style={{ borderColor: "rgba(166,141,116,0.16)" }}
                    >
                      <span
                        className="font-body text-text-secondary/38 flex-shrink-0"
                        style={{ fontSize: "10px", letterSpacing: "0.05em", width: "28px" }}
                      >
                        ({String(i + 1).padStart(2, "0")})
                      </span>
                      <span
                        className="font-heading italic font-light text-text-primary leading-none transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                        style={{ fontSize: "clamp(16px, 4.5vw, 20px)" }}
                      >
                        {label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom: em. · ✳ · ig. */}
              <div
                className="px-4 py-4 flex items-center justify-between flex-shrink-0 border-t"
                style={{ borderColor: "rgba(166,141,116,0.16)" }}
              >
                <a
                  href="mailto:hello@lusano.com"
                  className="font-body tracking-[0.14em] text-text-secondary hover:text-text-primary transition-colors"
                  style={{ fontSize: "11px" }}
                >
                  em.
                </a>
                <span
                  className="font-heading text-text-secondary/30"
                  style={{ fontSize: "14px" }}
                >
                  ✳
                </span>
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
