"use client";

import { useEffect, useState } from "react";
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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname  = usePathname();
  const laTime    = useLATime();
  const currentPage = getPageLabel(pathname);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Top bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="px-5 md:px-7 h-12 flex items-center justify-between">

          {/* Left: lowercase wordmark */}
          <Link
            href="/"
            className="font-heading font-light tracking-[0.07em] text-text-primary hover:text-accent transition-colors duration-200"
            style={{ fontSize: "14px" }}
          >
            lusano
          </Link>

          {/* Center: menu trigger pill showing current page */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
            className="flex items-center gap-2.5 border border-text-primary/15 bg-background/60 backdrop-blur-sm px-4 py-1.5 hover:border-text-primary/30 transition-all duration-200 group"
          >
            {/* Hamburger — two lines, matching the screenshot */}
            <svg
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
              className="text-text-secondary/70 group-hover:text-text-secondary transition-colors flex-shrink-0"
            >
              <line x1="0" y1="1"   x2="14" y2="1"   stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <line x1="0" y1="5"   x2="14" y2="5"   stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <line x1="0" y1="8.5" x2="14" y2="8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span
              className="font-body uppercase text-text-secondary"
              style={{ fontSize: "10px", letterSpacing: "0.18em" }}
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

      {/* ── Full-screen nav overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{
              backgroundColor: "#F5F0EB",
              backgroundImage:
                "linear-gradient(rgba(166,141,116,0.18) 1px, transparent 1px)," +
                "linear-gradient(90deg, rgba(166,141,116,0.18) 1px, transparent 1px)",
              backgroundSize: "38px 38px",
            }}
          >
            {/* Top bar inside overlay */}
            <div className="px-5 md:px-7 h-12 flex items-center justify-between border-b border-accent/20 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-[22px] h-[22px] border border-text-primary/20 flex items-center justify-center font-heading leading-none select-none"
                  style={{ fontSize: "12px" }}
                >
                  ✳
                </span>
                <span className="font-heading italic text-text-secondary" style={{ fontSize: "13px" }}>
                  {currentPage}
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="font-body uppercase text-text-secondary hover:text-text-primary transition-colors"
                style={{ fontSize: "10px", letterSpacing: "0.22em" }}
              >
                Close
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col flex-1 px-5 md:px-7 overflow-y-auto">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.04 + i * 0.07,
                    duration: 0.32,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-5 py-5 border-b border-accent/20"
                  >
                    <span
                      className="font-body tracking-wider text-text-secondary/40 w-8 flex-shrink-0"
                      style={{ fontSize: "10px" }}
                    >
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                    <span
                      className="font-heading italic font-light text-text-primary leading-none transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-accent"
                      style={{ fontSize: "clamp(30px, 9vw, 56px)" }}
                    >
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom social row */}
            <div className="px-5 md:px-7 py-5 flex items-center justify-between border-t border-accent/20 flex-shrink-0">
              <a
                href="mailto:hello@lusano.com"
                className="font-body tracking-[0.14em] text-text-secondary hover:text-text-primary transition-colors"
                style={{ fontSize: "11px" }}
              >
                em.
              </a>
              <span className="font-heading text-text-secondary/30" style={{ fontSize: "16px" }}>
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
        )}
      </AnimatePresence>
    </>
  );
}
