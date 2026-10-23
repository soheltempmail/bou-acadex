"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

import { BrandLogo } from "@/components/ui/BrandLogo";

interface SiteHeaderProps {
  showSchoolsLink?: boolean;
}

const THEME_KEY = "bou_acadex_theme";

const NAV_LINKS = [
  { href: "/beta", label: "Home" },
  { href: "/beta/books", label: "E-Books" },
  { href: "/beta/questions", label: "Past Questions" },
  { href: "/beta/mcq-test", label: "MCQ Test" },
];

export function SiteHeader({ showSchoolsLink = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const { showToast } = useToast();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_KEY);
    const prefersDark =
      !saved &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const active = saved === "dark" || (saved !== "light" && prefersDark) ? "dark" : "light";
    setTheme(active);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
    showToast(`${nextTheme === "dark" ? "Dark" : "Light"} mode enabled`);
  };

  const isActive = (href: string) =>
    href === "/beta" ? pathname === "/beta" || pathname === "/beta/" : pathname.startsWith(href);

  return (
    <header className={`main-header${scrolled ? " header-scrolled" : ""}`} id="mainHeader">
      <div className="container nav-container">
        <Link href="/beta" className="brand-link" aria-label="BOU Acadex Home">
          <BrandLogo className="brand-logo-img" idPrefix="header-logo" />
        </Link>

        <nav
          className={`nav-menu${menuOpen ? " open" : ""}`}
          id="mainNavMenu"
          aria-label="Primary Navigation"
          ref={navRef}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${isActive(link.href) ? " active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          {showSchoolsLink ? (
            <a href="#schoolsSection" className="nav-link">
              Schools
            </a>
          ) : null}
          <a href="/" className="nav-link" style={{ color: "var(--tms-green)", fontWeight: 600 }}>
            🌐 Main Site
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            id="themeToggleBtn"
            aria-label="Toggle Dark or Light theme"
            title="Toggle Theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          <Link href="/beta/mcq-test" className="btn btn-primary btn-sm">
            Start MCQ Test
          </Link>

          <button
            className="mobile-nav-toggle"
            id="mobileNavToggle"
            aria-label="Open mobile navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            ref={toggleRef}
          >
            {menuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
