"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",     href: "/"          },
  { label: "Products", href: "/products"  },
  { label: "About",    href: "/about"     },
  { label: "Trade",    href: "/trade"     },
];

function getPageLabel(pathname: string): string {
  if (pathname === "/") return "Home";
  const match = NAV_LINKS.find(
    (n) => n.href !== "/" && pathname.startsWith(n.href)
  );
  return match?.label ?? "Lusano";
}

/* ─── Asterisk brand mark ─────────────────────────────────────────────────── */
function AsteriskMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`w-[26px] h-[26px] border border-text-primary/25 flex items-center justify-center font-heading text-[14px] leading-none select-none flex-shrink-0 ${className}`}
    >
      ✳
    </span>
  );
}

/* ─── Header ──────────────────────────────────────────────────────────────── */
export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Fixed top bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-sm border-b border-accent/20"
            : "bg-transparent"
        }`}
      >
        <div className="px-5 md:px-8 h-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <AsteriskMark />
            <span className="font-heading text-[13px] font-light tracking-[0.28em] uppercase text-text-primary">
              Lusano
            </span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <Search size={15} strokeWidth={1.25} />
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="font-body text-[10px] uppercase tracking-[0.22em] text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Menu
            </button>
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
            {/* Top bar — mirrors the header */}
            <div className="px-5 md:px-8 h-12 flex items-center justify-between border-b border-accent/20 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <AsteriskMark />
                <span className="font-heading italic text-[13px] text-text-secondary">
                  {getPageLabel(pathname)}
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="font-body text-[10px] uppercase tracking-[0.22em] text-text-secondary hover:text-text-primary transition-colors"
              >
                Close
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col flex-1 px-5 md:px-8 overflow-y-auto">
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
                    {/* Counter */}
                    <span className="font-body text-[10px] tracking-wider text-text-secondary/40 w-8 flex-shrink-0">
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                    {/* Label */}
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
            <div className="px-5 md:px-8 py-5 flex items-center justify-between border-t border-accent/20 flex-shrink-0">
              <a
                href="mailto:hello@lusano.com"
                className="font-body text-[11px] tracking-[0.14em] text-text-secondary hover:text-text-primary transition-colors"
              >
                em.
              </a>
              {/* Centre mark */}
              <span className="font-heading text-[16px] text-text-secondary/30">
                ✳
              </span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[11px] tracking-[0.14em] text-text-secondary hover:text-text-primary transition-colors"
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
