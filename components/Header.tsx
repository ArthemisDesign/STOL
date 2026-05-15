"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LOCALES } from "@/lib/i18n";

function useLATime(): string {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    const update = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Moscow",
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
  const { T, locale, setLocale } = useLanguage();
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [globeOpen, setGlobeOpen] = useState(false);
  const menuRef  = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const laTime   = useLATime();

  const NAV_LINKS = [
    { label: T.nav.home,     href: "/" },
    { label: T.nav.products, href: "/products" },
    { label: T.nav.about,    href: "/about" },
    { label: T.nav.trade,    href: "/trade" },
  ];

  const currentPage = (() => {
    if (pathname === "/") return T.nav.home;
    const match = NAV_LINKS.find(n => n.href !== "/" && pathname.startsWith(n.href));
    return match?.label ?? "Mikhaylov Carpenter";
  })();

  /* Close menu on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    const h = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", h);
    return () => document.removeEventListener("pointerdown", h);
  }, [menuOpen]);

  /* Close globe on outside click */
  useEffect(() => {
    if (!globeOpen) return;
    const h = (e: PointerEvent) => {
      if (globeRef.current && !globeRef.current.contains(e.target as Node)) setGlobeOpen(false);
    };
    document.addEventListener("pointerdown", h);
    return () => document.removeEventListener("pointerdown", h);
  }, [globeOpen]);

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
            className="pointer-events-auto font-heading font-bold tracking-[0.07em] text-text-primary hover:text-accent transition-colors duration-200 leading-tight"
            style={{ fontSize: "14px" }}
          >
            MIKHAYLOV<br />CARPENTER
          </Link>

          {/* Right: time + city + globe */}
          <div className="flex items-center gap-3">
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
              {T.location}
            </span>

            {/* Globe language switcher */}
            <div ref={globeRef} className="relative pointer-events-auto">
              <button
                onClick={() => setGlobeOpen(v => !v)}
                aria-label="Switch language"
                className="flex items-center gap-1 transition-colors"
                style={{ color: globeOpen ? "#1A1A1A" : "rgba(107,101,96,0.55)" }}
              >
                <Globe size={13} strokeWidth={1.4} />
                <span className="font-body" style={{ fontSize: "10px", letterSpacing: "0.06em" }}>
                  {locale.toUpperCase()}
                </span>
              </button>

              {/* Language dropdown */}
              <div
                className="absolute right-0 top-full mt-2 liquid-glass flex flex-col overflow-hidden"
                style={{
                  borderRadius: "10px",
                  minWidth: "110px",
                  display:         "grid",
                  gridTemplateRows: globeOpen ? "1fr" : "0fr",
                  transition:      `grid-template-rows ${dur} ${ease}`,
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div className="flex flex-col py-1">
                    {LOCALES.map(loc => (
                      <button
                        key={loc.value}
                        onClick={() => { setLocale(loc.value); setGlobeOpen(false); }}
                        className="flex items-center gap-2.5 px-4 py-2.5 transition-colors text-left"
                        style={{
                          backgroundColor: locale === loc.value ? "rgba(166,141,116,0.12)" : "transparent",
                        }}
                      >
                        <span
                          className="font-body"
                          style={{ fontSize: "10px", letterSpacing: "0.06em", color: "rgba(107,101,96,0.6)", minWidth: "22px" }}
                        >
                          {loc.flag}
                        </span>
                        <span
                          className="font-body"
                          style={{ fontSize: "12px", color: locale === loc.value ? "#1A1A1A" : "rgba(107,101,96,0.7)" }}
                        >
                          {loc.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
          className="liquid-glass"
          style={{
            width:        menuOpen ? "300px" : "220px",
            borderRadius: menuOpen ? "12px"  : "999px",
            overflow:     "hidden",
            transition:   `width ${dur} ${ease}, border-radius ${dur} ${ease}`,
          }}
        >
          {/* Top row */}
          <div className="relative flex items-center h-9 px-4">
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

            <span
              className="font-heading text-text-secondary pointer-events-none"
              style={{ fontSize: "13px", position: "absolute", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}
            >
              {currentPage}
            </span>

            <span
              className="ml-auto text-text-secondary/45 select-none"
              style={{ fontSize: "16px", lineHeight: 1, opacity: menuOpen ? 1 : 0, transition: "opacity 0.2s ease" }}
            >
              +
            </span>
          </div>

          {/* Collapsible nav */}
          <div
            style={{
              display:          "grid",
              gridTemplateRows: menuOpen ? "1fr" : "0fr",
              transition:       `grid-template-rows ${dur} ${ease}`,
            }}
          >
            <div style={{ overflow: "hidden", opacity: menuOpen ? 1 : 0, transition: `opacity 0.22s ease ${menuOpen ? "0.12s" : "0s"}` }}>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.35)" }} />

              <nav className="flex flex-col px-4">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-3.5 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.30)" }}
                  >
                    <span className="font-body text-text-secondary/40 flex-shrink-0" style={{ fontSize: "10px", letterSpacing: "0.05em", width: "28px" }}>
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                    <span className="font-heading font-light text-text-primary leading-none transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent" style={{ fontSize: "18px" }}>
                      {label}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="px-4 py-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.30)" }}>
                <a href="mailto:hello@mikhaylovcarpenter.com" className="font-body tracking-[0.14em] text-text-secondary hover:text-text-primary transition-colors" style={{ fontSize: "11px" }}>em.</a>
                <span className="font-heading text-text-secondary/30" style={{ fontSize: "14px" }}>✳</span>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-body tracking-[0.14em] text-text-secondary hover:text-text-primary transition-colors" style={{ fontSize: "11px" }}>ig.</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
