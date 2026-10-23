import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { LegalNavTabs } from "@/components/layout/LegalNavTabs";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি | Privacy Policy — BOU Acadex",
  description:
    "BOU Acadex-এর ডেটা সুরক্ষা ও গোপনীয়তা নীতি: শিক্ষার্থী তথ্য নিরাপত্তা, লোকাল স্টোরেজ ব্যবহার এবং অনানুষ্ঠানিক প্ল্যাটফর্ম ডেটা পলিসি।",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <main className="section">
        <div className="container">
          <header className="doc-hero">
            <span className="section-kicker">ডেটা সুরক্ষা ও বিশ্বাস</span>
            <h1 className="section-title">গোপনীয়তা নীতি (Privacy Policy)</h1>
            <p className="section-desc">
              শিক্ষার্থীদের তথ্যের নিরাপত্তা এবং গোপনীয়তা রক্ষায় BOU Acadex-এর অঙ্গীকার ও কর্মপদ্ধতি।
            </p>
            <LegalNavTabs current="privacy" />
          </header>

          <div className="doc-content-container">
            {/* Unofficial Context Alert */}
            <div className="doc-alert-box">
              <div className="doc-alert-header">
                <span className="doc-alert-icon">🔒</span>
                <span className="doc-alert-title">
                  অনানুষ্ঠানিক প্ল্যাটফর্ম ও ডেটা নিরাপত্তা সংক্রান্ত স্পষ্ট বার্তা
                </span>
              </div>
              <div className="doc-alert-body">
                <p>
                  <strong>১. অনানুষ্ঠানিক অবাণিজ্যিক স্টুডেন্ট হাব:</strong> BOU Acadex বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের
                  কোনো প্রাতিষ্ঠানিক মাধ্যম নয়। আমরা শিক্ষার্থীদের কোনো আর্থিক তথ্য, বাউবি অফিসিয়াল পাসওয়ার্ড বা ব্যক্তিগত
                  সংবেদনশীল ডেটা সংগ্রহ বা সংরক্ষণ করি না।
                </p>
                <p style={{ marginTop: 10 }}>
                  <strong>২. বহিঃস্থ বাউবি সার্ভার লিংক:</strong> যখন আপনি কোনো বই ডাউনলোড বা পড়ার জন্য ক্লিক করেন, তখন
                  সরাসরি বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের সরকারি উন্মুক্ত আর্কাইভ (<code>ebookbou.edu.bd</code> / <code>bou.ac.bd</code>)-এর
                  সাথে সংযোগ স্থাপিত হয়, যা সংশ্লিষ্ট কর্তৃপক্ষের নিজস্ব নীতিমালার অধীন।
                </p>
              </div>
            </div>

            {/* Policy 1: Data Minimization */}
            <article className="doc-card">
              <h2>১. আমরা কী তথ্য সংগ্রহ করি? (Data Minimization)</h2>
              <p>
                আমরা ডেটা মিনিমাইজেশন নীতিতে বিশ্বাস করি। সাইট ব্যবহারের জন্য কোনো বাধ্যতামূলক রেজিস্ট্রেশন, অ্যাকাউন্ট তৈরি
                বা ফোন নম্বর দেওয়ার প্রয়োজন নেই।
              </p>
              <ul>
                <li>
                  <strong>কোনো ব্যক্তিগত তথ্য বিক্রয় নয়:</strong> আমরা শিক্ষার্থীদের নাম, ইমেইল বা পরিচয় কখনোই কোনো তৃতীয় পক্ষের
                  কাছে বিপণন বা বিক্রয় করি না।
                </li>
                <li>
                  <strong>নো পেমেন্ট ডেটা:</strong> যেহেতু আমাদের পুরো সেবা সম্পূর্ণ ফ্রি, তাই এখানে কোনো ক্রেডিট কার্ড,
                  বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টের তথ্য চাওয়ার সুযোগ নেই।
                </li>
              </ul>
            </article>

            {/* Policy 2: Browser Local Storage */}
            <article className="doc-card">
              <h2>২. ব্রাউজারের লোকাল স্টোরেজ (Local Storage Usage)</h2>
              <p>
                ব্যবহারকারীর অভিজ্ঞতা উন্নত ও গতিশীল করার জন্য আমরা শুধুমাত্র আপনার ব্রাউজারের স্থানীয় মেমোরি
                (<code>localStorage</code>) ব্যবহার করি:
              </p>
              <div className="doc-info-grid">
                <div className="doc-info-item">
                  <h4>🎨 থিম পছন্দ</h4>
                  <p>
                    আপনার নির্বাচিত ডার্ক মোড (Dark Mode) বা লাইট মোড পছন্দ যাতে পরবর্তী ভিজিটেও বজায় থাকে।
                  </p>
                </div>
                <div className="doc-info-item">
                  <h4>📝 MCQ পরীক্ষার অগ্রগতি</h4>
                  <p>
                    মক টেস্ট চলাকালীন আপনার উত্তরসমূহ সাময়িকভাবে ক্লায়েন্ট-সাইডে সংরক্ষণ করা, যা পেজ রিলোড হলেও হারিয়ে যায় না।
                  </p>
                </div>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: 12 }}>
                * এই তথ্যগুলো পুরোপুরি আপনার ডিভাইসেই সংরক্ষিত থাকে, আমাদের কোনো সার্ভারে প্রেরিত হয় না।
              </p>
            </article>

            {/* Policy 3: External Links & Official Archives */}
            <article className="doc-card">
              <h2>৩. বহিঃস্থ বাউবি লিঙ্ক ও গ্রন্থস্বত্ব (BOU & DCSA Links)</h2>
              <p>
                আমাদের সাইটের ই-বুক লিংকগুলো বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU) এবং DCSA-এর অফিসিয়াল উন্মুক্ত ডিজিটাল
                আর্কাইভ থেকে সংগৃহীত। আপনি যখন সেই লিংকগুলোতে যান, তখন বাউবি কর্তৃপক্ষের নিজস্ব প্রাইভেসি ও সার্ভার
                নীতিমালা প্রযোজ্য হবে।
              </p>

              <div className="doc-highlight-card">
                <p>
                  💡 <strong>নিরাপত্তা টিপস:</strong> আপনার বাউবি স্টুডেন্ট আইডি পাসওয়ার্ড, OSAPS লগইন ক্রেডেনশিয়াল কখনোই
                  কোনো অনানুষ্ঠানিক সাইটে প্রবেশ করাবেন না। শুধুমাত্র অফিসিয়াল ডোমেন <code>*.bou.ac.bd</code>-তেই
                  লগইন করুন।
                </p>
              </div>
            </article>

            {/* Policy 4: Contact Us */}
            <article className="doc-card">
              <h2>৪. যোগাযোগ ও জিজ্ঞাসা</h2>
              <p>
                গোপনীয়তা নীতি সংক্রান্ত যেকোনো প্রশ্ন বা মতামত জানাতে আমাদের সাথে নির্দ্বিধায় যোগাযোগ করতে পারেন:
              </p>
              <p>
                ইমেইল:{" "}
                <a href="mailto:privacy@bouacadex.org" style={{ color: "var(--tms-green)", fontWeight: 700 }}>
                  privacy@bouacadex.org
                </a>
              </p>

              <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/beta/about" className="btn btn-outline" style={{ fontSize: "0.875rem" }}>
                  আমাদের সম্পর্কে জানুন →
                </Link>
                <Link href="/beta/disclaimer" className="btn btn-outline" style={{ fontSize: "0.875rem" }}>
                  আইনি অস্বীকৃতি পড়ুন →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
