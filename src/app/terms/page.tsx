import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { LegalNavTabs } from "@/components/layout/LegalNavTabs";

export const metadata: Metadata = {
  title: "ব্যবহারের শর্তাবলী | Terms & Conditions — BOU Acadex",
  description:
    "BOU Acadex ব্যবহারের নিয়মাবলী ও শর্তসমূহ: অনানুষ্ঠানিক প্ল্যাটফর্ম ঘোষণা, DCSA বাউবি পাঠ্যবই সংক্রান্ত নীতি ও শিক্ষার্থী নির্দেশিকা।",
};

export default function TermsPage() {
  return (
    <PageShell>
      <main className="section">
        <div className="container">
          <header className="doc-hero">
            <span className="section-kicker">শিক্ষার্থী নির্দেশিকা ও নিয়মাবলী</span>
            <h1 className="section-title">ব্যবহারের শর্তাবলী (Terms & Conditions)</h1>
            <p className="section-desc">
              BOU Acadex ব্যবহার করার পূর্বে অনুগ্রহ করে আমাদের নীতিমালা ও আইনি শর্তসমূহ মনোযোগ দিয়ে পড়ুন।
            </p>
            <LegalNavTabs current="terms" />
          </header>

          <div className="doc-content-container">
            {/* Core Declaration Box */}
            <div className="doc-alert-box">
              <div className="doc-alert-header">
                <span className="doc-alert-icon">📜</span>
                <span className="doc-alert-title">
                  মৌলিক শর্তাবলী: অনানুষ্ঠানিক চরিত্র ও বইয়ের মালিকানা
                </span>
              </div>
              <div className="doc-alert-body">
                <p>
                  <strong>১. অনানুষ্ঠানিক স্টুডেন্ট পোর্টাল:</strong> এই সাইটটি ব্রাউজ বা ব্যবহার করার মাধ্যমে আপনি
                  স্বীকার করছেন যে, BOU Acadex বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের (BOU) কোনো অফিসিয়াল ওয়েবসাইট নয়।
                  এটি শিক্ষার্থীদের দ্বারা পরিচালিত একটি স্বতন্ত্র শিক্ষা সহায়িকা প্ল্যাটফর্ম।
                </p>
                <p style={{ marginTop: 10 }}>
                  <strong>২. পাঠ্যপুস্তক বাউবি ও DCSA-এর সম্পদ:</strong> এই সাইটের মাধ্যমে পঠিতব্য সকল বই, সিলেবাস
                  ও স্টাডি মেটেরিয়াল <strong>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU)</strong> এবং <strong>DCSA / Open School</strong>-এর
                  স্বত্বাধিকারী সম্পত্তি। এই বইগুলো আমাদের নিজেদের নয়। এগুলো উন্মুক্ত শিক্ষামূলক দূরশিক্ষণ সহায়তায় প্রদর্শিত।
                </p>
              </div>
            </div>

            {/* Term 1: Acceptance of Terms */}
            <article className="doc-card">
              <h2>১. শর্তাবলীর গ্রহণযোগ্যতা (Acceptance of Terms)</h2>
              <p>
                BOU Acadex ওয়েবসাইট, এর যেকোনো পেজ, ই-বুক রিডার, বিগত প্রশ্নের আর্কাইভ অথবা MCQ টেস্ট সিস্টেম ব্যবহার
                করার মাধ্যমে আপনি এই ব্যবহারের শর্তাবলী এবং আমাদের গোপনীয়তা নীতি মেনে চলতে সম্মতি প্রদান করছেন। আপনি যদি
                এই শর্তাবলীর কোনো অংশের সাথে একমত না হন, তবে সাইটটি ব্যবহার থেকে বিরত থাকার অনুরোধ করা যাচ্ছে।
              </p>
            </article>

            {/* Term 2: Fair Educational Use */}
            <article className="doc-card">
              <h2>২. শিক্ষামূলক ফেয়ার ইউজ ও কনটেন্ট ব্যবহার (Content & Fair Use)</h2>
              <ul>
                <li>
                  <strong>ব্যক্তিগত ও অবাণিজ্যিক ব্যবহার:</strong> শিক্ষার্থীরা শুধুমাত্র নিজস্ব পড়াশোনা ও পরীক্ষার প্রস্তুতির
                  উদ্দেশ্যে এই প্ল্যাটফর্ম ব্যবহার করতে পারবেন।
                </li>
                <li>
                  <strong>বই বিক্রয় বা বাণিজ্যিকীকরণ নিষিদ্ধ:</strong> কোনো ব্যক্তি বা প্রতিষ্ঠান এই সাইটের কোনো বই, মডিউল বা
                  প্রশ্নব্যাংক ডাউনলোড করে বাণিজ্যিকভাবে বিক্রি করতে পারবেন না। এটি আইনত দণ্ডনীয়।
                </li>
                <li>
                  <strong>অফিসিয়াল কপিরাইটের সম্মান:</strong> সকল পাঠ্যবইয়ের কপিরাইট বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় এবং সংশ্লিষ্ট
                  অনুষদের শিক্ষকদের নিজস্ব বুদ্ধিবৃত্তিক সম্পদ।
                </li>
              </ul>
            </article>

            {/* Term 3: Interactive MCQ Arena & Honor Code */}
            <article className="doc-card">
              <h2>৩. অনলাইন MCQ টেস্ট ও সেলফ-অ্যাসেসমেন্ট নীতি</h2>
              <p>
                আমাদের অনলাইন MCQ টেস্ট মডিউলটি শিক্ষার্থীদের নিজস্ব প্রস্তুতি যাচাইয়ের জন্য তৈরি।
              </p>
              <ul>
                <li>
                  MCQ পরীক্ষার ফলাফল শুধুমাত্র আত্মমূল্যায়নের জন্য এবং এটি বাউবির কোনো প্রাতিষ্ঠানিক সনদ বা অফিসিয়াল গ্রেড নয়।
                </li>
                <li>
                  প্রশ্ন ও উত্তরের সঠিকতা বজায় রাখতে সর্বোচ্চ সতর্কতা অবলম্বন করা হয়েছে। তবে কোনো অসঙ্গতি চোখে পড়লে অনুগ্রহ করে
                  আমাদের অবহিত করুন।
                </li>
              </ul>
            </article>

            {/* Term 4: Official BOU Portals Disclaimer */}
            <article className="doc-card">
              <h2>৪. অফিসিয়াল কার্যক্রমের জন্য বাউবি সার্ভার ব্যবহার</h2>
              <p>
                শিক্ষার্থীদের অবশ্যই মনে রাখতে হবে যে:
              </p>
              <div className="doc-highlight-card">
                <p>
                  ⚠️ <strong>প্রশাসনিক কার্যাবলী:</strong> ভর্তি আবেদন (OSAPS), সেমিস্টার ফি জমা, পরীক্ষা রেজিস্ট্রেশন,
                  প্রবেশপত্র সংগ্রহ ও মূল ফলাফল প্রকাশের জন্য শুধুমাত্র বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের অফিসিয়াল
                  ওয়েবসাইট (<code>bou.ac.bd</code> ও <code>osapsnew.bou.ac.bd</code>) ব্যবহার করতে হবে। BOU Acadex
                  কোনো প্রকার প্রাতিষ্ঠানিক ফি বা আবেদন গ্রহণ করে না।
                </p>
              </div>
            </article>

            {/* Term 5: Modifications */}
            <article className="doc-card">
              <h2>৫. শর্তাবলী পরিবর্তন ও পরিমার্জন</h2>
              <p>
                BOU Acadex কর্তৃপক্ষ যেকোনো সময় এই শর্তাবলী পরিমার্জন বা হালনাগাদ করার অধিকার রাখে। নিয়মিত এই পেজটি
                পর্যালোচনা করার মাধ্যমে ব্যবহারকারীগণ সর্বশেষ নীতিমালা সম্পর্কে অবগত থাকতে পারবেন।
              </p>

              <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/disclaimer" className="btn btn-outline" style={{ fontSize: "0.875rem" }}>
                  আইনি অস্বীকৃতি পড়ুন →
                </Link>
                <Link href="/privacy" className="btn btn-outline" style={{ fontSize: "0.875rem" }}>
                  গোপনীয়তা নীতি দেখুন →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
