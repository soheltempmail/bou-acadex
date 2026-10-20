import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface SiteFooterProps {
  variant?: "default" | "compact";
}

export function SiteFooter({ variant = "default" }: SiteFooterProps) {
  if (variant === "compact") {
    return (
      <footer className="main-footer">
        <div className="container footer-bottom">
          <div>
            &copy; 2024-2026 <strong>BOU Acadex</strong>. বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় ডিজিটাল একাডেমি।
          </div>
          <div className="footer-bottom-nav">
            <Link href="/">হোম</Link>
            <Link href="/about">আমাদের সম্পর্কে</Link>
            <Link href="/terms">শর্তাবলী</Link>
            <Link href="/disclaimer">অস্বীকৃতি</Link>
            <Link href="/privacy">গোপনীয়তা</Link>
            <Link href="/api-docs">API</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <BrandLogo className="footer-logo" idPrefix="footer-logo" />
            <p className="footer-desc">
              <strong>BOU Acadex</strong> হলো বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের শিক্ষার্থীদের একটি সমন্বিত
              ডিজিটাল একাডেমিক প্ল্যাটফর্ম — ই-বুক, বিগত প্রশ্ন সমাধান এবং অনলাইন MCQ মক টেস্ট এর
              নির্ভরযোগ্য ঠিকানা।
            </p>
            <div className="footer-social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                className="social-btn"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener"
                className="social-btn"
                aria-label="YouTube"
              >
                YT
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener"
                className="social-btn"
                aria-label="Telegram"
              >
                TG
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>স্টাডি রিসোর্স</h4>
            <ul className="footer-links">
              <li>
                <Link href="/books">ই-বুক ও মডিউল লাইব্রেরি</Link>
              </li>
              <li>
                <Link href="/questions">বিগত বছরের প্রশ্ন ও উত্তর</Link>
              </li>
              <li>
                <Link href="/mcq-test">অনলাইন MCQ টেস্ট এরিনা</Link>
              </li>
              <li>
                <a href="https://ebookbou.edu.bd" target="_blank" rel="noopener">
                  বাউবি অফিসিয়াল ই-বুক ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>বাউবি অনুষদসমূহ</h4>
            <ul className="footer-links">
              <li>
                <Link href="/books?level=Undergraduate">ব্যবসায় শিক্ষা স্কুল (SOB)</Link>
              </li>
              <li>
                <Link href="/books?level=Undergraduate">সামাজিক বিজ্ঞান ও ভাষা (SSHL)</Link>
              </li>
              <li>
                <Link href="/books?level=Secondary">ওপেন স্কুল (SSC ও HSC)</Link>
              </li>
              <li>
                <Link href="/books?level=Diploma">বিজ্ঞান ও প্রযুক্তি (SST/DCSA)</Link>
              </li>
              <li>
                <Link href="/books?level=Postgraduate">শিক্ষা স্কুল (SOE)</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>প্ল্যাটফর্ম ও নীতিমালা</h4>
            <ul className="footer-links">
              <li>
                <Link href="/about">আমাদের সম্পর্কে (About Us)</Link>
              </li>
              <li>
                <Link href="/terms">ব্যবহারের শর্তাবলী (Terms)</Link>
              </li>
              <li>
                <Link href="/disclaimer">আইনি অস্বীকৃতি (Disclaimer)</Link>
              </li>
              <li>
                <Link href="/privacy">গোপনীয়তা নীতি (Privacy)</Link>
              </li>
              <li>
                <Link href="/api-docs">ডেভেলপার API ডক্স</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>অফিসিয়াল বাউবি লিংক</h4>
            <ul className="footer-links">
              <li>
                <a href="https://bou.ac.bd" target="_blank" rel="noopener">
                  বাউবি মূল ওয়েবসাইট ↗
                </a>
              </li>
              <li>
                <a href="https://osapsnew.bou.ac.bd" target="_blank" rel="noopener">
                  OSAPS ভর্তি পোর্টাল ↗
                </a>
              </li>
              <li>
                <a href="https://result.bou.ac.bd" target="_blank" rel="noopener">
                  অফিসিয়াল রেজাল্ট ↗
                </a>
              </li>
              <li>
                <a href="https://exam.bou.ac.bd" target="_blank" rel="noopener">
                  পরীক্ষা সংক্রান্ত সেবা ↗
                </a>
              </li>
              <li>
                <a href="https://lms.bou.ac.bd" target="_blank" rel="noopener">
                  বাউবি এলএমএস (LMS) ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; 2024-2026 <strong>BOU Acadex</strong>. বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের শিক্ষার্থীদের জন্য উৎসর্গীকৃত।
          </div>
          <div className="footer-bottom-nav">
            <Link href="/about">আমাদের সম্পর্কে</Link>
            <span>•</span>
            <Link href="/terms">ব্যবহারের শর্তাবলী</Link>
            <span>•</span>
            <Link href="/disclaimer">আইনি অস্বীকৃতি ও গ্রন্থস্বত্ব</Link>
            <span>•</span>
            <Link href="/privacy">গোপনীয়তা নীতি</Link>
            <span>•</span>
            <Link href="/api-docs">API ডক্স</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

