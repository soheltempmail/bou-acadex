"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";
import { withBasePath } from "@/lib/base-path";
import { HeroBackdrop } from "./HeroBackdrop";
import { HERO_CARDS } from "./hero.constants";

export function HeroSection() {
  const router = useRouter();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) {
      showToast("অনুগ্রহ করে বিষয়, কোড বা কি-ওয়ার্ড লিখুন");
      return;
    }
    router.push(withBasePath(`/books?q=${encodeURIComponent(trimmed)}`));
  };

  return (
    <section className="hero-10ms-section" id="heroSection">
      <HeroBackdrop />

      <div className="container hero-10ms-container">
        {/* BOU Nationwide Mission & Distance Learning Pill */}
        <div className="hero-mission-pill">
          <span className="pulsing-beacon-dot"></span>
          <span className="mission-pill-text">সবার জন্য উন্মুক্ত দূরশিক্ষণ • বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় ডিজিটাল একাডেমি</span>
        </div>

        <h1 className="hero-glow-title">শেখা হোক সহজে ও নির্ভুল!</h1>

        <div className="hero-cards-grid">
          {HERO_CARDS.map((card) => (
            <Link
              key={card.code}
              href={withBasePath(card.href)}
              className={`hero-glass-card hero-glass-card--${card.theme}`}
            >
              {/* Vibrant Multi-Color Ambient Radial Glow */}
              <div className="hero-glass-card-glow" />

              {/* Card Icon Header */}
              <div className="hero-glass-card-icon-wrap">
                <span className="hero-glass-card-icon">{card.icon}</span>
              </div>

              {/* Card Center: Program Code & Bengali Title */}
              <div className="hero-glass-card-body">
                <div className="hero-glass-card-code">{card.code}</div>
                <div className="hero-glass-card-title">{card.title}</div>
              </div>

              {/* Integrated Multi-Color Gradient Action Pill */}
              <div className="hero-glass-card-footer">
                <span className="hero-glass-card-pill">
                  <span className="hero-glass-card-pill-text">{card.pillText}</span>
                  <svg
                    className="hero-glass-card-pill-arrow"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="hero-10ms-cta-wrap">
          <Link href="/books" className="hero-10ms-cta-btn">
            ফ্রি ই-বুক ও সমাধান দেখুন →
          </Link>
        </div>

        <div className="hero-search-container">
          <div className="hero-10ms-search-bar">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              id="heroSearchInput"
              placeholder="বিষয় বা কোর্স কোড লিখে খুঁজুন (যেমন: ICT 1301, BBA, BSS, বাংলা, গণিত)..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
            />
            <button id="heroSearchBtn" onClick={handleSearch}>
              খুঁজুন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
